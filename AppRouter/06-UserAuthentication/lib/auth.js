import { Lucia } from 'lucia';
import {BetterSqlite3Adapter} from '@lucia-auth/adapter-sqlite'
import db from './db';
import { cookies } from 'next/headers';

// 데이터베이스 어댑터 설정 및 테이블 지정
const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions'
});



const lucia = new Lucia(adapter, {
  sessionCookie: {  
    expires: false, // 쿠키 만료 여부 설정
    attributes: { // 객체의 쿠키의 추가속성 정의
      secure: process.env.NODE_ENV === 'production'
    } // 현재 환경이 배포 환경일때만 secure속성을 true로 설정 (개발환경에선 false)
  }
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name, 
    sessionCookie.value, 
    sessionCookie.attributes
  );
}

export async function verifyAuth() {

  // 세션 쿠키 가져오기
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if(!sessionCookie) {
    return {
      user: null,
      session: null
    };
  }

  const sessionId = sessionCookie.value;

  if(!sessionId) {
    return {
      user: null,
      session: null
    };
  } 

  // lucia.validateSession 메서드를 사용하여 세션 ID의 유효성을 검사
  const result = await lucia.validateSession(sessionId);

  try {
    // 세션이 유효하고 새로 생성된 경우, 새로운 세션 쿠키를 생성하고 설정.
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
       cookies().set(
        sessionCookie.name, 
        sessionCookie.value, 
        sessionCookie.attributes
      );
    }
    // 세션이 없는 경우, 빈 세션 쿠키를 생성하고 설정
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie(result.session.id)
       cookies().set(
        sessionCookie.name, 
        sessionCookie.value, 
        sessionCookie.attributes
      );
    }

  } catch {}

  return result
}

export async function destroySession() {
  const {session} = await verifyAuth();

  if(!session) {
    return {
      error: 'Unauthorized!'
    }
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie(session.id)
  cookies().set(
  sessionCookie.name, 
  sessionCookie.value, 
  sessionCookie.attributes
  );
}