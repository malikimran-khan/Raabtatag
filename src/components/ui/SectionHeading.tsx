/**
 * Headings — clones of the web section headings, including the
 * "gradient text" pattern (last word emphasized in accent green).
 */
import { StyleSheet, View } from 'react-native';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

/** Splits a title so the last word renders in the accent color (web `.gradient-text`). */
export function TitleWithAccent({
  text,
  type = 'h1',
  style,
}: {
  text: string;
  type?: 'hero' | 'h1' | 'h2';
  style?: ThemedTextProps['style'];
}) {
  const theme = useTheme();
  const parts = text.trim().split(' ');
  const last = parts.pop() ?? '';
  const rest = parts.join(' ');

  return (
    <ThemedText type={type} style={[styles.center, style]}>
      {rest ? `${rest} ` : ''}
      <ThemedText type={type} style={{ color: theme.accentHover }}>
        {last}
      </ThemedText>
    </ThemedText>
  );
}

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  emphasizeLast?: boolean;
};

export function SectionHeading({ title, subtitle, emphasizeLast = false }: SectionHeadingProps) {
  return (
    <View style={styles.container}>
      {emphasizeLast ? (
        <TitleWithAccent text={title} type="h2" />
      ) : (
        <ThemedText type="h2" style={styles.center}>
          {title}
        </ThemedText>
      )}
      {subtitle ? (
        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          {subtitle}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.two + 4,
    marginBottom: Spacing.four,
  },
  center: {
    textAlign: 'center',
  },
});

export default SectionHeading;
