import type { AppProps } from 'next/app';
// providers
import { ApolloProvider } from 'fm/network';
// styles
import '../styles/index.css';
import StudentDashboard from 'libs/main-web/ui/student-dashboard/src/lib/StudentDashboard';

// import StudentDashboard from 'fm/student-dashboard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ApolloProvider>
    //   <Component {...pageProps} />
    // </ApolloProvider>
    <StudentDashboard />
  );
}
export default MyApp;
