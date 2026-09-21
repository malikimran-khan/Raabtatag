/**
 * Privacy — clone of the parking-alert web PrivacyPage (policy sections).
 */
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/themed-text';
import { useLanguage } from '@/context/LanguageContext';
import { Spacing } from '@/constants/theme';

export default function PrivacyScreen() {
  const { t } = useLanguage();

  const sections = [1, 2, 3, 4].map((index) => ({
    title: t(`privacyPolicy.section${index}Title`),
    text: t(`privacyPolicy.section${index}Text`),
  }));

  return (
    <Screen showBack withFooter title={t('privacyPolicy.title')}>
      <PageHeader
        icon="shield-checkmark-outline"
        title={t('privacyPolicy.title')}
        subtitle={t('privacyPolicy.lastUpdated')}
      />

      <Card style={styles.policyCard}>
        <ThemedText type="body" themeColor="textSecondary">
          {t('privacyPolicy.intro')}
        </ThemedText>

        <View style={styles.sections}>
          {sections.map((section) => (
            <View key={section.title} style={styles.section}>
              <ThemedText type="h3">{section.title}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary">
                {section.text}
              </ThemedText>
            </View>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  policyCard: {
    gap: Spacing.three,
  },
  sections: {
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
});
