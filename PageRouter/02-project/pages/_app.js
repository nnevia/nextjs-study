import '../styles/globals.css';
import Layout from '../components/layout/layout';
import Head from 'next/head';
import { NotificationContextProvider } from '../store/notification-context';
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
