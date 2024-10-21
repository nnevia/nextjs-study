import { useRouter } from 'next/router';
import { getEventById } from '../../../dummy-data';
import Image from 'next/image';

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const event = getEventById(id);
  console.log(event);
  return (
    <div>
      <h1>This is {event.title} Page</h1>
      <Image
        alt="title"
        src={`/${event.image}`}
        width={210} // 가로 비율
        height={210} // 세로 비율
      />
    </div>
  );
}
