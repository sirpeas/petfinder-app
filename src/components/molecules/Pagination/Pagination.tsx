import { FC, useMemo } from 'react';

import { Props } from './types';
import { PaginationItem } from '@/components/molecules/Pagination/PaginationItem';

const PAGINATION_BASE_ARR = [-2, -1, 0, 1, 2];
export const Pagination: FC<Props> = (props) => {
  const { currentPage, onPageChange, totalPages } = props;
  const paginationLinks = useMemo(() => {
    return PAGINATION_BASE_ARR.map((i) => i + currentPage).filter((p) => p > 0);
  }, [currentPage]);

  return (
    <div className="flex flex-row justify-between p-2 bg-white mt-2">
      <div className="flex flex-row gap-1 text-gray-600">
        <span>Page {currentPage}</span>
        <span>of</span>
        <span>{totalPages}</span>
      </div>

      <div className="flex flex-row gap-2 text-gray-600">
        {paginationLinks.map((page) => (
          <PaginationItem key={page} page={page} onClick={onPageChange} isCurrentPage={page === currentPage} />
        ))}
        {!paginationLinks.includes(totalPages) ? (
          <>
            <span>...</span>
            <PaginationItem page={totalPages} onClick={onPageChange} isCurrentPage={totalPages === currentPage} />
          </>
        ) : null}
      </div>
    </div>
  );
};
Pagination.displayName = 'Pagination';
