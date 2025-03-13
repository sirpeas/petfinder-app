import { RegisterOptions } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  rules?: RegisterOptions;
};
