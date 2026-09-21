/**
 * IconButton — circular, accessible icon-only button.
 * Standard mobile header / list action control with a comfortable
 * touch target (44pt) and pressed feedback.
 */
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/use-theme';
import { Radius } from '@/constants/theme';

type IconButtonProps = {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  onPress?: () => void;
  /** plain = icon only, tinted = soft accent tile, filled = dark tile. */
  variant?: 'plain' | 'tinted' | 'filled';
  disabled?: boolean;
  accessibilityLabel?: string;
  hitSlop?: number;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  name,
  size = 22,
  onPress,
  variant = 'plain',
  disabled = false,
  accessibilityLabel,
  hitSlop = 8,
  style,
}: IconButtonProps) {
  const theme = useTheme();

  const iconColor =
    variant === 'filled' ? theme.white : variant === 'tinted' ? theme.accentHover : theme.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.base,
        variant === 'tinted' && { backgroundColor: theme.accentSoft },
        variant === 'filled' && { backgroundColor: theme.highlight },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Ionicons name={name} size={size} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.94 }],
  },
  disabled: {
    opacity: 0.4,
  },
});

export default IconButton;
