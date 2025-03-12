import { FC, useMemo } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/atoms/Heading';
import { ROUTES } from '@/constants/ROUTES';
import { Props } from './types';


export const PetCard: FC<Props> = (props) => {
  const { id, photos, name, age, type, gender, description } = props;

  const mainPhoto = useMemo(() => {
    const firstPhotoObj = photos[0];
    if (firstPhotoObj) {
      return firstPhotoObj.large || firstPhotoObj.medium || firstPhotoObj.small;
    }
  }, [photos]);

  return (
    <div className="max-w-xl w-full rounded bg-white p-8">
      <div className="h-max max-h-160 min-h-72 overflow-hidden relative">
        <Heading as="h3" className="absolute bottom-0 py-2 px-4 bg-white">{name}</Heading>
        <img className="w-full" src={mainPhoto} alt={`${name} ${type}`} />
      </div>
      <div>
        <p className="text-xs py-2 text-gray-800">{age} - {gender}</p>
        <p className="italic text-gray-800">{description}</p>
      </div>
      <div className="flex flex-col items-end">
        <Link className="font-semibold text-gray-800 hover:transform-[scale(1.05)] transition-transform" href={ROUTES.SINGLE_PET.replace(':id', String(id))}>
          Read more
        </Link>
      </div>
    </div>
  );
};
PetCard.displayName = 'PetCard';
