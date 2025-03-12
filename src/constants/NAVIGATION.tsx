import { MagnifyingGlass, Shuffle, House, Rows } from "@phosphor-icons/react/dist/ssr";
import { ROUTES } from './ROUTES';

export const NAVIGATION = [{
  url: ROUTES.HOME,
  label: 'Home',
  name: <House size={24} />,
}, {
  url: ROUTES.SHUFFLE_SEARCH,
  label: 'Shuffle Search',
  name: <Shuffle size={24} />,
}, {
  url: ROUTES.LIST,
  label: 'Pet reel list',
  name: <Rows size={24} />,
}, {
  url: ROUTES.SEARCH,
  label: 'Search',
  name: <MagnifyingGlass size={24} />,
}] as const;
