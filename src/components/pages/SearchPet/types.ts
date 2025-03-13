import { ReactNode } from 'react';

export type Props = {
  children?: ReactNode;
};

export type FormValues = {
  name: string;
  size: string;
  age: string;
  status: string;
};
