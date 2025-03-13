import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const useGSAPFadeIn = () => {
  useGSAP(() => {
    const itemsToFadeIn = gsap.utils.toArray('.fade-in');
    gsap.fromTo(
      itemsToFadeIn,
      { y: 0, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
    );
  }, []);
};
