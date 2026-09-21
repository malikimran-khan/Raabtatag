/**
 * About — mobile layout: hero intro, mission card, values list,
 * offer cards with checklists and a community CTA.
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
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function AboutScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

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
        <ThemedText type="body" themeColor="textSecondary">
          {t('about.missionIntro')}
        </ThemedText>
      </View>

      <Card style={styles.missionCard}>
        <ThemedText type="h3">{t('about.missionTitle')}</ThemedText>
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

      <SectionHeading title={t('about.valuesTitle')} align="left" />

      <View style={styles.valueStack}>
        {values.map(({ icon, titleKey, descKey }) => (
          <View
            key={titleKey}
            style={[styles.valueCard, { borderColor: theme.border, backgroundColor: theme.white }]}
          >
            <View style={[styles.iconTile, { backgroundColor: theme.accentSoft }]}>
              <Ionicons name={icon} size={20} color={theme.accentHover} />
            </View>
            <View style={styles.valueTextWrap}>
              <ThemedText type="cardTitle">{t(titleKey)}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.valueText}>
                {t(descKey)}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      <SectionHeading title={t('about.offerTitle')} align="left" />

      <View style={styles.offerStack}>
        <View style={[styles.offerCard, { backgroundColor: theme.surface }]}>
          <View style={[styles.iconTile, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name="qr-code-outline" size={22} color={theme.accentHover} />
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

        <View style={[styles.offerCard, { backgroundColor: theme.surface }]}>
          <View style={[styles.iconTile, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name="pricetag-outline" size={22} color={theme.accentHover} />
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

      <View style={[styles.ctaCard, { backgroundColor: theme.accentSoft }]}>
        <ThemedText type="h3" style={styles.center}>
          {t('about.communityTitle')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          {t('about.communityText')}
        </ThemedText>
        <View style={styles.ctaRow}>
          <Button fullWidth onPress={() => router.push('/create')}>
            {t('nav.registerVehicle')}
          </Button>
          <Button variant="outline" fullWidth onPress={() => router.push('/register-item')}>
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
  },
  left: {
    textAlign: 'left',
  },
  missionCard: {
    gap: Spacing.three,
  },
  valueStack: {
    gap: Spacing.two,
  },
  valueCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
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
  },
  offerCard: {
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: Spacing.two + 2,
  },
  points: {
    gap: Spacing.two + 2,
    marginTop: Spacing.one,
  },
  ctaCard: {
    borderRadius: Radius.xl,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two + 2,
  },
  ctaRow: {
    alignSelf: 'stretch',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
});

