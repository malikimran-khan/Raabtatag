/**
 * Smart Parking Guide — clone of the parking-alert web SmartParkingGuidePage.
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';

import { Screen } from '@/components/ui/Screen';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckItem } from '@/components/ui/CheckItem';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useIsCompactScreen } from '@/hooks/use-breakpoint';
import { SMART_PARKING_GUIDE } from '@/content/guides';
import { Radius, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function SmartParkingGuideScreen() {
  const router = useRouter();
  const theme = useTheme();
  const isCompact = useIsCompactScreen();
  const { benefits, steps, tips } = SMART_PARKING_GUIDE;

  return (
    <Screen showBack withFooter title="Smart Parking Guide">
      <PageHeader
        icon="book-outline"
        title="Smart Parking Guide with QR Codes"
        accentLastWord
        subtitle="Your complete guide to smart parking using RAABTA TAG QR codes. Learn how to protect your privacy, communicate with other drivers, and never worry about blocked parking again."
      />

      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <View style={[styles.infoIcon, { backgroundColor: 'rgba(203, 243, 43, 0.2)' }]}>
            <Ionicons name="bulb-outline" size={18} color={theme.highlight} />
          </View>
          <ThemedText type="h2">What is Smart Parking?</ThemedText>
        </View>
        <ThemedText type="body" themeColor="textSecondary">
          Smart parking uses technology to make parking easier, more convenient, and more
          secure. RAABTA TAG takes this concept further by using dynamic QR codes that allow
          vehicle owners to be contacted without sharing their personal phone number.
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          Instead of leaving a handwritten note with your phone number on the dashboard, you
          simply display your RAABTA TAG QR code. When someone needs to reach you about your
          parked vehicle, they scan the code and can send you a message or call you through
          our secure platform.
        </ThemedText>
      </Card>

      <SectionHeading title="Benefits of Smart Parking" emphasizeLast />

      <View style={styles.benefitsGrid}>
        {benefits.map((benefit) => (
          <View
            key={benefit.title}
            style={[
              styles.benefitCard,
              isCompact ? styles.benefitCardCompact : null,
              { borderColor: 'rgba(18, 18, 18, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.8)' },
            ]}
          >
            <View style={[styles.benefitIcon, { backgroundColor: 'rgba(203, 243, 43, 0.1)' }]}>
              <Ionicons name={benefit.icon as IconName} size={18} color={theme.accent} />
            </View>
            <View style={isCompact ? styles.benefitTextWrap : null}>
              <ThemedText type="cardTitle">{benefit.title}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.benefitText}>
                {benefit.text}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      <Card style={styles.infoCard}>
        <ThemedText type="h2">Getting Started</ThemedText>
        <View style={styles.steps}>
          {steps.map((step, index) => (
            <View key={step.title} style={styles.step}>
              <ThemedText
                type="smallBold"
                style={[styles.stepNumber, { color: theme.accentHover }]}
              >
                {String(index + 1).padStart(2, '0')}
              </ThemedText>
              <View style={styles.stepBody}>
                <ThemedText type="cardTitle">{step.title}</ThemedText>
                <ThemedText type="body" themeColor="textSecondary">
                  {step.text}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </Card>

      <SectionHeading title="Smart Parking Tips" emphasizeLast />

      <Card style={styles.infoCard}>
        <View style={styles.tips}>
          {tips.map((tip) => (
            <CheckItem key={tip}>{tip}</CheckItem>
          ))}
        </View>
      </Card>

      <View style={[styles.ctaCard, { backgroundColor: 'rgba(203, 243, 43, 0.08)' }]}>
        <ThemedText type="h2" style={styles.center}>
          Start Smart Parking Today
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          Join thousands of users who are already enjoying privacy-friendly QR code parking
          solutions.
        </ThemedText>
        <View style={styles.ctaRow}>
          <Button variant="primary" onPress={() => router.push('/create')}>
            Register Your Vehicle
          </Button>
          <Button variant="outline" onPress={() => router.push('/how-it-works')}>
            Learn More
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
  infoCard: {
    gap: Spacing.three,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 4,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  benefitCard: {
    width: '47%',
    flexGrow: 1,
    minWidth: 150,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.three,
    gap: Spacing.two + 2,
  },
  // Phone: single-column horizontal rows.
  benefitCardCompact: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 2,
    padding: Spacing.two + 4,
    borderRadius: Radius.lg,
  },
  benefitTextWrap: {
    flex: 1,
    gap: Spacing.one,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    fontSize: 13,
    lineHeight: 20,
  },
  steps: {
    gap: Spacing.three,
  },
  step: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  stepNumber: {
    fontSize: 16,
    lineHeight: 24,
  },
  stepBody: {
    flex: 1,
    gap: 4,
  },
  tips: {
    gap: Spacing.two + 4,
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
