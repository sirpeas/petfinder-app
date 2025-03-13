import { InputHTMLAttributes } from 'react';
import { RegisterOptions } from 'react-hook-form';

export type Props = InputHTMLAttributes<HTMLSelectElement> & {
  name: string;
  rules?: RegisterOptions;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
};
