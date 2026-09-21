/**
 * Features — single-column feature rows on phones (icon left, text right),
 * 2-col grid on tablets.
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useIsTabletUp } from '@/hooks/use-breakpoint';
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
  const isTablet = useIsTabletUp();

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
              isTablet ? styles.cardGrid : styles.cardRow,
              { borderColor: theme.border, backgroundColor: theme.white },
            ]}
          >
            <View style={[styles.iconTile, { backgroundColor: theme.accentSoft }]}>
              <Ionicons name={icon} size={21} color={theme.accentHover} />
            </View>
            <View style={isTablet ? styles.textContent : styles.textContent}>
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
    gap: Spacing.two,
  },
  // Phone: single-column horizontal rows — comfortable touch targets.
  cardRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.two + 4,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  // Tablet: 2-col tiles.
  cardGrid: {
    width: '48.5%',
    flexGrow: 1,
    flexDirection: 'column',
    gap: Spacing.two + 2,
    padding: Spacing.three,
    borderRadius: Radius.xl,
    borderWidth: 1,
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
    fontSize: 15,
    lineHeight: 21,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
  },
});

export default Features;

