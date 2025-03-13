import { SpinnerBall } from '@phosphor-icons/react/dist/ssr';
import { useGSAPFadeIn } from '@/hooks';

export const Spinner = () => {
  useGSAPFadeIn();
  return <SpinnerBall className="fade-in animate-bounce text-gray-500" size={48} />;
};
Spinner.displayName = 'Spinner';
