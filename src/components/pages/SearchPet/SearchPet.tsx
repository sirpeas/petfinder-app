'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';
import { FormProvider, useForm } from 'react-hook-form';
import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { HOUR } from '@/constants/TIME';
import { Spinner } from '@/components/atoms/Spinner';
import { Table } from '@/components/organisms/Table';
import { ROUTES } from '@/constants/ROUTES';
import { Pagination } from '@/components/molecules/Pagination';
import { PetSearchForm } from '@/components/pages/SearchPet/PetSearchForm';
import { Animal } from '@/types/Petfinder';
import { PetfinderAPI } from '@/services/API';
import { TABLE_COLUMNS } from './constants';
import { FormValues } from './types';
import { useGSAPFadeIn } from '@/hooks';

gsap.registerPlugin(ScrollTrigger);

export const SearchPet = () => {
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const tableContainerRef = useRef(null);
  const formMethods = useForm<FormValues>({
    defaultValues: {
      age: '',
      size: '',
      status: '',
      name: '',
    },
  });
  const router = useRouter();

  const { data, isFetching, isSuccess, isLoading } = useQuery({
    queryKey: ['animals', currentPage, searchParams],
    queryFn: () => PetfinderAPI.getAnimals({ page: currentPage, ...searchParams }),
    placeholderData: (previousData) => previousData,
    staleTime: HOUR,
  });

  const handleRedirectToPetView = useCallback(
    (row: Animal) => {
      router.push(ROUTES.SINGLE_PET.replace(':id', String(row.id)));
    },
    [router],
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (data?.pagination.total_pages || 1)) {
      setCurrentPage(newPage);
    }
  };

  const handleSubmit = formMethods.handleSubmit((formValues) => {
    setCurrentPage(1);
    const filteredParams = Object.fromEntries(Object.entries(formValues).filter(([_, value]) => Boolean(value)));
    setSearchParams(filteredParams);
  });

  const handleReset = () => {
    setSearchParams({});
    formMethods.reset();
  };

  useGSAP(
    () => {
      if (!tableContainerRef.current) return;

      gsap.fromTo(
        tableContainerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
      );
    },
    { scope: tableContainerRef, dependencies: [isLoading] },
  );
  useGSAPFadeIn();

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col">
        <div className="w-full flex flex-row p-8 gap-4 bg-white mb-8 fade-in">
          <PetSearchForm handleSubmit={handleSubmit} handleReset={handleReset} isSending={isFetching} />
        </div>
        <div className="w-full flex flex-col items-center justify-center relative">
          {isSuccess && !data?.animals.length ? (
            <div className={clsx('w-full p-8 bg-white')}>
              <p className="text-center text-lg italic font-semibold text-gray-600">
                There are no pets matching your search criteria
              </p>
            </div>
          ) : null}
          {data?.animals.length ? (
            <div
              ref={tableContainerRef}
              className={clsx(
                'w-full p-8 bg-white transition-opacity duration-300',
                isFetching && '!opacity-50 pointer-events-none',
              )}
            >
              <Table columns={TABLE_COLUMNS} data={data.animals} onRowClick={handleRedirectToPetView} />
              <Pagination
                currentPage={data.pagination.current_page}
                totalPages={data.pagination.total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : null}
          {isFetching ? (
            <div className="absolute top-4">
              <Spinner />
            </div>
          ) : null}
        </div>
        {!data && !isFetching && isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <p className="text-center text-lg italic font-semibold text-gray-600">
              Seems like you seen all of the pets.
            </p>
          </div>
        ) : null}
      </div>
    </FormProvider>
  );
};

SearchPet.displayName = 'SearchPet';
