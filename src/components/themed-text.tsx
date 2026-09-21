import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { fontForWeight } from '@/constants/fonts';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';

export type ThemedTextType =
  | 'default'
  | 'title'
  | 'small'
  | 'smallBold'
  | 'subtitle'
  | 'link'
  | 'linkPrimary'
  | 'code'
  | 'hero'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'cardTitle'
  | 'body'
  | 'caption';

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
  themeColor?: ThemeColor;
  writingDirection?: 'rtl' | 'ltr' | 'auto';
};

const typeStyles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 800,
  },
  subtitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 700,
  },
  link: {
    lineHeight: 22,
    fontSize: 14,
    fontWeight: 600,
  },
  linkPrimary: {
    lineHeight: 22,
    fontSize: 14,
    fontWeight: 600,
    color: '#CBF32B',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
  // ─── RAABTA TAG web typography ───
  hero: {
    fontSize: 34,
    lineHeight: 44,
    fontWeight: 900,
  },
  h1: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: 900,
  },
  h2: {
    fontSize: 25,
    lineHeight: 33,
    fontWeight: 800,
  },
  h3: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: 700,
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: 700,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: 400,
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 500,
  },
});

export function ThemedText({ style, type = 'default', themeColor, writingDirection, ...rest }: ThemedTextProps) {
  const theme = useTheme();
  const { isRTL } = useLanguage();
  const typeStyle = typeStyles[type];
  const fontFamily = fontForWeight(typeStyle?.fontWeight as number | undefined);

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'], fontFamily, writingDirection: writingDirection ?? (isRTL ? 'rtl' : 'ltr') },
        typeStyle,
        style,
      ]}
      {...rest}
    />
  );
}

