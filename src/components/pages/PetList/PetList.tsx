'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { HOUR } from '@/constants/TIME';
import { Spinner } from '@/components/atoms/Spinner';
import { Button } from '@/components/atoms/Button';
import { PetCard } from '@/components/molecules/PetCard';
import { PetfinderAPI } from '@/services/API';
import { useArrowNavigation } from '@/hooks';

gsap.registerPlugin(ScrollTrigger);

export const PetList = () => {
  const { ref, inView } = useInView({ threshold: 1, rootMargin: '50px' });
  const { containerRef } = useArrowNavigation();
  const { data, isFetching, isError, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['animals'],
    queryFn: ({ pageParam }) => PetfinderAPI.getAnimals({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current_page < lastPage.pagination.total_pages
        ? lastPage.pagination.current_page + 1
        : undefined,
    staleTime: HOUR,
  });

  const handleRetryRefetch = () => {
    refetch();
  };

  useEffect(() => {
    if (data && !isFetching && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isError && !data) {
    return (
      <div>
        <div className="py-12 flex flex-col items-center justify-center">
          <p className="text-center text-xl italic font-semibold text-gray-600">
            My apologies, there was a problem with retrieving pets from the shelter.
          </p>
          <p className="text-center text-md italic font-semibold text-gray-600">Click the button below to retry</p>
          <Button className="mt-4" onClick={handleRetryRefetch} disabled={isFetching}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div ref={containerRef} className="flex flex-col items-center justify-center gap-12">
        {data?.pages.map((page) =>
          page?.animals.map((pet) => (
            <PetCard
              key={pet.id}
              id={pet.id}
              photos={pet.photos}
              name={pet.name}
              description={pet.description}
              type={pet.type}
              age={pet.age}
              gender={pet.gender}
              species={pet.species}
            />
          )),
        )}
      </div>
      <div ref={ref} className="flex flex-col items-center justify-center">
        {isFetching ? <Spinner /> : null}
        {!hasNextPage && !isFetching ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <p className="text-center text-lg italic font-semibold text-gray-600">
              Seems like you seen all of the pets.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
PetList.displayName = 'PetList';
