/**
 * How It Works — segmented control (Vehicles / Personal Items) with a
 * vertical step timeline and CTA. All six steps are preserved; the
 * segments just switch between the two flows.
 */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

const ACCENT_LIME: [string, string] = ['#CBF32B', '#D9F99D'];
const DARK_STONE: [string, string] = ['#121212', '#57534E'];
const ACCENT_DARK: [string, string] = ['#CBF32B', '#121212'];

type Flow = 'vehicle' | 'item';

export default function HowItWorksScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();
  const [flow, setFlow] = useState<Flow>('vehicle');

  const vehicleSteps = [
    { number: '01', colors: ACCENT_LIME, titleKey: 'howItWorks.vehicleStep1Title', descKey: 'howItWorks.vehicleStep1Description' },
    { number: '02', colors: DARK_STONE, titleKey: 'howItWorks.vehicleStep2Title', descKey: 'howItWorks.vehicleStep2Description' },
    { number: '03', colors: ACCENT_DARK, titleKey: 'howItWorks.vehicleStep3Title', descKey: 'howItWorks.vehicleStep3Description' },
  ];

  const itemSteps = [
    { number: '01', colors: DARK_STONE, titleKey: 'howItWorks.itemStep1Title', descKey: 'howItWorks.itemStep1Description' },
    { number: '02', colors: ACCENT_LIME, titleKey: 'howItWorks.itemStep2Title', descKey: 'howItWorks.itemStep2Description' },
    { number: '03', colors: ACCENT_DARK, titleKey: 'howItWorks.itemStep3Title', descKey: 'howItWorks.itemStep3Description' },
  ];

  const steps = flow === 'vehicle' ? vehicleSteps : itemSteps;

  return (
    <Screen showBack withFooter title={t('howItWorks.title')}>
      <View style={styles.header}>
        <ThemedText type="h2" style={styles.left}>
          {t('howItWorks.title')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.left}>
          {t('howItWorks.subtitle')}
        </ThemedText>
      </View>

      <SegmentedControl<Flow>
        segments={[
          { value: 'vehicle', label: t('nav.registerVehicle'), icon: 'car-outline' },
          { value: 'item', label: t('nav.registerItem'), icon: 'pricetag-outline' },
        ]}
        value={flow}
        onChange={setFlow}
      />

      <SectionHeading
        title={flow === 'vehicle' ? t('howItWorks.vehiclesTitle') : t('howItWorks.itemsTitle')}
        subtitle={flow === 'vehicle' ? t('howItWorks.vehiclesSubtitle') : t('howItWorks.itemsSubtitle')}
        align="left"
      />

      <View style={styles.timeline}>
        {steps.map((step, index) => (
          <View key={step.titleKey} style={styles.timelineRow}>
            {index < steps.length - 1 ? (
              <View style={[styles.connector, { backgroundColor: theme.border }]} />
            ) : null}
            <LinearGradient
              colors={step.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.stepBadge}
            >
              <ThemedText type="cardTitle" style={styles.stepNumber}>
                {step.number}
              </ThemedText>
            </LinearGradient>
            <View style={[styles.stepBody, { borderColor: theme.border, backgroundColor: theme.white }]}>
              <ThemedText type="cardTitle">{t(step.titleKey)}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.stepText}>
                {t(step.descKey)}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.ctaCard, { backgroundColor: theme.accentSoft }]}>
        <ThemedText type="h3" style={styles.ctaCenter}>
          {t('howItWorks.ctaTitle')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.ctaCenter}>
          {t('howItWorks.ctaSubtitle')}
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
  left: {
    textAlign: 'left',
  },
  header: {
    gap: Spacing.two,
  },
  timeline: {
    gap: Spacing.three,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: Spacing.three,
  },
  connector: {
    position: 'absolute',
    left: 26,
    top: 52,
    bottom: -Spacing.three,
    width: 2,
  },
  stepBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#121212',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  stepBody: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  stepText: {
    fontSize: 13,
    lineHeight: 20,
  },
  ctaCard: {
    borderRadius: Radius.xl,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two + 2,
  },
  ctaCenter: {
    textAlign: 'center',
  },
  ctaRow: {
    alignSelf: 'stretch',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
});

