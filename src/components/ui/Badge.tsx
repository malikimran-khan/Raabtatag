/**
 * Badge — compact pill (icon + label) used for status tags like
 * "Verified Vehicle", "Registered Item", form status, etc.
 */
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type BadgeProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  label: string;
  /** accent = lime tint (brand), ink = dark tint, danger = red tint. */
  tone?: 'accent' | 'ink' | 'danger';
  style?: StyleProp<ViewStyle>;
};

export function Badge({ icon, label, tone = 'accent', style }: BadgeProps) {
  const theme = useTheme();

  const bg =
    tone === 'ink'
      ? 'rgba(18, 18, 18, 0.06)'
      : tone === 'danger'
        ? 'rgba(239, 68, 68, 0.1)'
        : theme.accentSoft;
  const fg = tone === 'danger' ? theme.danger : theme.highlight;

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      {icon ? <Ionicons name={icon} size={13} color={fg} /> : null}
      <ThemedText type="caption" style={{ color: fg }}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default Badge;
