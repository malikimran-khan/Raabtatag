/**
 * ListGroup — iOS-style inset grouped list: a rounded container of rows
 * with icon tiles, optional dividers and chevrons. Used for secondary
 * navigation, contact channels and detail information.
 */
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

type IconName = keyof typeof Ionicons.glyphMap;

type ListRowProps = {
  icon?: IconName;
  iconTone?: 'accent' | 'ink';
  label: string;
  description?: string;
  /** Right-aligned supporting text (e.g. a value). */
  value?: string;
  onPress?: () => void;
  /** Renders a chevron by default; set false for static rows. */
  showChevron?: boolean;
  disabled?: boolean;
};

export function ListRow({
  icon,
  iconTone = 'accent',
  label,
  description,
  value,
  onPress,
  showChevron = true,
  disabled = false,
}: ListRowProps) {
  const theme = useTheme();
  const { isRTL } = useLanguage();

  const content = (
    <>
      {icon ? (
        <View style={[styles.iconTile, iconTone === 'accent' ? { backgroundColor: theme.accentSoft } : { backgroundColor: theme.surface }]}>
          <Ionicons name={icon} size={18} color={iconTone === 'accent' ? theme.accentHover : theme.text} />
        </View>
      ) : null}
      <View style={styles.textStack}>
        <ThemedText type="cardTitle" style={styles.label} numberOfLines={1}>
          {label}
        </ThemedText>
        {description ? (
          <ThemedText type="small" themeColor="textSecondary" style={styles.description} numberOfLines={2}>
            {description}
          </ThemedText>
        ) : null}
      </View>
      {value ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.value} numberOfLines={1}>
          {value}
        </ThemedText>
      ) : null}
      {showChevron && onPress ? (
        <Ionicons name={isRTL ? 'chevron-back' : 'chevron-forward'} size={16} color={theme.textSecondary} />
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        style={({ pressed }) => [styles.row, pressed && !disabled && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.row}>{content}</View>;
}

type ListGroupProps = {
  children: ReactNode;
  /** Optional uppercase group label rendered above the card. */
  label?: string;
  style?: StyleProp<ViewStyle>;
  /** Removes the container border (e.g. on tinted surfaces). */
  padded?: boolean;
};

export function ListGroup({ children, label, style }: ListGroupProps) {
  const theme = useTheme();

  return (
    <View style={styles.group}>
      {label ? (
        <ThemedText type="caption" themeColor="textSecondary" style={styles.groupLabel}>
          {label.toUpperCase()}
        </ThemedText>
      ) : null}
      <View style={[styles.list, { borderColor: theme.border }, style]}>
        {Array.isArray(children)
          ? children.map((child, index) =>
              child && index < (children as ReactNode[]).length - 1 ? (
                <View key={index} style={styles.rowWrap}>
                  {child}
                  <View style={[styles.divider, { borderBottomColor: theme.border }]} />
                </View>
              ) : (
                <View key={index}>{child}</View>
              ),
            )
          : children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: Spacing.two,
  },
  groupLabel: {
    paddingHorizontal: Spacing.one,
    letterSpacing: 0.8,
  },
  list: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    overflow: 'hidden',
  },
  rowWrap: {
    // Divider sits under the row, inset from the icon tile.
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: Spacing.two + 40 + Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    minHeight: 48,
  },
  pressed: {
    backgroundColor: 'rgba(18, 18, 18, 0.04)',
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStack: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  label: {
    fontSize: 15,
    lineHeight: 21,
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
  },
  value: {
    flexShrink: 1,
  },
});
