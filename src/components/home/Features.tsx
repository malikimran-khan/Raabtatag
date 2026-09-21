/**
 * Features — clone of the web FeaturesSection (6 feature cards, 2-col grid).
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useIsCompactScreen } from '@/hooks/use-breakpoint';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const FEATURES: Array<{ icon: IconName; key: string }> = [
  { icon: 'qr-code-outline', key: 'vehicleQr' },
  { icon: 'pricetag-outline', key: 'personalItems' },
  { icon: 'shield-checkmark-outline', key: 'privacy' },
  { icon: 'flash-outline', key: 'instantAlerts' },
  { icon: 'download-outline', key: 'easyDownload' },
  { icon: 'phone-portrait-outline', key: 'worksEverywhere' },
];

export function Features() {
  const theme = useTheme();
  const { t } = useLanguage();
  const isCompact = useIsCompactScreen();

  return (
    <View style={styles.section}>
      <SectionHeading
        title={t('features.heading')}
        subtitle={t('features.subheading')}
      />
      <View style={styles.grid}>
        {FEATURES.map(({ icon, key }) => (
          <View
            key={key}
            style={[
              styles.card,
              isCompact ? styles.cardCompact : null,
              { borderColor: 'rgba(18, 18, 18, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.8)' },
            ]}
          >
            <View style={[styles.iconTile, { backgroundColor: 'rgba(203, 243, 43, 0.1)' }]}>
              <Ionicons name={icon} size={22} color={theme.accent} />
            </View>
            <View style={isCompact ? styles.textContent : null}>
              <ThemedText type="cardTitle" style={styles.title}>
                {t(`features.${key}.title`)}
              </ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.description}>
                {t(`features.${key}.description`)}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: Spacing.three,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two + 2,
  },
  card: {
    width: '47%',
    flexGrow: 1,
    minWidth: 150,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.three,
  },
  // Phone: single-column horizontal rows (icon left, text right) —
  // touch friendly, no squeezed 2-col grid.
  cardCompact: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 2,
    padding: Spacing.two + 4,
    borderRadius: Radius.lg,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    flex: 1,
    gap: Spacing.one,
  },
  title: {
    marginBottom: Spacing.one + 2,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
  },
});

export default Features;
