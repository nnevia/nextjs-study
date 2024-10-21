import Link from 'next/link';
import { getAllEvents } from '../../dummy-data';
export default function AllEventsPage() {
  const events = getAllEvents();
  return (
    <>
      <div>
        <h1>All Events</h1>
      </div>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
