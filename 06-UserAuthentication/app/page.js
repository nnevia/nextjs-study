import AuthForm from '@/components/auth-form';
import {signup} from '@/actions/auth-actions'
export default async function Home() {
  return <AuthForm />;
}
