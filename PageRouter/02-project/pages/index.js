import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import Head from 'next/head';
import NewsLetterRegistration from '../components/input/newsletter-registration';
export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>hello</title>
        <meta name="description" content="find a great thing" />
      </Head>
      <NewsLetterRegistration />
      <EventList items={props.events} />;
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
