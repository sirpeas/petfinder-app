import { FC } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import { Props } from './types';

export const FormInput: FC<Props> = (props) => {
  const { name, label, rules, type, placeholder, defaultValue, className } = props;
  const { register } = useFormContext();

  return (
    <div className="flex flex-col w-full md:w-auto">
      {label ? (
        <label className="font-semibold mb-1 text-gray-500" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <input
        {...register(name, rules)}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx(
          'border border-gray-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300',
          className,
        )}
      />
    </div>
  );
};
FormInput.displayName = 'FormInput';
