import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { PetfinderAPI } from '@/services/API';
import { SearchPet } from '@/components/pages/SearchPet';

export default async function Page() {
  const queryClient = new QueryClient();

  // Prefetch data for this page
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
