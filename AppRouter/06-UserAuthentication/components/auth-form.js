'use client'
import { auth } from '@/actions/auth-actions';
import Link from 'next/link';
import { useFormState } from 'react-dom';


export default function AuthForm({mode}) { // 로그인 또는 회원가입 문자열

  // bind() 첫번째 인자를 mode로 고정한 새로운 함수 반환
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});

    // [현재 상태, 폼 제출시 호출되는 함수] (폼 제출 처리하는 함수, 초기상태)
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && 
      (<ul id='form-errors'>
        {Object.keys(formState.errors).map((error) => 
        <li key={error}>{formState.errors[error]}</li>
      )}
      </ul>
      )} 
      {/* 키 목록 배열 변환 */}
      <p>
        <button type="submit">
        {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </p>
      <p>

      </p>
      <p>
        {mode === 'login' && <Link href="/?mode=signup">Create an account.</Link>}
        {mode === 'signup' && <Link href="/?mode=login">Login with existing account.</Link>}
      </p>
    </form>
  );
}
