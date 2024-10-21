import { useRouter } from 'next/router';

export default function ProjectIdPage({ params }) {
  const router = useRouter();
  console.log(router.query);
  return <h1>{params} hello</h1>;
}
