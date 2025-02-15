import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import LandingRoute from '@/app/routes/landing.tsx';
import CreatePollRoute from '@/app/routes/create-poll.tsx';
import ManagePollRoute from './routes/manage-poll';

const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <LandingRoute />
    },
    {
      path: "/create",
      element: <CreatePollRoute />
    },
    {
      path: "/poll/:pollId",
      element: <ManagePollRoute />
    },
  ]);
};

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};