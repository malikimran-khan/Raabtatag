/**
 * Screen — mobile-first app shell.
 * - Fixed AppHeader pinned above the scroll content (app bar pattern):
 *     · Tab roots: menu (drawer) + brand logo + language switcher.
 *     · Stack screens: back button + screen title + language switcher.
 * - Keyboard-aware (iOS padding) with drag-to-dismiss and tap-to-focus
 *   handling for forms.
 * - Safe-area aware top (header) and bottom paddings.
 */
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ReactNode } from 'react';

import { AppHeader } from '@/components/ui/AppHeader';
import { ThemedView } from '@/components/themed-view';
import { Footer } from '@/components/ui/Footer';
import { MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenProps = {
  children: ReactNode;
  /** Stack presentation: shows a back button + title app bar. */
  showBack?: boolean;
  /** Optional compact title shown in the app bar (stack screens). */
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
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AppHeader variant={showBack ? 'stack' : 'tab'} title={title} />
        <ScrollView
          style={styles.flex}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        >
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
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

export default Screen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  inner: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    gap: Spacing.three,
  },
});

