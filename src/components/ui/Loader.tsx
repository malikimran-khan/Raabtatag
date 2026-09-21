/**
 * Loader — clone of the parking-alert web Loader
 * (dual counter-rotating rings + pulsing text).
 */
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

export function Loader({ text = 'Loading...' }: { text?: string }) {
  const theme = useTheme();
  const rotate = useRef(new Animated.Value(0)).current;
  const rotateReverse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop1 = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    const loop2 = Animated.loop(
      Animated.timing(rotateReverse, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop1.start();
    loop2.start();
    return () => {
      loop1.stop();
      loop2.stop();
    };
  }, [rotate, rotateReverse]);

  const spin1 = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const spin2 = rotateReverse.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.rings}>
        <Animated.View
          style={[
            styles.ring,
            { borderTopColor: theme.accent, transform: [{ rotate: spin1 }] },
          ]}
        />
        <Animated.View
          style={[
            styles.ringInner,
            { borderTopColor: theme.highlight, transform: [{ rotate: spin2 }] },
          ]}
        />
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.six,
    gap: Spacing.three,
  },
  rings: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  ringInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
});

export default Loader;
