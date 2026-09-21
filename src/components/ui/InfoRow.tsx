/**
 * InfoRow — mobile info rows:
 * - DetailRow: icon tile + label/value (detail screens, grouped look)
 * - SummaryRow: label left / value right (form success screens)
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

type DetailRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
};

export function DetailRow({ icon, label, value }: DetailRowProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.detailRow,
        { backgroundColor: theme.surface },
      ]}
    >
      <View style={[styles.detailIcon, { backgroundColor: theme.accentSoft }]}>
        <Ionicons name={icon} size={17} color={theme.accentHover} />
      </View>
      <View style={styles.detailContent}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.detailLabel}>
          {label}
        </ThemedText>
        <ThemedText type="smallBold" numberOfLines={2}>
          {value || 'N/A'}
        </ThemedText>
      </View>
    </View>
  );
}

type SummaryRowProps = {
  label: string;
  value?: string;
};

export function SummaryRow({ label, value }: SummaryRowProps) {
  const theme = useTheme();
  return (
    <View style={[styles.summaryRow, { backgroundColor: theme.surface }]}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="smallBold" style={styles.summaryValue} numberOfLines={2}>
        {value || 'N/A'}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Radius.md,
    padding: 12,
    minHeight: 60,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  detailLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 11,
    lineHeight: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Radius.md,
    padding: 14,
  },
  summaryValue: {
    textAlign: 'right',
    flexShrink: 1,
  },
});

