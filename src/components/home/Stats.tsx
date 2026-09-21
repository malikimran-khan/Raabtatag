/**
 * Stats — clone of the web StatsSection (4 stat cards, 2-col grid on mobile).
 */
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

export function Stats() {
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
        <View key={stat.label} style={styles.card}>
          <ThemedText type="h1" style={styles.value}>
            {stat.value}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
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
    gap: Spacing.two + 2,
    justifyContent: 'center',
  },
  card: {
    width: '47%',
    flexGrow: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: Radius.xl,
    paddingVertical: Spacing.two + 4,
    paddingHorizontal: Spacing.two,
    gap: 2,
  },
  value: {
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
  },
});

export default Stats;
