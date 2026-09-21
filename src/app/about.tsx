/**
 * About — clone of the parking-alert web AboutPage:
 * hero, mission card, values grid, "What We Offer" cards, community CTA.
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';

import { Screen } from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckItem } from '@/components/ui/CheckItem';
import { SectionHeading, TitleWithAccent } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useIsCompactScreen } from '@/hooks/use-breakpoint';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function AboutScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();
  const isCompact = useIsCompactScreen();

  const values: Array<{ icon: IconName; titleKey: string; descKey: string }> = [
    { icon: 'shield-checkmark-outline', titleKey: 'features.privacy.title', descKey: 'features.privacy.description' },
    { icon: 'flash-outline', titleKey: 'features.instantAlerts.title', descKey: 'features.instantAlerts.description' },
    { icon: 'qr-code-outline', titleKey: 'features.vehicleQr.title', descKey: 'features.vehicleQr.description' },
    { icon: 'download-outline', titleKey: 'features.easyDownload.title', descKey: 'features.easyDownload.description' },
  ];

  return (
    <Screen showBack withFooter title="About">
      <View style={styles.hero}>
        <TitleWithAccent text="About RAABTA TAG" type="h2" style={styles.left} />
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          {t('about.missionIntro')}
        </ThemedText>
      </View>

      <Card style={styles.missionCard}>
        <ThemedText type="h2">{t('about.missionTitle')}</ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          {t('about.missionText1')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          {t('about.missionText2')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          {t('about.missionText3')}
        </ThemedText>
      </Card>

      <SectionHeading title={t('about.valuesTitle')} />

      <View style={styles.grid}>
        {values.map(({ icon, titleKey, descKey }) => (
          <View
            key={titleKey}
            style={[
              styles.valueCard,
              isCompact ? styles.valueCardCompact : null,
              { borderColor: 'rgba(18, 18, 18, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.8)' },
            ]}
          >
            <View style={[styles.iconTile, { backgroundColor: 'rgba(203, 243, 43, 0.1)' }]}>
              <Ionicons name={icon} size={20} color={theme.accent} />
            </View>
            <View style={isCompact ? styles.valueTextWrap : null}>
              <ThemedText type="cardTitle">{t(titleKey)}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.valueText}>
                {t(descKey)}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      <SectionHeading title={t('about.offerTitle')} />

      <View style={styles.offerStack}>
        <View style={[styles.offerCard, { backgroundColor: 'rgba(203, 243, 43, 0.05)' }]}>
          <View style={[styles.iconTile, { backgroundColor: 'rgba(203, 243, 43, 0.1)' }]}>
            <Ionicons name="qr-code-outline" size={22} color={theme.accent} />
          </View>
          <ThemedText type="h3">{t('about.offerVehicleTitle')}</ThemedText>
          <ThemedText type="body" themeColor="textSecondary">
            {t('about.offerVehicleText')}
          </ThemedText>
          <View style={styles.points}>
            <CheckItem>{t('about.offerVehiclePoint1')}</CheckItem>
            <CheckItem>{t('about.offerVehiclePoint2')}</CheckItem>
            <CheckItem>{t('about.offerVehiclePoint3')}</CheckItem>
          </View>
        </View>

        <View style={[styles.offerCard, { backgroundColor: 'rgba(18, 18, 18, 0.03)' }]}>
          <View style={[styles.iconTile, { backgroundColor: 'rgba(203, 243, 43, 0.1)' }]}>
            <Ionicons name="pricetag-outline" size={22} color={theme.accent} />
          </View>
          <ThemedText type="h3">{t('about.offerItemTitle')}</ThemedText>
          <ThemedText type="body" themeColor="textSecondary">
            {t('about.offerItemText')}
          </ThemedText>
          <View style={styles.points}>
            <CheckItem>{t('about.offerItemPoint1')}</CheckItem>
            <CheckItem>{t('about.offerItemPoint2')}</CheckItem>
            <CheckItem>{t('about.offerItemPoint3')}</CheckItem>
          </View>
        </View>
      </View>

      <View style={[styles.ctaCard, { backgroundColor: 'rgba(203, 243, 43, 0.08)' }]}>
        <ThemedText type="h2" style={styles.center}>
          {t('about.communityTitle')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          {t('about.communityText')}
        </ThemedText>
        <View style={styles.ctaRow}>
          <Button variant="primary" onPress={() => router.push('/create')}>
            {t('nav.registerVehicle')}
          </Button>
          <Button variant="outline" onPress={() => router.push('/register-item')}>
            {t('nav.registerItem')}
          </Button>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  hero: {
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  left: {
    textAlign: 'left',
  },
  missionCard: {
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two + 2,
    marginBottom: Spacing.three,
  },
  valueCard: {
    width: '47%',
    flexGrow: 1,
    minWidth: 150,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.three,
    gap: Spacing.two + 2,
  },
  // Phone: single-column horizontal rows.
  valueCardCompact: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 2,
    padding: Spacing.two + 4,
    borderRadius: Radius.lg,
  },
  valueTextWrap: {
    flex: 1,
    gap: Spacing.one,
  },
  iconTile: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 13,
    lineHeight: 20,
  },
  offerStack: {
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  offerCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
    padding: Spacing.three,
    gap: Spacing.two + 2,
  },
  points: {
    gap: Spacing.two + 2,
    marginTop: Spacing.one,
  },
  ctaCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
  },
  ctaRow: {
    alignSelf: 'stretch',
    gap: Spacing.two + 2,
  },
});
