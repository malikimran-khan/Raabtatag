/**
 * PageHeader — compact, left-aligned mobile page intro
 * (small icon tile in accent tint, title with optional accent last word, subtitle).
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { TitleWithAccent } from '@/components/ui/SectionHeading';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

type PageHeaderProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  /** Renders the last word in the accent color (web gradient-text pattern). */
  accentLastWord?: boolean;
  subtitle?: string;
  subtitleRTL?: boolean;
};

export function PageHeader({
  icon,
  title,
  accentLastWord = false,
  subtitle,
  subtitleRTL = false,
}: PageHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={[styles.iconTile, { backgroundColor: 'rgba(203, 243, 43, 0.12)' }]}>
          <Ionicons name={icon} size={22} color={theme.accentHover} />
        </View>
        <View style={styles.titleStack}>
          {accentLastWord ? (
            <TitleWithAccent text={title} type="h2" style={styles.left} />
          ) : (
            <ThemedText type="h2" style={styles.left}>
              {title}
            </ThemedText>
          )}
          {subtitle ? (
            <ThemedText
              type="small"
              themeColor="textSecondary"
              writingDirection={subtitleRTL ? 'rtl' : 'ltr'}
            >
              {subtitle}
            </ThemedText>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.two,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 4,
  },
  titleStack: {
    flex: 1,
    gap: Spacing.one,
  },
  iconTile: {
    width: 46,
    height: 46,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    textAlign: 'left',
  },
});

export default PageHeader;
