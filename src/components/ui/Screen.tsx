/**
 * Screen — mobile-first app shell:
 * - Tab roots: compact brand header (small logo + language switcher).
 * - Stack screens: back button + screen title + language switcher.
 * - Full-width mobile content column, centered with a max width on tablets/desktop.
 * - Safe-area aware top and bottom paddings (bottom padding clears the tab bar).
 */
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { LanguageSwitcher } from '@/components/ui/LanguageModal';
import { Footer } from '@/components/ui/Footer';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';

const LOGO = require('@/assets/images/raabta-logo.png');

/**
 * Compact app header.
 * Tab roots render the small RAABTA TAG logo; stack screens render a
 * back chevron + screen title. The language switcher always sits on the right.
 */
export function ScreenHeader({
  showBack = false,
  title,
}: {
  showBack?: boolean;
  title?: string;
}) {
  const router = useRouter();
  const theme = useTheme();
  const { isRTL } = useLanguage();
  const insets = useSafeAreaInsets();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={[styles.header, { paddingTop: insets.top + Spacing.two }]}>
      {showBack ? (
        <>
          <Pressable
            onPress={goBack}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Ionicons
              name={isRTL ? 'chevron-forward' : 'chevron-back'}
              size={24}
              color={theme.text}
            />
          </Pressable>
          <ThemedText type="cardTitle" numberOfLines={1} style={styles.headerTitle}>
            {title ?? ''}
          </ThemedText>
        </>
      ) : (
        <>
          <Pressable onPress={() => router.replace('/')} style={styles.logoWrap}>
            <Image source={LOGO} style={styles.logo} contentFit="contain" />
          </Pressable>
          {title ? (
            <ThemedText
              type="cardTitle"
              numberOfLines={1}
              style={[styles.headerTitle, styles.headerTitleAbsolute]}
            >
              {title}
            </ThemedText>
          ) : null}
        </>
      )}
      <LanguageSwitcher />
    </View>
  );
}

type ScreenProps = {
  children: ReactNode;
  showBack?: boolean;
  /** Optional compact title shown in the header bar (stack screens). */
  title?: string;
  /** Renders the compact RAABTA TAG footer (used by the More hub). */
  withFooter?: boolean;
  maxWidth?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  showBack = false,
  withFooter = false,
  title,
  maxWidth = MaxContentWidth,
  contentContainerStyle,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.flex}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScreenHeader showBack={showBack} title={title} />
        <View
          style={[
            styles.inner,
            { maxWidth, paddingBottom: insets.bottom + Spacing.six },
          ]}
        >
          {children}
        </View>
        {withFooter ? <Footer /> : null}
      </ScrollView>
    </ThemedView>
  );
}

export default Screen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.two + 4,
    paddingBottom: Spacing.one + 2,
    gap: Spacing.two,
    minHeight: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  headerTitleAbsolute: {
    position: 'absolute',
    left: 60,
    right: 60,
  },
  logoWrap: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logo: {
    height: 30,
    width: 92,
  },
  inner: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    gap: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
});
