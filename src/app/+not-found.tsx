/**
 * 404 — mobile error state with a clear return-home action.
 */
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { ErrorState } from '@/components/ui/StateViews';
import { useLanguage } from '@/context/LanguageContext';
import { Spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <Screen showBack>
      <View style={styles.wrap}>
        <ErrorState
          icon="search-outline"
          title={t('notFound.title')}
          message={t('notFound.description')}
          actionLabel={t('notFound.returnHome')}
          onAction={() => router.replace('/')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: Spacing.six,
  },
});

