import { FC } from 'react';

import { Props } from './types';
import clsx from 'clsx';

export const Button: FC<Props> = (props) => {
  const { className, type = 'button', ...buttonProps } = props;

  return (
    <button
      className={clsx(
        'py-2 px-7 font-semibold rounded text-lg transition-colors',
        buttonProps.disabled
          ? 'bg-gray-300 text-gray-100'
          : 'bg-gray-700 hover:bg-gray-600 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-100',
        className,
      )}
      type={type}
      {...buttonProps}
    />
  );
};
Button.displayName = 'Button';
