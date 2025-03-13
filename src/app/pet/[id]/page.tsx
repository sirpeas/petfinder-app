import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import type { Metadata } from 'next';
import { PetfinderAPI } from '@/services/API';
import { PetView } from '@/components/pages/PetView';

export const metadata: Metadata = {
  title: 'PetFinder - Pet',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  const animalId = parseInt(id, 10);
  await queryClient.prefetchQuery({
    queryKey: ['singleAnimal', animalId],
    queryFn: () => PetfinderAPI.getAnimalById(animalId),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="max-w-7xl mx-auto my-8">
        <PetView id={animalId} />
      </main>
    </HydrationBoundary>
  );
}
