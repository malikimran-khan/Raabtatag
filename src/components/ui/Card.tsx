/**
 * Card — mobile surface container.
 * Variants: elevated (white + soft shadow), outlined (white + border),
 * tonal (gray surface), accent (lime tint). The legacy `glow` prop is
 * still accepted and maps to the elevated shadow.
 */
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Adds the soft elevated shadow (web `glow` classes). */
  glow?: boolean | 'blue' | 'green';
  padded?: boolean;
  /** Visual variant; defaults to elevated when glow is set, else outlined. */
  variant?: 'elevated' | 'outlined' | 'tonal' | 'accent';
};

export function Card({
  children,
  style,
  glow = false,
  padded = true,
  variant,
}: CardProps) {
  const resolved: 'elevated' | 'outlined' | 'tonal' | 'accent' =
    variant ?? (glow ? 'elevated' : 'outlined');

  return (
    <ThemedView
      style={[
        styles.card,
        resolved === 'elevated' && styles.elevated,
        resolved === 'tonal' && styles.tonal,
        resolved === 'accent' && styles.accent,
        padded && { padding: Spacing.three + Spacing.two },
        glow && glow !== true && styles.glowAccent,
        style,
      ]}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.08)',
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: '#121212',
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
  },
  tonal: {
    backgroundColor: 'rgba(18, 18, 18, 0.03)',
    borderColor: 'transparent',
  },
  accent: {
    backgroundColor: 'rgba(203, 243, 43, 0.08)',
    borderColor: 'rgba(203, 243, 43, 0.25)',
  },
  glowAccent: {
    shadowColor: '#CBF32B',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
});

export default Card;

