'use client';
import clsx from 'clsx';
import { FormProvider, useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@/components/atoms/Spinner';
import { Table } from '@/components/organisms/Table';
import { ROUTES } from '@/constants/ROUTES';
import { Pagination } from '@/components/molecules/Pagination';
import { PetSearchForm } from '@/components/pages/SearchPet/PetSearchForm';
import { AnimalSearchParams } from '@/services/API/Petfinder/types';
import { Animal } from '@/types/Petfinder';
import { PetfinderAPI } from '@/services/API';
import { TABLE_COLUMNS } from './constants';
import { FormValues } from './types';

export const SearchPet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const formMethods = useForm<FormValues>({
    defaultValues: {
      age: '',
      size: '',
      status: '',
      name: '',
    },
  });
  const router = useRouter();

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationKey: ['animals', currentPage], // ✅ No searchParams in key
    mutationFn: async ({ page, params }: { page: number; params: AnimalSearchParams }) =>
      PetfinderAPI.getAnimals({ page, ...params }),
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
    mutate({ page: 1, params: filteredParams });
  });

  const handleReset = () => formMethods.reset();

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col">
        <div className="w-full flex flex-row p-8 gap-4 bg-white mb-8">
          <PetSearchForm handleSubmit={handleSubmit} handleReset={handleReset} isSending={isPending} />
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
            <div className={clsx('w-full p-8 bg-white', isPending && 'opacity-50 pointer-events-none')}>
              <Table columns={TABLE_COLUMNS} data={data.animals} onRowClick={handleRedirectToPetView} />
              <Pagination
                currentPage={data.pagination.current_page}
                totalPages={data.pagination.total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : null}
          {isPending ? (
            <div className="absolute top-4">
              <Spinner />
            </div>
          ) : null}
        </div>
        {!data && !isPending && isSuccess ? (
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
