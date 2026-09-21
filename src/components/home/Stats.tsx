/**
 * Stats — compact 2×2 stat tiles (tonal, mobile dashboard style).
 */
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

export function Stats() {
  const theme = useTheme();
  const { t } = useLanguage();

  const stats = [
    { value: '10K+', label: t('stats.activeUsers') },
    { value: '50K+', label: t('stats.vehicleQr') },
    { value: '15K+', label: t('stats.itemQr') },
    { value: '99.9%', label: t('stats.uptime') },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((stat) => (
        <View
          key={stat.label}
          style={[
            styles.card,
            { backgroundColor: theme.surface },
          ]}
        >
          <ThemedText type="h2" style={styles.value}>
            {stat.value}
          </ThemedText>
          <ThemedText type="caption" themeColor="textSecondary" style={styles.label}>
            {stat.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    justifyContent: 'center',
  },
  card: {
    width: '48.5%',
    flexGrow: 1,
    alignItems: 'center',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    gap: 2,
  },
  value: {
    fontSize: 21,
    lineHeight: 28,
    textAlign: 'center',
    color: '#B7DE19',
  },
  label: {
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
  },
});

export default Stats;

