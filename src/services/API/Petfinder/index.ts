import { Animal, Organization, PetBreeds, Pagination } from '@/types/Petfinder';
import { get } from '../base';
import { AnimalSearchParams, OrganizationSearchParams } from './types';

export const PetfinderAPI = {
  getAnimals: (params?: AnimalSearchParams) =>
    get('petfinder/animals', {
      searchParams: params,
    }).json<{ animals: Animal[]; pagination: Pagination }>(),

  getAnimalById: (id: number) => get(`petfinder/animals/${id}`).json<{ animal: Animal }>(),

  getOrganizations: (params?: OrganizationSearchParams) =>
    get('petfinder/organizations', {
      searchParams: params,
    }).json<{ organizations: Organization[]; pagination: Pagination }>(),

  getOrganizationById: (id: string) => get(`organizations/${id}`).json<{ organization: Organization }>(),

  getAnimalTypes: () => get('petfinder/types').json<{ types: string[] }>(),

  getAnimalBreeds: (type: string) => get(`petfinder/types/${type}/breeds`).json<{ breeds: PetBreeds[] }>(),
};
