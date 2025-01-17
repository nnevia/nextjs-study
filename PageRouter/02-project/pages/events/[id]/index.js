import EventSummary from '../../../components/event-detail/event-summary';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventContent from '../../../components/event-detail/event-content';
import ErrorAlert from '../../../components/ui/error-alert';
import { getFeaturedEvents, getEventById } from '../../../helpers/api-util';
import Head from 'next/head';
import Comments from '../../../components/input/comments';

export default function EventDetailPage(props) {
  const { event } = props;
  if (!event) {
    return (
      <div className="center">
        <p>Loading . . .</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventsId={event.id} comment={props.comments} />
    </>
  );
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { id: event.id } }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const eventId = context.params.id;
  const event = await getEventById(eventId);
  return {
    props: { event },
    revalidate: 30,
  };
}
