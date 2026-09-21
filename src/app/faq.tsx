/**
 * FAQ — clone of the parking-alert web FAQPage (8 Q&A cards + contact CTA).
 */
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

export default function FaqScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

  const faqs = [1, 2, 3, 4, 5, 6, 7, 8].map((index) => ({
    question: t(`faq.q${index}`),
    answer: t(`faq.a${index}`),
  }));

  return (
    <Screen showBack withFooter title={t('faq.title')}>
      <PageHeader
        icon="help-circle-outline"
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
      />

      <View style={styles.stack}>
        {faqs.map((faq) => (
          <View
            key={faq.question}
            style={[
              styles.card,
              { borderColor: 'rgba(18, 18, 18, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.85)' },
            ]}
          >
            <ThemedText type="h3" style={styles.question}>
              {faq.question}
            </ThemedText>
            <ThemedText type="body" themeColor="textSecondary">
              {faq.answer}
            </ThemedText>
          </View>
        ))}
      </View>

      <View style={[styles.ctaCard, { backgroundColor: 'rgba(203, 243, 43, 0.08)' }]}>
        <ThemedText type="h2" style={styles.center}>
          Still have questions?
        </ThemedText>
        <Button variant="primary" onPress={() => router.push('/contact')}>
          {t('nav.contact')}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  stack: {
    gap: Spacing.three,
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.three,
    gap: Spacing.two + 2,
  },
  question: {},
  ctaCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
  },
});
