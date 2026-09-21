import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

/**
 * Native bottom tab bar — mobile app navigation with three tabs:
 * Home (/), Register (/register) and More (/more).
 * Icons are Ionicons via the VectorIcon helper (outline when inactive,
 * filled when active) tinted by the tab bar.
 */
export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.accentSoft}
      rippleColor={colors.accentSoft}
      tintColor={colors.highlight}
      iconColor={{ default: colors.textSecondary, selected: colors.highlight }}
      labelStyle={{
        default: { color: colors.textSecondary },
        selected: { color: colors.highlight },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={{
            default: <NativeTabs.Trigger.VectorIcon family={Ionicons} name="home-outline" />,
            selected: <NativeTabs.Trigger.VectorIcon family={Ionicons} name="home" />,
          }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="register">
        <NativeTabs.Trigger.Label>Register</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={{
            default: <NativeTabs.Trigger.VectorIcon family={Ionicons} name="add-circle-outline" />,
            selected: <NativeTabs.Trigger.VectorIcon family={Ionicons} name="add-circle" />,
          }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="more">
        <NativeTabs.Trigger.Label>More</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={Ionicons} name="ellipsis-horizontal" />}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
