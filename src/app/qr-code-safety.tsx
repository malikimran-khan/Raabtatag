/**
 * QR Code Safety — mobile guide layout: page header, dynamic QR card,
 * privacy feature rows, numbered best practices, commitment card, CTA.
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
import { QR_CODE_SAFETY } from '@/content/guides';
import { Radius, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function QrCodeSafetyScreen() {
  const router = useRouter();
  const theme = useTheme();
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
          <View style={[styles.infoIcon, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name="qr-code-outline" size={18} color={theme.accentHover} />
          </View>
          <ThemedText type="h3">Dynamic QR Code Technology</ThemedText>
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

      <SectionHeading title="Privacy Features" align="left" />

      <View style={styles.featureStack}>
        {features.map((feature) => (
          <View
            key={feature.title}
            style={[styles.featureCard, { borderColor: theme.border, backgroundColor: theme.white }]}
          >
            <View style={[styles.featureIcon, { backgroundColor: theme.accentSoft }]}>
              <Ionicons name={feature.icon as IconName} size={18} color={theme.accentHover} />
            </View>
            <View style={styles.featureTextWrap}>
              <ThemedText type="cardTitle">{feature.title}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.featureText}>
                {feature.text}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      <SectionHeading title="Safety Best Practices" align="left" />

      <View style={styles.practicesStack}>
        {bestPractices.map((practice, index) => (
          <View
            key={practice.title}
            style={[styles.practiceCard, { borderColor: theme.border, backgroundColor: theme.white }]}
          >
            <View style={[styles.practiceBadge, { backgroundColor: theme.accentSoft }]}>
              <ThemedText type="smallBold" style={{ color: theme.accentHover }}>
                {String(index + 1).padStart(2, '0')}
              </ThemedText>
            </View>
            <View style={styles.practiceTextWrap}>
              <ThemedText type="cardTitle">{practice.title}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.featureText}>
                {practice.text}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>

      <Card style={styles.infoCard}>
        <ThemedText type="h3">Our Commitment to Your Safety</ThemedText>
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

      <View style={[styles.ctaCard, { backgroundColor: theme.accentSoft }]}>
        <ThemedText type="h3" style={styles.center}>
          Stay Safe with RAABTA TAG
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          Start using privacy-first QR codes for your vehicle and personal items today.
        </ThemedText>
        <View style={styles.ctaRow}>
          <Button fullWidth onPress={() => router.push('/create')}>
            Register Your Vehicle
          </Button>
          <Button variant="outline" fullWidth onPress={() => router.push('/register-item')}>
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
  featureStack: {
    gap: Spacing.two,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextWrap: {
    flex: 1,
    gap: Spacing.one,
  },
  featureText: {
    fontSize: 13,
    lineHeight: 20,
  },
  practicesStack: {
    gap: Spacing.two,
  },
  practiceCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  practiceBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceTextWrap: {
    flex: 1,
    gap: Spacing.one,
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

