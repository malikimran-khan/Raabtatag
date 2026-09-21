/**
 * Headings — section headings including the brand "accent last word"
 * pattern. Alignment is configurable for mobile-first left-aligned
 * sections (center is kept as the default for backwards compatibility).
 */
import { StyleSheet, View } from 'react-native';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

/** Splits a title so the last word renders in the accent color. */
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
  align?: 'left' | 'center';
};

export function SectionHeading({
  title,
  subtitle,
  emphasizeLast = false,
  align = 'center',
}: SectionHeadingProps) {
  const alignStyle = align === 'left' ? styles.left : styles.center;

  return (
    <View style={[styles.container, { alignItems: align === 'left' ? 'flex-start' : 'center' }]}>
      {emphasizeLast ? (
        <TitleWithAccent text={title} type="h2" style={alignStyle} />
      ) : (
        <ThemedText type="h2" style={alignStyle}>
          {title}
        </ThemedText>
      )}
      {subtitle ? (
        <ThemedText type="body" themeColor="textSecondary" style={alignStyle}>
          {subtitle}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two + 4,
    marginBottom: Spacing.four,
  },
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
});

export default SectionHeading;

