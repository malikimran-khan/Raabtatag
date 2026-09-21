/**
 * FAQ — expandable Q&A accordion (native disclosure pattern) +
 * contact CTA.
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { PageHeader } from '@/components/ui/PageHeader';
import { Accordion } from '@/components/ui/Accordion';
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
        {faqs.map((faq, index) => (
          <Accordion key={faq.question} title={faq.question} defaultOpen={index === 0}>
            <ThemedText type="body" themeColor="textSecondary">
              {faq.answer}
            </ThemedText>
          </Accordion>
        ))}
      </View>

      <View style={[styles.ctaCard, { backgroundColor: theme.accentSoft }]}>
        <View style={[styles.ctaIcon, { backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
          <Ionicons name="chatbubbles-outline" size={22} color={theme.accentHover} />
        </View>
        <ThemedText type="h3" style={styles.center}>
          Still have questions?
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          Our team is happy to help you get started with RAABTA TAG.
        </ThemedText>
        <Button fullWidth icon="mail-outline" onPress={() => router.push('/contact')}>
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
    gap: Spacing.two,
  },
  ctaCard: {
    borderRadius: Radius.xl,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two + 2,
  },
  ctaIcon: {
    width: 52,
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
});

