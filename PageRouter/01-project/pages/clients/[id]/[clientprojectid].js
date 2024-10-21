import { useRouter } from 'next/router';

export default function ClientProjectidPage() {
  const router = useRouter();
  const query = router.query;
  console.log(query);
  return (
    <div>
      <h1>ClientProjectidPage</h1>
    </div>
  );
}
