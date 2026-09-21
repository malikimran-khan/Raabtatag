/**
 * InfoRow — clone of the parking-alert web InfoRow components:
 * - DetailRow: icon tile + label/value (vehicle/item/user detail pages)
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
      <View style={[styles.detailIcon, { backgroundColor: 'rgba(203, 243, 43, 0.2)' }]}>
        <Ionicons name={icon} size={18} color={theme.highlight} />
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
    padding: 14,
  },
  detailIcon: {
    width: 42,
    height: 42,
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
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Radius.lg,
    padding: 16,
  },
  summaryValue: {
    textAlign: 'right',
    flexShrink: 1,
  },
});
