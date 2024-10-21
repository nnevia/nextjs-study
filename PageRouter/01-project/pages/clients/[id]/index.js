import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ClientIdPage() {
  const router = useRouter();
  const query = router.query.id;

  function loadProjecthandler() {
    // load data...
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: { clientprojectid: 'projectA', id: query },
    });
  }
  return (
    <>
      <h1>{query} Page</h1>
      <button onClick={loadProjecthandler}>Load Project A</button>
    </>
  );
}
