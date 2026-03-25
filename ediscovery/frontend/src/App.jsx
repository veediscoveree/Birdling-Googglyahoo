import { useState, useCallback } from 'react';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MatterList from './pages/MatterList.jsx';
import MatterDetail from './pages/MatterDetail.jsx';
import Ingestion from './pages/Ingestion.jsx';
import Processing from './pages/Processing.jsx';
import Review from './pages/Review.jsx';
import SearchPage from './pages/SearchPage.jsx';
import Production from './pages/Production.jsx';
import AuditLog from './pages/AuditLog.jsx';
import ErrorReport from './pages/ErrorReport.jsx';

/**
 * VDiscovery — eDiscovery SaaS Platform
 * Client-side routing (no router library — lightweight internal navigation)
 */
export default function App() {
  const [route, setRoute] = useState({ page: 'matters', params: {} });

  const navigate = useCallback((page, params = {}) => {
    setRoute({ page, params });
    window.scrollTo(0, 0);
  }, []);

  const currentMatterId = route.params.matterId ?? null;

  const pageProps = { navigate, ...route.params };

  const pages = {
    matters:    <MatterList      {...pageProps} />,
    dashboard:  <Dashboard       {...pageProps} />,
    matter:     <MatterDetail    {...pageProps} />,
    ingest:     <Ingestion       {...pageProps} />,
    processing: <Processing      {...pageProps} />,
    review:     <Review          {...pageProps} />,
    search:     <SearchPage      {...pageProps} />,
    production: <Production      {...pageProps} />,
    audit:      <AuditLog        {...pageProps} />,
    errors:     <ErrorReport     {...pageProps} />,
  };

  return (
    <Layout
      navigate={navigate}
      currentPage={route.page}
      matterId={currentMatterId}
    >
      {pages[route.page] ?? pages.matters}
    </Layout>
  );
}
