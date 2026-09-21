/**
 * Privacy — policy sections as numbered mobile sections.
 */
import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

export default function PrivacyScreen() {
  const { t } = useLanguage();
  const theme = useTheme();

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

        <View style={[styles.sectionDivider, { backgroundColor: theme.border }]} />

        <View style={styles.sections}>
          {sections.map((section, index) => (
            <View key={section.title} style={styles.section}>
              <View style={[styles.sectionBadge, { backgroundColor: theme.accentSoft }]}>
                <ThemedText type="smallBold" style={{ color: theme.accentHover }}>
                  {String(index + 1).padStart(2, '0')}
                </ThemedText>
              </View>
              <View style={styles.sectionBody}>
                <ThemedText type="h3">{section.title}</ThemedText>
                <ThemedText type="body" themeColor="textSecondary">
                  {section.text}
                </ThemedText>
              </View>
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
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
  sections: {
    gap: Spacing.four,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  sectionBadge: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionBody: {
    flex: 1,
    gap: Spacing.two,
  },
});

