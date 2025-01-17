import { useRouter } from 'next/router';
import EventList from '../../../components/events/event-list';
import ResultTitle from '../../../components/events/results-title';
import Button from '../../../components/ui/button';
import ErrorAlert from '../../../components/ui/error-alert';
import { getFilteredEvents } from '../../../helpers/api-util';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Head from 'next/head';
export default function FilteredEventsPage(props) {
  const [loadedevents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    'https://nextjs-03-project-c0a87-default-rtdb.europe-west1.firebasedatabase.app/events.json',
    fetcher,
  );
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  );

  if (!loadedevents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numYear}/${numMonth}.`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}

        <ErrorAlert>
          <p>Invalid filter. Please adjust your values !</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedevents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}

        <ErrorAlert>
          <p>No events found for the chosen filter !</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}

      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: 'Invalid Filter',
//       },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   if (!filteredEvents || filteredEvents.length === 0) {
//     return {
//       props: {
//         hasError: 'No events found for the chosen filter',
//       },
//     };
//   }

//   const date = new Date(numYear, numMonth - 1);
//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
