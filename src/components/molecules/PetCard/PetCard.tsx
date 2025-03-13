import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import { FC, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heading } from '@/components/atoms/Heading';
import { ROUTES } from '@/constants/ROUTES';
import { useAddToFavouritesLS } from '@/hooks';
import { Props } from './types';

export const PetCard: FC<Props> = (props) => {
  const { id, photos, name, age, type, species, gender, description } = props;
  const cardRef = useRef<HTMLElement>(null);

  const { isFavourite, toggleFavourite } = useAddToFavouritesLS();

  const mainPhoto = useMemo(() => {
    const firstPhotoObj = photos[0];
    if (firstPhotoObj) {
      return firstPhotoObj.large || firstPhotoObj.medium || firstPhotoObj.small;
    }
  }, [photos]);

  const handleToggleFavourite = useCallback(() => {
    toggleFavourite(id);
  }, [id, toggleFavourite]);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: cardRef },
  );

  return (
    <section ref={cardRef} className="max-w-xl max-h-screen w-full rounded bg-white p-8 flex flex-col">
      <header className="relative min-h-[200px] h-[40vh] sm:h-[50vh] md:h-[60vh] flex-shrink-0 overflow-hidden bg-gray-100">
        <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-between">
          <Heading as="h3" className="py-2 px-4 bg-white text-gray-600">
            {name}
          </Heading>
          <button className="bg-white p-2 cursor-pointer" onClick={handleToggleFavourite}>
            <Heart size={32} weight={isFavourite(id) ? 'fill' : 'regular'} color="#e12c2c" />
          </button>
        </div>
        {mainPhoto ? (
          <Image
            className="w-full h-full object-cover object-top"
            src={mainPhoto}
            alt={`${name} ${type}`}
            width={512}
            height={512}
          />
        ) : (
          <div className=" w-full h-full bg-gray-700 flex justify-center items-center">
            <p className="text-white font-semibold">No photo</p>
          </div>
        )}
      </header>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          <p className="text-xs py-2 text-gray-500">
            {age} - {gender} - {species}
          </p>
          <p className="italic text-gray-500">{description}</p>
        </div>
        <div className="flex flex-col items-end mt-2">
          <Link
            className="font-semibold text-gray-500 hover:scale-105 transition-transform"
            href={ROUTES.SINGLE_PET.replace(':id', String(id))}
          >
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
};
PetCard.displayName = 'PetCard';
