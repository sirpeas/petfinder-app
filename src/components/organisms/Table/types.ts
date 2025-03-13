export type Column = {
  key: string;
  label: string;
};

export type Props<T extends object> = {
  columns: Column[];
  data: T[];
  onRowClick?: (row: T) => void;
  isLocalSortingEnabled?: boolean;
};
