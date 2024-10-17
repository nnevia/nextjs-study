'use server'
import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import CreateUser from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // 데이터 검증
  let errors = {};

  if(!email.includes('@')) {
    errors.email = 'Please enter a valid email address';
  }

  if(password.trim().length < 8) { // 공백 제거 후 길이 확인
    errors.password = 'Password must be at least 8 characters long.';
  }

  if(Object.keys(errors).length > 0) {
    return {
      errors,
    }
  }

  // 데이터베이스 저장 및 새로운 사용자 생성
  // 비밀번호 해시처리
  const hashedPassword = hashUserPassword(password);
  try {
    const id = CreateUser(email, hashedPassword);
    await createAuthSession(id);
    redirect('/training');
  } catch (error) {
    if(error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        errors: {
          email: 'It seems like an account for the chosen email already exists'
        }
      };
    }
    throw error;
  }


}
