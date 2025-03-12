import { PetPhoto } from '@/types/Petfinder';

export type Props = {
  id: number;
  photos: PetPhoto[];
  name: string;
  description: string;
  species: string;
  type: string;
  age: string;
  gender: string;
};
