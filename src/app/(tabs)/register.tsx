/**
 * Register — hub tab giving one-tap access to the two registration
 * flows. Routes are unchanged: /create (vehicle) and /register-item.
 */
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';

import { Screen } from '@/components/ui/Screen';
import { TitleWithAccent } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function RegisterScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

  const options: Array<{
    icon: IconName;
    title: string;
    description: string;
    href: '/create' | '/register-item';
  }> = [
    {
      icon: 'car-outline',
      title: t('nav.registerVehicle'),
      description: t('createVehicle.subtitle'),
      href: '/create',
    },
    {
      icon: 'pricetag-outline',
      title: t('nav.registerItem'),
      description: t('personalItemForm.subtitle'),
      href: '/register-item',
    },
  ];

  return (
    <Screen>
      <View style={styles.intro}>
        <TitleWithAccent text={t('cta.heading')} type="h2" style={styles.left} />
        <ThemedText type="body" themeColor="textSecondary" style={styles.left}>
          {t('cta.subheading')}
        </ThemedText>
      </View>

      <View style={styles.stack}>
        {options.map((option) => (
          <Pressable
            key={option.href}
            onPress={() => router.push(option.href as never)}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.optionCard,
              { borderColor: theme.border, backgroundColor: theme.white },
              pressed && styles.pressedCard,
            ]}
          >
            <View style={[styles.iconTile, { backgroundColor: theme.accentSoft }]}>
              <Ionicons name={option.icon} size={26} color={theme.accentHover} />
            </View>
            <View style={styles.optionText}>
              <ThemedText type="cardTitle">{option.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" numberOfLines={3}>
                {option.description}
              </ThemedText>
            </View>
            <View style={[styles.chevronTile, { backgroundColor: theme.surface }]}>
              <Ionicons name="chevron-forward" size={18} color={theme.text} />
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => router.push('/how-it-works' as never)}
        style={({ pressed }) => [
          styles.howRow,
          { backgroundColor: theme.accentSoft },
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="help-circle-outline" size={20} color={theme.accentHover} />
        <ThemedText type="smallBold" style={styles.howText}>
          {t('nav.howItWorks')}
        </ThemedText>
        <Ionicons name="arrow-forward" size={16} color={theme.accentHover} />
      </Pressable>

      <ThemedText type="caption" themeColor="textSecondary" style={styles.footnote}>
        {t('cta.footerText')}
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: {
    gap: Spacing.two,
  },
  left: {
    textAlign: 'left',
  },
  stack: {
    gap: Spacing.three,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 4,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.three,
    shadowColor: '#121212',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  pressedCard: {
    borderColor: 'rgba(203, 243, 43, 0.5)',
    transform: [{ scale: 0.98 }],
  },
  iconTile: {
    width: 54,
    height: 54,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    flex: 1,
    gap: Spacing.one,
  },
  chevronTile: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  howRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 2,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 4,
    minHeight: 48,
  },
  howText: {
    flex: 1,
  },
  footnote: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});

