/**
 * StepBadge — clone of the web How-It-Works numbered gradient circles.
 */
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/themed-text';

type StepBadgeProps = {
  number: string;
  /** Gradient colors, e.g. ['#CBF32B', '#D9F99D'] (web from-accent to-lime-200). */
  colors: [string, string, ...string[]];
  size?: number;
};

export function StepBadge({ number, colors, size = 72 }: StepBadgeProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <ThemedText type="h2" style={styles.number}>
        {number}
      </ThemedText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#121212',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    marginBottom: 0,
  },
  number: {
    color: '#FFFFFF',
  },
});

export default StepBadge;
