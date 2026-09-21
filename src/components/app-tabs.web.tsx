import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  type TabListProps,
} from 'expo-router/ui';
import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  type ColorValue,
} from 'react-native';
import type { ReactNode } from 'react';

import { Colors, Spacing } from '@/constants/theme';
import { fontForWeight } from '@/constants/fonts';
import { useIsTabletUp } from '@/hooks/use-breakpoint';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

/**
 * Web bottom tab bar — a real mobile-app navigation bar:
 * fixed to the bottom of the viewport with icon + label tabs on phones,
 * and a floating pill version on tablets/desktop so the desktop layout
 * keeps working.
 */
export default function AppTabs() {
  return (
    <Tabs style={styles.root}>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <TabBar>
          <TabTrigger name="home" href="/" asChild>
            <TabButton label="Home" icon="home-outline" iconActive="home" />
          </TabTrigger>
          <TabTrigger name="register" href={'/register' as never} asChild>
            <TabButton label="Register" icon="add-circle-outline" iconActive="add-circle" />
          </TabTrigger>
          <TabTrigger name="more" href="/more" asChild>
            <TabButton
              label="More"
              icon="ellipsis-horizontal"
              iconActive="ellipsis-horizontal"
            />
          </TabTrigger>
        </TabBar>
      </TabList>
    </Tabs>
  );
}

type TabBarProps = TabListProps & { children?: ReactNode };

function TabBar({ style, ...props }: TabBarProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];
  const isWide = useIsTabletUp();

  return (
    <View {...props} style={[styles.barOuter, isWide && styles.barOuterWide, style]}>
      <View
        style={[
          styles.bar,
          { backgroundColor: colors.background, borderColor: colors.border },
          isWide && styles.barWide,
        ]}
      >
        {props.children}
      </View>
    </View>
  );
}

type TabButtonProps = TabTriggerSlotProps & {
  label: string;
  icon: IconName;
  iconActive: IconName;
};

function TabButton({ label, icon, iconActive, isFocused, ...props }: TabButtonProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  const iconColor: ColorValue = isFocused ? colors.highlight : colors.textSecondary;
  const labelColor = isFocused ? colors.text : colors.textSecondary;

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      style={({ pressed }) => [styles.tabButton, pressed && styles.tabButtonPressed]}
    >
      <View
        style={[styles.iconBubble, isFocused ? { backgroundColor: colors.accentSoft } : null]}
      >
        <Ionicons name={isFocused ? iconActive : icon} size={22} color={iconColor} />
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.tabLabel,
          { color: labelColor, fontFamily: fontForWeight(isFocused ? 700 : 500) },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  slot: {
    height: '100%',
  },
  // Fixed app-style bottom bar (phones)
  barOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: 1,
    paddingHorizontal: Spacing.two,
    paddingTop: 6,
    paddingBottom: 8,
  },
  // Floating pill (tablets / desktop)
  barOuterWide: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  barWide: {
    width: '100%',
    maxWidth: 480,
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: Spacing.two,
    shadowColor: '#121212',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 4,
  },
  tabButtonPressed: {
    opacity: 0.7,
  },
  iconBubble: {
    width: 40,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
});
