import { useWindowDimensions } from 'react-native';

/**
 * Mobile-first breakpoint helpers.
 *
 * `useIsCompactScreen` reports whether the current window is phone-sized.
 * Used to switch desktop-style 2-column grids to single-column lists and
 * to keep the floating desktop tab bar phone-only.
 */
export function useIsCompactScreen(breakpoint = 480): boolean {
  const { width } = useWindowDimensions();
  return width < breakpoint;
}

export function useIsTabletUp(breakpoint = 768): boolean {
  const { width } = useWindowDimensions();
  return width >= breakpoint;
}
