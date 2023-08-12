import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import ClientsPage from './pages/ClientsPage';
import LoginPage from './pages/LoginPage';
// import Page404 from './pages/Page404';
import DashboardAppPage from './pages/AdminsPage';
import ProvidersIndependentPage from './pages/ProvidersIndependentPage';
import ProvidersCompanyPage from './pages/ProvidersCompanyPage';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/admins" />, index: true },
        { path: 'admins', element: <DashboardAppPage /> },
        { path: 'clients', element: <ClientsPage /> },
        { path: 'providers-independent', element: <ProvidersIndependentPage /> },
        { path: 'providers-company', element: <ProvidersCompanyPage /> },
      ],
    },
    {
      path: '*',
      element: <LoginPage />,
    },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: '404', element: <Page404 /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
