'use client';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import { FC, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HOUR } from '@/constants/TIME';
import { Spinner } from '@/components/atoms/Spinner';
import { PetfinderAPI } from '@/services/API';
import { Heading } from '@/components/atoms/Heading';
import { useAddToFavouritesLS } from '@/hooks';
import { Props } from './types';
import { Tag } from '@/components/atoms/Tag';
import { pascalCaseToReadable } from '@/helpers/stringHelpers';
import { AnimalAttributes } from '@/types/Petfinder';
import Link from 'next/link';

export const PetView: FC<Props> = (props) => {
  const { isFavourite, toggleFavourite } = useAddToFavouritesLS();
  const { data, isFetching, isError } = useQuery({
    queryKey: ['singleAnimal', props.id],
    queryFn: () => {
      if (props.id) {
        return PetfinderAPI.getAnimalById(props.id);
      }
      return null;
    },
    staleTime: HOUR,
    retry: false,
  });

  const animal = data?.animal;

  const smallPhotos = useMemo(() => {
    if (animal?.photos) {
      return animal.photos.slice(1).map((p) => p.small);
    }
    return [];
  }, [animal?.photos]);

  const handleToggleFavourite = useCallback(() => {
    if (props.id) {
      toggleFavourite(props.id);
    }
  }, [props.id]);

  const attributes = useMemo(() => {
    if (animal?.attributes) {
      return Object.keys(animal?.attributes).reduce(
        (acc, attrKey) => {
          const value: 'Yes' | 'No' = Boolean(animal.attributes[attrKey as keyof AnimalAttributes]) ? 'Yes' : 'No';
          return [
            ...acc,
            {
              name: pascalCaseToReadable(attrKey),
              value,
            },
          ];
        },
        [] as { name: string; value: 'Yes' | 'No' }[],
      );
    }
    return [];
  }, [animal?.attributes]);

  return (
    <>
      {isFetching ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
        </div>
      ) : null}
      {isError ? (
        <div className="flex flex-col items-center justify-center">
          <Heading as="h4" className="bg-white p-4">
            404 - Seems like pet you are looking for is no longer in the shelter
          </Heading>
        </div>
      ) : null}
      {animal ? (
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="md:max-w-lg gap-5">
            <div className="flex flex-col">
              <div className="flex flex-col bg-white p-8">
                <img
                  className="w-full h-full object-cover object-top"
                  src={animal.primary_photo_cropped?.large ?? null}
                  alt={`${animal.name} ${animal.type}`}
                />
              </div>
            </div>
            <div className="mg-2 flex flex-row overflow-hidden ">
              {smallPhotos.map((p, i) => (
                <div key={p} className="bg-white pb-8 pl-9 last:pr-8">
                  <img className="max-h-28" src={p} alt={`${animal.name} ${i}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-8 md:min-w-96">
            <div className="flex flex-col bg-white p-8 gap-2">
              <div className="w-full flex flex-row justify-between items-center">
                <div>
                  <Heading as="h2">{animal.name}</Heading>
                  <p className="text-xs py-2 text-gray-800">
                    {animal.age} - {animal.gender} - {animal.species}
                  </p>
                </div>
                <button className="bg-white p-2 cursor-pointer" onClick={handleToggleFavourite}>
                  <Heart size={32} weight={props.id && isFavourite(props.id) ? 'fill' : 'regular'} color="#e12c2c" />
                </button>
              </div>
              {animal.tags.length ? (
                <div>
                  <p className="flex gap-2 flex-wrap">
                    {animal.tags.map((t) => (
                      <span key={t} className="lowercase italic text-sm">
                        #{t}
                      </span>
                    ))}
                  </p>
                </div>
              ) : null}
              {animal.description ? (
                <div className="my-4">
                  <p className="italic text-gray-800">{animal.description}</p>
                </div>
              ) : null}
              <div className="flex flex-row gap-2 flex-wrap mt-4">
                {attributes.map((a) => (
                  <Tag key={a.name}>
                    <span className="font-semibold">{a.name}</span>
                    {a.value}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-start bg-white p-8 gap-2">
              <Heading as="h4">Contact Information</Heading>
              <p className="text-sm">
                Email:{' '}
                <Link className="hover:underline" href={`mailto:${animal.contact.email}`}>
                  {animal.contact.email}
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
PetView.displayName = 'PetView';
