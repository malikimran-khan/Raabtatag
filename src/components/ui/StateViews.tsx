/**
 * StateViews — consistent empty / error / success full-state blocks:
 * tinted icon circle + title + message + optional action button.
 */
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

type StateViewProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** danger tints the icon circle red (error states). */
  tone?: 'neutral' | 'danger';
  style?: StyleProp<ViewStyle>;
};

export function StateView({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  tone = 'neutral',
  style,
}: StateViewProps) {
  const theme = useTheme();

  const circleColor =
    tone === 'danger' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(203, 243, 43, 0.16)';
  const iconColor = tone === 'danger' ? 'rgba(239, 68, 68, 0.75)' : theme.accentHover;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconCircle, { backgroundColor: circleColor }]}>
        <Ionicons name={icon} size={30} color={iconColor} />
      </View>
      <ThemedText type="h2" style={styles.center}>
        {title}
      </ThemedText>
      {message ? (
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          {message}
        </ThemedText>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          variant="primary"
          icon={tone === 'danger' ? 'refresh-outline' : 'arrow-forward'}
          onPress={onAction}
          style={styles.action}
        >
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}

/** Full "nothing here" state. */
export function EmptyState(props: Omit<StateViewProps, 'tone'>) {
  return <StateView {...props} tone="neutral" />;
}

/** Full "something failed" state with a red tint. */
export function ErrorState(props: Omit<StateViewProps, 'tone'>) {
  return <StateView {...props} tone="danger" />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.six,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
  },
  action: {
    marginTop: Spacing.two,
  },
});
