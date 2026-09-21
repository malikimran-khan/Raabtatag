/**
 * Input — mobile text field: label + icon + error state with a constant
 * 1.5px border (no layout jump on focus) and a 48pt comfortable height.
 */
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function Input({
  label,
  error,
  required = false,
  icon,
  style,
  ...textInputProps
}: InputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? theme.danger
    : focused
      ? theme.accentHover
      : theme.border;

  return (
    <View style={styles.container}>
      {label ? (
        <ThemedText type="smallBold" style={styles.label}>
          {label}
          {required ? <ThemedText type="smallBold" themeColor="danger"> *</ThemedText> : null}
        </ThemedText>
      ) : null}

      <View
        style={[
          styles.inputRow,
          { backgroundColor: theme.white, borderColor },
          focused && !error && {
            borderColor: theme.accentHover,
            shadowColor: '#CBF32B',
            shadowOpacity: 0.35,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          },
        ]}
      >
        {icon ? (
          <View style={styles.iconWrap}>
            <Ionicons
              name={icon}
              size={18}
              color={focused ? theme.accentHover : theme.textSecondary}
            />
          </View>
        ) : null}
        <TextInput
          style={[styles.input, { color: theme.text }, style]}
          placeholderTextColor="rgba(117, 117, 117, 0.5)"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...textInputProps}
        />
      </View>

      {error ? (
        <ThemedText type="small" themeColor="danger" style={styles.error}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: Spacing.one + 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Radius.md,
    minHeight: 48,
  },
  iconWrap: {
    paddingLeft: Spacing.three,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: Spacing.three,
    fontSize: 15,
  },
  error: {
    marginTop: 6,
  },
});

export default Input;

