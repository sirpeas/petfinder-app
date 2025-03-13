'use client';
import { useState, useCallback } from 'react';
import { Spinner } from '@/components/atoms/Spinner';
import { Table } from '@/components/organisms/Table';
import { PetfinderAPI } from '@/services/API';
import { HOUR } from '@/constants/TIME';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/ROUTES';
import { Animal } from '@/types/Petfinder';
import { Pagination } from '@/components/molecules/Pagination';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

const TABLE_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'species', label: 'Specie' },
  { key: 'breeds.primary', label: 'Breed' },
  { key: 'age', label: 'Age' },
  { key: 'colors.primary', label: 'Colors' },
];

export const SearchPet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data, isFetching } = useQuery({
    queryKey: ['animals', currentPage],
    queryFn: async () => PetfinderAPI.getAnimals({ page: currentPage }),
    staleTime: HOUR,
    placeholderData: (prev) => prev,
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

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>form</div>
        <div className="w-full flex flex-col items-center justify-center relative">
          {data?.animals.length ? (
            <div className={clsx('w-full', isFetching && 'opacity-50 pointer-events-none')}>
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
        {!data && !isFetching ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <p className="text-center text-lg italic font-semibold text-gray-600">
              Seems like you seen all of the pets.
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

SearchPet.displayName = 'SearchPet';
