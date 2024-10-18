// import { unstable_noStore } from 'next/cache';
import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';

// export const revalidate = 5;
// export const dynamic = 'force-dynamic'; // 이 페이지를 미리 렌더링 하고 캐시하는 대신 요청이 올 떄마다 항상 페이지를 다시 렌더링

export default async function MessagesPage() {
  // unstable_noStore(); // 컴포넌트 한정  데이터 캐싱을 비활성화하고, 매번 새로운 요청을 서버로 보내도록 강제 (데이터를 캐시하지 않음)
  // const response = await fetch('http://localhost:8080/messages', {
  //   next: { tags: ['msg'] },
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
