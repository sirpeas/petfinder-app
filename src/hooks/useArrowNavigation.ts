import { useRef, useState } from 'react';
import debounce from 'lodash-es/debounce';
import { useKeyDownListener } from './useKeyDownListener';
import { useRefScrollListener } from './useRefScrollListener';

const checkIfElementIsCentered = (element: HTMLElement, toleration: number = 5) => {
  const rect = element.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;
  const elementCenter = rect.top + rect.height / 2;

  return Math.abs(elementCenter - viewportCenter) < toleration;
};

const scrollIntoViewPromise = (element: HTMLElement) => {
  const elementCenter = element.offsetTop + element.offsetHeight / 2;
  const viewportCenter = window.innerHeight / 2;
  const desiredScrollY = elementCenter - viewportCenter;

  window.scrollTo({ top: desiredScrollY, behavior: 'smooth' });

  return new Promise((resolve) => {
    const checkPosition = () => {
      if (checkIfElementIsCentered(element)) {
        resolve(true);
      } else {
        requestAnimationFrame(checkPosition);
      }
    };

    requestAnimationFrame(checkPosition);
  });
};

const findClosestItem = (items: HTMLCollection) => {
  if (items.length === 0) return null;

  let selectedItem = items[0] as HTMLElement;
  let minDistance = Infinity;

  for (const item of Array.from(items) as HTMLElement[]) {
    const { top, height } = item.getBoundingClientRect();
    const distance = Math.abs(top + height / 2 - window.innerHeight / 2);

    if (distance < minDistance) {
      minDistance = distance;
      selectedItem = item;
    } else {
      break;
    }
  }

  return selectedItem;
};

export const useArrowNavigation = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const isScrolling = useRef<boolean>(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
      e.preventDefault();
    }
    if (!listRef.current || isScrolling.current) return;
    let newIndex = selectedIndex;

    if (['ArrowDown', ' '].includes(e.key)) {
      newIndex = Math.min(newIndex + 1, listRef.current.children.length - 1);
    } else if (e.key === 'ArrowUp') {
      newIndex = Math.max(newIndex - 1, 0);
    }

    const selectedItem = listRef.current.children[newIndex] as HTMLElement;
    if (selectedItem) {
      isScrolling.current = true;
      scrollIntoViewPromise(selectedItem).then(() => {
        isScrolling.current = false;
        setSelectedIndex(newIndex);
      });
    }
    return false;
  };

  const handleScroll = debounce(() => {
    if (isScrolling.current || !listRef.current) return;
    const closestItem = findClosestItem(listRef.current.children);
    if (closestItem) {
      const newIndex = Array.from(listRef.current.children).indexOf(closestItem);
      setSelectedIndex(newIndex);
      scrollIntoViewPromise(closestItem).then(() => {
        isScrolling.current = false;
      });
    }
  }, 1000);

  useKeyDownListener(handleKeyDown);
  useRefScrollListener(listRef, handleScroll);

  return { containerRef: listRef, selectedIndex };
};
