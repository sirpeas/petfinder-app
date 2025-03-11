import { PetAge, PetCoat, PetGender, PetSize, PetStatus, SortOrder } from '@/types/Petfinder';

export type AnimalSearchParams = {
  type?: string;
  breed?: string;
  size?: PetSize;
  gender?: PetGender;
  age?: PetAge;
  color?: string;
  coat?: PetCoat;
  status?: PetStatus;
  name?: string;
  organization?: string;
  good_with_children?: boolean;
  good_with_dogs?: boolean;
  good_with_cats?: boolean;
  house_trained?: boolean;
  declawed?: boolean;
  special_needs?: boolean;
  location?: string;
  distance?: number;
  before?: string;
  after?: string;
  sort?: SortOrder;
  page?: number;
  limit?: number;
};

export type OrganizationSearchParams = {
  name?: string;
  state?: string;
  country?: string;
  query?: string;
  location?: string;
  distance?: number;
  page?: number;
  limit?: number;
};
