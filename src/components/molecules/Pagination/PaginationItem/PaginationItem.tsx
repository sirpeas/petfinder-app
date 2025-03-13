import { FC } from 'react';

import { Props } from './types';

export const PaginationItem: FC<Props> = (props) => {
  const { page, onClick, isCurrentPage } = props;

  const handleOnClick = () => onClick(page);

  if (isCurrentPage) {
    return <span className="font-bold">{page}</span>;
  }

  return (
    <button className="cursor-pointer text-gray-600" onClick={handleOnClick}>
      {page}
    </button>
  );
};
PaginationItem.displayName = 'PaginationItem';
