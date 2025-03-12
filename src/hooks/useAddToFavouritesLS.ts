import { useLocalStorage } from 'usehooks-ts';
import { useCallback } from 'react';

export const useAddToFavouritesLS = () => {
  const [value, setValue] = useLocalStorage<number[]>('favouritePets', []);

  const addToFavourites = useCallback(
    (petId: number) => {
      setValue((prev) => [...prev, petId]);
    },
    [setValue],
  );

  const removeFromFavourites = useCallback(
    (petId: number) => {
      setValue((prev) => prev.filter((id) => id !== petId));
    },
    [setValue],
  );

  const isFavourite = useCallback((petId: number) => value.includes(petId), [value]);

  const toggleFavourite = useCallback(
    (petId: number) => {
      setValue((prev) => (prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]));
    },
    [setValue],
  );

  return {
    favourites: value,
    isFavourite,
    toggleFavourite,
    addToFavourites,
    removeFromFavourites,
  };
};
