/**
 * How It Works — clone of the parking-alert web HowItWorksPage:
 * vehicle steps + personal item steps with gradient number badges, CTA.
 */
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
import { StepBadge } from '@/components/ui/StepBadge';
import { SectionHeading, TitleWithAccent } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

const ACCENT_LIME: [string, string] = ['#CBF32B', '#D9F99D'];
const DARK_STONE: [string, string] = ['#121212', '#57534E'];
const ACCENT_DARK: [string, string] = ['#CBF32B', '#121212'];

export default function HowItWorksScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

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

  const renderSteps = (steps: typeof vehicleSteps) => (
    <View style={styles.stepsGrid}>
      {steps.map((step) => (
        <Card key={step.titleKey} glow style={styles.stepCard}>
          <StepBadge number={step.number} colors={step.colors} />
          <ThemedText type="cardTitle" style={styles.stepTitle}>
            {t(step.titleKey)}
          </ThemedText>
          <ThemedText type="body" themeColor="textSecondary" style={styles.stepText}>
            {t(step.descKey)}
          </ThemedText>
        </Card>
      ))}
    </View>
  );

  return (
    <Screen showBack withFooter title={t('howItWorks.title')}>
      <View style={styles.header}>
        <TitleWithAccent text={t('howItWorks.title')} type="h2" style={styles.left} />
        <ThemedText type="body" themeColor="textSecondary" style={styles.left}>
          {t('howItWorks.subtitle')}
        </ThemedText>
      </View>

      <SectionHeading
        title={t('howItWorks.vehiclesTitle')}
        subtitle={t('howItWorks.vehiclesSubtitle')}
        emphasizeLast
      />
      {renderSteps(vehicleSteps)}

      <SectionHeading
        title={t('howItWorks.itemsTitle')}
        subtitle={t('howItWorks.itemsSubtitle')}
        emphasizeLast
      />
      {renderSteps(itemSteps)}

      <View style={[styles.ctaCard, { backgroundColor: 'rgba(203, 243, 43, 0.08)' }]}>
        <ThemedText type="h2" style={styles.ctaCenter}>
          {t('howItWorks.ctaTitle')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.ctaCenter}>
          {t('howItWorks.ctaSubtitle')}
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
  left: {
    textAlign: 'left',
  },
  ctaCenter: {
    textAlign: 'center',
  },
  header: {
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  stepsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  stepCard: {
    width: '47%',
    flexGrow: 1,
    minWidth: 150,
    alignItems: 'center',
    gap: Spacing.two + 4,
    padding: Spacing.three,
  },
  stepTitle: {
    textAlign: 'center',
  },
  stepText: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
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
