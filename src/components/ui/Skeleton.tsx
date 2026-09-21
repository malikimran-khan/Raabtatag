/**
 * Skeleton — clone of the parking-alert web Skeleton/CardSkeleton
 * (pulsing placeholder blocks).
 */
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useEffect, useRef } from 'react';

import { Radius, Spacing } from '@/constants/theme';

export function Skeleton({ style }: { style?: StyleProp<ViewStyle> }) {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.45, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.base,
        style as ViewStyle,
        { opacity },
      ]}
    />
  );
}

export function CardSkeleton() {
  return (
    <View style={styles.card}>
      <Skeleton style={styles.line75} />
      <Skeleton style={styles.line50} />
      <View style={styles.stack}>
        <Skeleton style={styles.line100} />
        <Skeleton style={styles.line83} />
        <Skeleton style={styles.line66} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'rgba(18, 18, 18, 0.06)',
    borderRadius: Radius.sm,
    height: 16,
  },
  card: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
    backgroundColor: '#FFFFFF',
    padding: Spacing.four,
  },
  line75: { width: '75%', marginBottom: Spacing.three },
  line50: { width: '50%', marginBottom: Spacing.four },
  line100: { width: '100%' },
  line83: { width: '83%', marginTop: Spacing.two + 4 },
  line66: { width: '66%', marginTop: Spacing.two + 4 },
  stack: { gap: 0 },
});

export default Skeleton;
