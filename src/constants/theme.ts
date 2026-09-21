/**
 * RAABTA TAG theme — cloned 1:1 from the parking-alert web app
 * (parking-alert-customer/src/index.css `@theme` tokens).
 *
 * The web app ships a light-only design, so `dark` mirrors `light`
 * to keep the visual identity identical in every color scheme.
 */

import '@/global.css';

import { Platform } from 'react-native';

const palette = {
  primary: '#FFFFFF',
  secondary: '#F7F8F2',
  accent: '#CBF32B',
  accentHover: '#B7DE19',
  accentSoft: 'rgba(203, 243, 43, 0.12)',
  highlight: '#121212',
  highlightHover: '#2A2A2A',
  surface: 'rgba(18, 18, 18, 0.04)',
  surfaceHover: 'rgba(18, 18, 18, 0.07)',
  border: 'rgba(18, 18, 18, 0.1)',
  textPrimary: '#121212',
  textSecondary: '#757575',
  danger: '#EF4444',
} as const;

export const Colors = {
  light: {
    text: palette.textPrimary,
    background: palette.primary,
    backgroundElement: palette.secondary,
    backgroundSelected: palette.surfaceHover,
    textSecondary: palette.textSecondary,
    accent: palette.accent,
    accentHover: palette.accentHover,
    accentSoft: palette.accentSoft,
    highlight: palette.highlight,
    highlightHover: palette.highlightHover,
    surface: palette.surface,
    surfaceHover: palette.surfaceHover,
    border: palette.border,
    danger: palette.danger,
    secondary: palette.secondary,
    white: palette.primary,
  },
  dark: {
    text: palette.textPrimary,
    background: palette.primary,
    backgroundElement: palette.secondary,
    backgroundSelected: palette.surfaceHover,
    textSecondary: palette.textSecondary,
    accent: palette.accent,
    accentHover: palette.accentHover,
    accentSoft: palette.accentSoft,
    highlight: palette.highlight,
    highlightHover: palette.highlightHover,
    surface: palette.surface,
    surfaceHover: palette.surfaceHover,
    border: palette.border,
    danger: palette.danger,
    secondary: palette.secondary,
    white: palette.primary,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/**
 * Tailwind radius equivalents used across the web app
 * (rounded-xl, rounded-2xl, rounded-3xl, rounded-[2.5rem]).
 */
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  hero: 40,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 760;

/**
 * Mobile shadow recipes (iOS shadow* + Android elevation).
 * Use these instead of re-declaring per-component shadows.
 */
export const Shadow = {
  /** Subtle lift for list cards / tiles. */
  card: {
    shadowColor: '#121212',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  /** Stronger lift for modals / sheets / hero cards. */
  cardStrong: {
    shadowColor: '#121212',
    shadowOpacity: 0.12,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 6,
  },
  /** Accent-tinted glow used by primary buttons. */
  accent: {
    shadowColor: '#CBF32B',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  /** Ink shadow used by secondary (dark) buttons. */
  ink: {
    shadowColor: '#121212',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
} as const;

/** Minimum comfortable touch target (Apple HIG / Material). */
export const TouchTarget = {
  min: 44,
  comfortable: 48,
} as const;

