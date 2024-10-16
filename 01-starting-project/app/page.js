import { Suspense } from 'react';

import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

export const metadata = {
  title: 'Latest posts',
  description: 'This is description',
};

async function LatestPosts() {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
