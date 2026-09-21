/**
 * Smart Parking Guide — mobile guide layout: page header, intro card,
 * benefit rows, numbered step timeline, tips checklist and CTA.
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
import { SMART_PARKING_GUIDE } from '@/content/guides';
import { Radius, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function SmartParkingGuideScreen() {
  const router = useRouter();
  const theme = useTheme();
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
          <View style={[styles.infoIcon, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name="bulb-outline" size={18} color={theme.accentHover} />
          </View>
          <ThemedText type="h3">What is Smart Parking?</ThemedText>
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

      <SectionHeading title="Benefits of Smart Parking" align="left" />

      <View style={styles.benefitStack}>
        {benefits.map((benefit) => (
          <View
            key={benefit.title}
            style={[styles.benefitCard, { borderColor: theme.border, backgroundColor: theme.white }]}
          >
            <View style={[styles.benefitIcon, { backgroundColor: theme.accentSoft }]}>
              <Ionicons name={benefit.icon as IconName} size={18} color={theme.accentHover} />
            </View>
            <View style={styles.benefitTextWrap}>
              <ThemedText type="cardTitle">{benefit.title}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.benefitText}>
                {benefit.text}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      <Card style={styles.infoCard}>
        <ThemedText type="h3">Getting Started</ThemedText>
        <View style={styles.steps}>
          {steps.map((step, index) => (
            <View key={step.title} style={styles.step}>
              <View style={[styles.stepBadge, { backgroundColor: theme.accentSoft }]}>
                <ThemedText type="smallBold" style={{ color: theme.accentHover }}>
                  {String(index + 1).padStart(2, '0')}
                </ThemedText>
              </View>
              <View style={styles.stepBody}>
                <ThemedText type="cardTitle">{step.title}</ThemedText>
                <ThemedText type="body" themeColor="textSecondary" style={styles.stepText}>
                  {step.text}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </Card>

      <SectionHeading title="Smart Parking Tips" align="left" />

      <Card style={styles.infoCard}>
        <View style={styles.tips}>
          {tips.map((tip) => (
            <CheckItem key={tip}>{tip}</CheckItem>
          ))}
        </View>
      </Card>

      <View style={[styles.ctaCard, { backgroundColor: theme.accentSoft }]}>
        <ThemedText type="h3" style={styles.center}>
          Start Smart Parking Today
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          Join thousands of users who are already enjoying privacy-friendly QR code parking
          solutions.
        </ThemedText>
        <View style={styles.ctaRow}>
          <Button fullWidth onPress={() => router.push('/create')}>
            Register Your Vehicle
          </Button>
          <Button variant="outline" fullWidth onPress={() => router.push('/how-it-works')}>
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
  benefitStack: {
    gap: Spacing.two,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitTextWrap: {
    flex: 1,
    gap: Spacing.one,
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
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  stepBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBody: {
    flex: 1,
    gap: 4,
  },
  stepText: {
    fontSize: 13,
    lineHeight: 20,
  },
  tips: {
    gap: Spacing.two + 4,
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

