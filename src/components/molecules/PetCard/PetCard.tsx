import { Heart } from '@phosphor-icons/react/dist/ssr';

import { FC, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/atoms/Heading';
import { ROUTES } from '@/constants/ROUTES';
import { Props } from './types';
import { useAddToFavouritesLS } from '@/hooks';

export const PetCard: FC<Props> = (props) => {
  const { id, photos, name, age, type, species, gender, description } = props;

  const { isFavourite, toggleFavourite } = useAddToFavouritesLS();

  const mainPhoto = useMemo(() => {
    const firstPhotoObj = photos[0];
    if (firstPhotoObj) {
      return firstPhotoObj.large || firstPhotoObj.medium || firstPhotoObj.small;
    }
  }, [photos]);

  const handleToggleFavourite = useCallback(() => {
    toggleFavourite(id);
  }, [id]);

  return (
    <div className="max-w-xl max-h-screen w-full rounded bg-white p-8 flex flex-col">
      <div className="relative min-h-[200px] h-[60vh] flex-shrink-0 overflow-hidden bg-gray-100">
        <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-between">
          <Heading as="h3" className="py-2 px-4 bg-white">
            {name}
          </Heading>
          <button className="bg-white p-2 cursor-pointer" onClick={handleToggleFavourite}>
            <Heart size={32} weight={isFavourite(id) ? 'fill' : 'regular'} color="#e12c2c" />
          </button>
        </div>
        {/* Image */}
        <img className="w-full h-full object-cover object-top" src={mainPhoto} alt={`${name} ${type}`} />
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          <p className="text-xs py-2 text-gray-800">
            {age} - {gender} - {species}
          </p>
          <p className="italic text-gray-800">{description}</p>
        </div>
        <div className="flex flex-col items-end mt-2">
          <Link
            className="font-semibold text-gray-800 hover:scale-105 transition-transform"
            href={ROUTES.SINGLE_PET.replace(':id', String(id))}
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};
PetCard.displayName = 'PetCard';
