/**
 * Accordion — animated expandable row (native disclosure pattern).
 * Height animates from the measured content height, with a rotating
 * chevron. Used by FAQ and guide sections.
 */
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Accordion({ title, children, defaultOpen = false, style }: AccordionProps) {
  const theme = useTheme();
  const { isRTL } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: open ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [open, animation]);

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });
  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const chevronRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={[styles.card, style]}>
      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <ThemedText type="cardTitle" style={styles.title}>
          {title}
        </ThemedText>
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <Ionicons
            name={isRTL ? 'chevron-back' : 'chevron-forward'}
            size={18}
            color={theme.textSecondary}
          />
        </Animated.View>
      </Pressable>

      <Animated.View style={[styles.content, { height, opacity }]} pointerEvents={open ? 'auto' : 'none'}>
        <View
          onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
          style={styles.contentInner}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    minHeight: 52,
  },
  pressed: {
    backgroundColor: 'rgba(18, 18, 18, 0.03)',
  },
  title: {
    flex: 1,
  },
  content: {
    overflow: 'hidden',
  },
  contentInner: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
  },
});
