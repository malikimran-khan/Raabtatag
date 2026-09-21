/**
 * 404 — clone of the parking-alert web NotFoundPage.
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <Screen showBack>
      <Card style={styles.card}>
        <View style={[styles.iconTile, { backgroundColor: 'rgba(203, 243, 43, 0.35)' }]}>
          <Ionicons name="search-outline" size={28} color={theme.highlight} />
        </View>
        <ThemedText type="h1" style={styles.center}>
          {t('notFound.title')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          {t('notFound.description')}
        </ThemedText>
        <Button variant="primary" icon="arrow-back" onPress={() => router.replace('/')}>
          {t('notFound.returnHome')}
        </Button>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: Spacing.three,
    marginTop: Spacing.four,
    padding: Spacing.four,
  },
  iconTile: {
    width: 64,
    height: 64,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
  },
});
