import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

import { Spinner } from '@/components/ui/spinner/spinner';
import { MainErrorFallback } from '@/components/errors/main';
import { Notifications } from '@/components/ui/notifications/notifications';
import { queryConfig } from '@/lib/react-query';
import { NotificationsProvider } from '@/components/ui/notifications/notifications-context';


type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <NotificationsProvider>

            {children}

            <Notifications />
            <ReactQueryDevtools initialIsOpen={false} />

          </NotificationsProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};