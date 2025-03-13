import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import type { Metadata } from 'next';
import { SearchPet } from '@/components/pages/SearchPet';
import { PetfinderAPI } from '@/services/API';

export const metadata: Metadata = {
  title: 'PetFinder - Search pets',
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
        <SearchPet />
      </main>
    </HydrationBoundary>
  );
}
