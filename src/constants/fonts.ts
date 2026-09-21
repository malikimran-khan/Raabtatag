/**
 * Inter font family — the same typeface the parking-alert web app uses
 * (`--font-sans: 'Inter', system-ui, ...`).
 *
 * @expo-google-fonts/inter exports font assets; the fontFamily names are the
 * keys passed to `useFonts`, i.e. 'Inter_400Regular' ... 'Inter_900Black'.
 */
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

export const InterFonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
  black: 'Inter_900Black',
} as const;

export function fontForWeight(weight: number | undefined): string {
  if (weight === undefined) return InterFonts.regular;
  if (weight >= 900) return InterFonts.black;
  if (weight >= 800) return InterFonts.extrabold;
  if (weight >= 700) return InterFonts.bold;
  if (weight >= 600) return InterFonts.semibold;
  if (weight >= 500) return InterFonts.medium;
  return InterFonts.regular;
}

/** Loads the Inter family; returns true once all fonts are ready. */
export function useInterFonts(): boolean {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  return !!loaded;
}
