'use client';
import { FC, useState } from 'react';

import { Props } from './types';
import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';

export const AppProviders: FC<Props> = (props) => {
  const { children } = props;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
};
AppProviders.displayName = 'AppProviders';
