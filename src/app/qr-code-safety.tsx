/**
 * QR Code Safety — clone of the parking-alert web QRCodeSafetyPage.
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
import { SectionHeading, TitleWithAccent } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useIsCompactScreen } from '@/hooks/use-breakpoint';
import { QR_CODE_SAFETY } from '@/content/guides';
import { Radius, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function QrCodeSafetyScreen() {
  const router = useRouter();
  const theme = useTheme();
  const isCompact = useIsCompactScreen();
  const { dynamicPoints, features, bestPractices } = QR_CODE_SAFETY;

  return (
    <Screen showBack withFooter title="QR Code Safety">
      <PageHeader
        icon="shield-checkmark-outline"
        title="QR Code Safety & Privacy"
        accentLastWord
        subtitle="Learn how RAABTA TAG keeps your data secure and your identity private. Our commitment to safety means you can use QR codes with complete peace of mind."
      />

      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <View style={[styles.infoIcon, { backgroundColor: 'rgba(203, 243, 43, 0.2)' }]}>
            <Ionicons name="qr-code-outline" size={18} color={theme.highlight} />
          </View>
          <ThemedText type="h2">Dynamic QR Code Technology</ThemedText>
        </View>
        <ThemedText type="body" themeColor="textSecondary">
          Unlike static QR codes that permanently display fixed information, RAABTA TAG uses
          dynamic QR codes that link to a secure profile page. This means:
        </ThemedText>
        <View style={styles.points}>
          {dynamicPoints.map((point) => (
            <CheckItem key={point.lead} boldLead={point.lead}>
              {point.text}
            </CheckItem>
          ))}
        </View>
      </Card>

      <SectionHeading title="Privacy Features" emphasizeLast />

      <View style={styles.featuresGrid}>
        {features.map((feature) => (
          <View
            key={feature.title}
            style={[
              styles.featureCard,
              isCompact ? styles.featureCardCompact : null,
              { borderColor: 'rgba(18, 18, 18, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.8)' },
            ]}
          >
            <View style={[styles.featureIcon, { backgroundColor: 'rgba(203, 243, 43, 0.1)' }]}>
              <Ionicons name={feature.icon as IconName} size={18} color={theme.accent} />
            </View>
            <View style={isCompact ? styles.featureTextWrap : null}>
              <ThemedText type="cardTitle">{feature.title}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.featureText}>
                {feature.text}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      <SectionHeading title="Safety Best Practices" emphasizeLast />

      <View style={styles.practicesStack}>
        {bestPractices.map((practice, index) => (
          <View
            key={practice.title}
            style={[
              styles.practiceCard,
              { borderColor: 'rgba(18, 18, 18, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.6)' },
            ]}
          >
            <ThemedText type="cardTitle">
              {String(index + 1)}. {practice.title}
            </ThemedText>
            <ThemedText type="body" themeColor="textSecondary">
              {practice.text}
            </ThemedText>
          </View>
        ))}
      </View>

      <Card style={styles.infoCard}>
        <TitleWithAccent text="Our Commitment to Your Safety" type="h2" />
        <ThemedText type="body" themeColor="textSecondary">
          At RAABTA TAG, we believe that privacy is not a feature — it's a right. Every decision
          we make about our platform is guided by our commitment to protecting your personal
          information.
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          We never sell your data. We never share your personal information with third parties.
          Your phone number, email, and vehicle details remain confidential and are only used to
          facilitate communication through our platform.
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          If you have any questions about your privacy or data security, please don't hesitate
          to contact our support team. We're here to help.
        </ThemedText>
      </Card>

      <View style={[styles.ctaCard, { backgroundColor: 'rgba(203, 243, 43, 0.08)' }]}>
        <ThemedText type="h2" style={styles.center}>
          Stay Safe with RAABTA TAG
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          Start using privacy-first QR codes for your vehicle and personal items today.
        </ThemedText>
        <View style={styles.ctaRow}>
          <Button variant="primary" onPress={() => router.push('/create')}>
            Register Your Vehicle
          </Button>
          <Button variant="outline" onPress={() => router.push('/register-item')}>
            Register Personal Item
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
  points: {
    gap: Spacing.two + 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  featureCard: {
    width: '47%',
    flexGrow: 1,
    minWidth: 150,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.three,
    gap: Spacing.two + 2,
  },
  // Phone: single-column horizontal rows.
  featureCardCompact: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 2,
    padding: Spacing.two + 4,
    borderRadius: Radius.lg,
  },
  featureTextWrap: {
    flex: 1,
    gap: Spacing.one,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 13,
    lineHeight: 20,
  },
  practicesStack: {
    gap: Spacing.three,
  },
  practiceCard: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.three,
    gap: Spacing.two,
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
