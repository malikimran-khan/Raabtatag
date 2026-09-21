/**
 * SegmentedControl — iOS-style segmented tabs with an animated thumb.
 * Used to switch between related content groups (e.g. vehicle / item
 * registration steps) without stacking sections.
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
import { useEffect, useRef, useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

type Segment<V extends string = string> = {
  value: V;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

type SegmentedControlProps<V extends string = string> = {
  segments: ReadonlyArray<Segment<V>>;
  value: V;
  onChange: (value: V) => void;
  style?: StyleProp<ViewStyle>;
};

export function SegmentedControl<V extends string = string>({
  segments,
  value,
  onChange,
  style,
}: SegmentedControlProps<V>) {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const activeIndex = Math.max(
    0,
    segments.findIndex((segment) => segment.value === value),
  );

  const position = useRef(new Animated.Value(activeIndex)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: activeIndex,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [activeIndex, position]);

  const segmentWidth = width / segments.length;
  const thumbTranslateX = position.interpolate({
    inputRange: segments.map((_, index) => index),
    outputRange: segments.map((_, index) => index * segmentWidth),
  });

  return (
    <View
      style={[styles.track, style]}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      accessibilityRole="tablist"
    >
      {width > 0 ? (
        <Animated.View
          style={[styles.thumb, { width: segmentWidth, transform: [{ translateX: thumbTranslateX }] }]}
        />
      ) : null}
      {segments.map((segment) => {
        const selected = segment.value === value;
        return (
          <Pressable
            key={segment.value}
            onPress={() => onChange(segment.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={styles.segment}
          >
            {segment.icon ? (
              <Ionicons name={segment.icon} size={16} color={selected ? theme.highlight : theme.textSecondary} />
            ) : null}
            <ThemedText
              type="smallBold"
              style={{ color: selected ? theme.highlight : theme.textSecondary }}
              numberOfLines={1}
            >
              {segment.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: 'rgba(18, 18, 18, 0.05)',
    borderRadius: Radius.md,
    padding: 4,
    minHeight: 44,
  },
  thumb: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 0,
    borderRadius: Radius.md - 4,
    backgroundColor: '#FFFFFF',
    shadowColor: '#121212',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  segment: {
    flex: 1,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one + 2,
    paddingHorizontal: Spacing.two,
  },
});
