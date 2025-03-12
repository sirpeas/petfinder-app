import { useRef, useState } from 'react';
import debounce from 'lodash-es/debounce';
import { useKeyDownListener } from './useKeyDownListener';
import { useRefScrollListener } from './useRefScrollListener';

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

  const handleKeyDown = debounce((e: KeyboardEvent) => {
    e.preventDefault();
    if (!listRef.current) return;
    let newIndex = selectedIndex;

    if (e.key === 'ArrowDown') {
      newIndex = Math.min(newIndex + 1, listRef.current.children.length - 1);
    } else if (e.key === 'ArrowUp') {
      newIndex = Math.max(newIndex - 1, 0);
    }

    setSelectedIndex(newIndex);

    const selectedItem = listRef.current.children[newIndex] as HTMLElement;
    if (selectedItem) {
      isScrolling.current = true;
      selectedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        isScrolling.current = false;
      }, 100);
    }
  }, 100);

  useKeyDownListener(handleKeyDown);

  const handleScroll = debounce(() => {
    if (isScrolling.current || !listRef.current) return;
    const closestItem = findClosestItem(listRef.current.children);
    if (closestItem) {
      const newIndex = Array.from(listRef.current.children).indexOf(closestItem);
      setSelectedIndex(newIndex);
      closestItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 1000);

  useRefScrollListener(listRef, handleScroll);

  return { containerRef: listRef, selectedIndex };
};
