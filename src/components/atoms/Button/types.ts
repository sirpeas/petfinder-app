import { ReactNode, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type Props = {
  children?: ReactNode;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
