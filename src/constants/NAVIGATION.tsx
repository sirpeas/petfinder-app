import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { ROUTES } from './ROUTES';

export const NAVIGATION = [{
  url: ROUTES.SEARCH,
  label: 'Search',
  name: <MagnifyingGlass size={24} />,
}] as const;
