/**
 * StatusBanner — clone of the web form status banners
 * (success: accent tint / error: danger tint).
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

type StatusBannerProps = {
  type: 'success' | 'error';
  message: string;
};

export function StatusBanner({ type, message }: StatusBannerProps) {
  const theme = useTheme();
  const isError = type === 'error';

  return (
    <View
      style={[
        styles.banner,
        isError
          ? {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.2)',
            }
          : {
              backgroundColor: 'rgba(203, 243, 43, 0.15)',
              borderColor: 'rgba(203, 243, 43, 0.3)',
            },
      ]}
    >
      <Ionicons
        name={isError ? 'alert-circle-outline' : 'checkmark-circle-outline'}
        size={18}
        color={isError ? theme.danger : theme.highlight}
      />
      <ThemedText
        type="small"
        style={{ color: isError ? theme.danger : theme.highlight, flex: 1 }}
      >
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 4,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.two + 4,
  },
});

export default StatusBanner;
