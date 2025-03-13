import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { PetList } from '@/components/pages/PetList';
import { PetfinderAPI } from '@/services/API';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PetFinder - Pet reel list',
};

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['animals'],
    queryFn: async () => await PetfinderAPI.getAnimals(),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="max-w-7xl mx-auto my-8">
        <PetList />
      </main>
    </HydrationBoundary>
  );
}
