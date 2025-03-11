export type PetSize = 'small' | 'medium' | 'large' | 'xlarge';
export type PetGender = 'male' | 'female' | 'unknown';
export type PetAge = 'baby' | 'young' | 'adult' | 'senior';
export type PetCoat = 'short' | 'medium' | 'long' | 'wire' | 'hairless' | 'curly';
export type PetStatus = 'adoptable' | 'found' | 'adopted';
export type SortOrder = 'recent' | 'distance' | 'random';

export type Animal = {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: PetBreeds;
  colors: PetColors;
  age: PetAge;
  gender: PetGender;
  size: PetSize;
  coat: PetCoat | null;
  attributes: AnimalAttributes;
  environment: AnimalEnvironment;
  tags: string[];
  name: string;
  description: string;
  photos: Photo[];
  status: PetStatus;
  published_at: string;
  contact: Contact;
};

export type PetBreeds = {
  primary: string;
  secondary: string | null;
  mixed: boolean;
  unknown: boolean;
};

export type PetColors = {
  primary: string | null;
  secondary: string | null;
  tertiary: string | null;
};

export type AnimalAttributes = {
  spayed_neutered: boolean;
  house_trained: boolean;
  declawed: boolean | null;
  special_needs: boolean;
  shots_current: boolean;
};

export type AnimalEnvironment = {
  children: boolean | null;
  dogs: boolean | null;
  cats: boolean | null;
};

export type Photo = {
  small: string;
  medium: string;
  large: string;
  full: string;
};

export type Contact = {
  email: string;
  phone: string;
  address: Address;
};

export type Address = {
  address1: string | null;
  address2: string | null;
  city: string;
  state: string;
  postcode: string;
  country: string;
};

export type Organization = {
  id: string;
  name: string;
  url: string;
  email: string;
  phone: string;
  address: Address;
  hours: string | null;
  adoption_policy: string | null;
  adoption_url: string | null;
};

export type Pagination = {
  count_per_page: number;
  total_count: number;
  current_page: number;
  total_pages: number;
  _links: {
    previous?: { href: string };
    next?: { href: string };
  };
};
