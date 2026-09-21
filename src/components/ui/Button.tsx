/**
 * Button — clone of the parking-alert web Button (primary/secondary/outline/ghost,
 * sm/md/lg, loading state, accent palette, rounded-xl).
 */
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Shadow, Spacing, TouchTarget } from '@/constants/theme';
import { fontForWeight } from '@/constants/fonts';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export function Button({
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  children,
}: ButtonProps) {
  const theme = useTheme();

  const sizePadding =
    size === 'sm'
      ? { minHeight: 40, paddingVertical: 10, paddingHorizontal: Spacing.three, gap: 6 }
      : size === 'lg'
        ? { minHeight: 54, paddingVertical: 15, paddingHorizontal: Spacing.five, gap: 8 }
        : { minHeight: TouchTarget.comfortable, paddingVertical: 13, paddingHorizontal: Spacing.four, gap: 8 };
  const fontSize = size === 'sm' ? 14 : size === 'lg' ? 17 : 15;

  const backgroundColor =
    variant === 'primary'
      ? theme.accent
      : variant === 'secondary'
        ? theme.highlight
        : variant === 'outline'
          ? theme.white
          : 'transparent';
  const textColor =
    variant === 'secondary'
      ? theme.white
      : variant === 'ghost'
        ? theme.textSecondary
        : theme.highlight;

  const shadow =
    variant === 'primary'
      ? Shadow.accent
      : variant === 'secondary'
        ? Shadow.ink
        : undefined;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      style={({ pressed }) => [
        styles.base,
        sizePadding,
        {
          backgroundColor,
          opacity: disabled ? 0.45 : isLoading ? 0.8 : 1,
        },
        variant === 'outline' && { borderWidth: 1, borderColor: theme.border },
        shadow,
        fullWidth && { alignSelf: 'stretch', width: '100%' },
        pressed && !disabled && !isLoading && { transform: [{ scale: 0.98 }], opacity: 0.92 },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : null}
      {icon && !isLoading && iconPosition === 'left' ? (
        <Ionicons name={icon} size={fontSize + 1} color={textColor} />
      ) : null}
      {children ? (
        typeof children === 'string' ? (
          <ThemedText
            style={{
              color: textColor,
              fontSize,
              fontFamily: fontForWeight(600),
              fontWeight: 600,
            }}
          >
            {children}
          </ThemedText>
        ) : (
          children
        )
      ) : null}
      {icon && !isLoading && iconPosition === 'right' ? (
        <Ionicons name={icon} size={fontSize + 1} color={textColor} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
  },
});

export default Button;
