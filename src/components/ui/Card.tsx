/**
 * Card — clone of the parking-alert web glassmorphism Card
 * (glass rounded-2xl p-6, optional hover glow → static soft shadow).
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
};

export function Card({ children, style, glow = false, padded = true }: CardProps) {
  return (
    <ThemedView
      style={[
        styles.card,
        padded && { padding: Spacing.three + Spacing.two },
        glow && styles.glow,
        style,
      ]}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.08)',
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  glow: {
    shadowColor: '#121212',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 3,
  },
});

export default Card;
