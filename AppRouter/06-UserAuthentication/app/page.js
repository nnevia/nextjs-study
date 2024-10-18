import AuthForm from '@/components/auth-form';
import {signup} from '@/actions/auth-actions'
export default async function Home({searchParams}) {
  const formMode = searchParams.mode || 'login'
  return <AuthForm mode={formMode}/>;
}
