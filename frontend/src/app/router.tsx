import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import CreatePoll from '@/app/routes/create-poll.tsx';
import Landing from '@/app/routes/landing.tsx';

const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/create",
      element: <CreatePoll />
    },
  ]);
};

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};