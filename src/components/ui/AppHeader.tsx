/**
 * AppHeader — fixed mobile app bar.
 * - Tab roots: menu button (opens the side drawer) + brand logo + language.
 * - Stack screens: back button + screen title + language, hairline divider.
 * Rendered above the scroll content so it stays pinned while scrolling.
 */
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { IconButton } from '@/components/ui/IconButton';
import { LanguageSwitcher } from '@/components/ui/LanguageModal';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDrawer } from '@/components/navigation/AppDrawer';
import { Spacing } from '@/constants/theme';

const LOGO = require('@/assets/images/raabta-logo.png');

export function AppHeader({
  variant = 'stack',
  title,
}: {
  variant?: 'tab' | 'stack';
  title?: string;
}) {
  const router = useRouter();
  const theme = useTheme();
  const { isRTL } = useLanguage();
  const insets = useSafeAreaInsets();
  const { open } = useAppDrawer();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + Spacing.one + 2 },
        variant === 'stack' && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border },
      ]}
    >
      {variant === 'stack' ? (
        <>
          <IconButton
            name={isRTL ? 'chevron-forward' : 'chevron-back'}
            size={24}
            onPress={goBack}
            accessibilityLabel="Go back"
            hitSlop={12}
          />
          <ThemedText type="cardTitle" numberOfLines={1} style={styles.stackTitle}>
            {title ?? ''}
          </ThemedText>
        </>
      ) : (
        <>
          <IconButton
            name="menu"
            size={24}
            onPress={open}
            accessibilityLabel="Open menu"
            hitSlop={12}
          />
          <Image source={LOGO} style={styles.logo} contentFit="contain" />
        </>
      )}
      <LanguageSwitcher />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.two + 4,
    paddingBottom: Spacing.one + 2,
    gap: Spacing.two,
    minHeight: 56,
  },
  stackTitle: {
    flex: 1,
  },
  logo: {
    height: 28,
    width: 88,
    flex: 1,
    alignSelf: 'center',
  },
});
