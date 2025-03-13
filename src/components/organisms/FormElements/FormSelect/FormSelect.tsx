import clsx from 'clsx';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { useFormContext } from 'react-hook-form';
import { FC } from 'react';

import { Props } from './types';

export const FormSelect: FC<Props> = (props) => {
  const { className, label, name, rules, options, placeholder, ...restProps } = props;
  const { register } = useFormContext();

  return (
    <div className="flex flex-col w-full md:w-auto">
      {label ? (
        <label className="font-semibold mb-1" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <div className="relative w-full">
        <select
          {...restProps}
          id={name}
          className={clsx(
            'appearance-none border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-sky-100 w-full',
            className,
          )}
          {...register(name, rules)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <CaretDown
          size={20}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-gray-600"
        />
      </div>
    </div>
  );
};
FormSelect.displayName = 'FormSelect';
