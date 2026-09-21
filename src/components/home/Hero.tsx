/**
 * Hero — mobile dashboard intro card: status badge with pulsing dot,
 * bold headline with accent words, subtitle, the two primary register
 * CTAs, a "how it works" tertiary link and trust checks.
 */
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

function PulsingDot() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.25, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return <Animated.View style={[styles.pulseDot, { opacity }]} />;
}

export function Hero() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

  const trust = [
    t('hero.privacyFirst'),
    t('hero.instantAlerts'),
    t('hero.freeForever'),
  ];

  return (
    <View style={styles.hero}>
      <LinearGradient
        colors={['rgba(203, 243, 43, 0.2)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <View style={styles.badge}>
          <PulsingDot />
          <ThemedText type="caption" themeColor="textSecondary" style={styles.badgeText}>
            {t('hero.badge')}
          </ThemedText>
        </View>

        <ThemedText type="hero" style={styles.headline}>
          {t('hero.headlinePart1')}{' '}
          <ThemedText type="hero" style={{ color: theme.accentHover }}>
            {t('hero.headlinePart2')}
          </ThemedText>{' '}
          {t('hero.headlinePart3')}{' '}
          <ThemedText type="hero" style={{ color: theme.accent }}>
            {t('hero.headlinePart4')}
          </ThemedText>
        </ThemedText>

        <ThemedText type="body" themeColor="textSecondary" style={styles.subtitle}>
          {t('hero.subtitle')}
        </ThemedText>

        <View style={styles.ctaStack}>
          <Button
            variant="primary"
            icon="car-outline"
            fullWidth
            onPress={() => router.push('/create')}
          >
            {t('hero.registerVehicle')}
          </Button>
          <Button
            variant="secondary"
            icon="pricetag-outline"
            fullWidth
            onPress={() => router.push('/register-item')}
          >
            {t('hero.registerItem')}
          </Button>
        </View>

        <Pressable
          onPress={() => router.push('/how-it-works')}
          accessibilityRole="link"
          style={({ pressed }) => [styles.learnRow, pressed && styles.pressed]}
        >
          <Ionicons name="qr-code-outline" size={18} color={theme.accentHover} />
          <ThemedText type="smallBold" style={styles.learnText}>
            {t('hero.learnMore')}
          </ThemedText>
          <Ionicons name="arrow-forward" size={16} color={theme.accentHover} />
        </Pressable>

        <View style={styles.trustRow}>
          {trust.map((label, index) => (
            <View key={label} style={styles.trustItem}>
              {index > 0 ? <View style={[styles.divider, { backgroundColor: theme.border }]} /> : null}
              <View style={styles.trustLabel}>
                <Ionicons name="checkmark-circle" size={14} color={theme.accentHover} />
                <ThemedText type="caption" themeColor="textSecondary">
                  {label}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.07)',
    borderRadius: Radius.xl,
    overflow: 'hidden',
    shadowColor: '#121212',
    shadowOpacity: 0.05,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
  },
  content: {
    padding: Spacing.three + Spacing.two,
    gap: Spacing.three,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: 'rgba(203, 243, 43, 0.3)',
    backgroundColor: 'rgba(203, 243, 43, 0.08)',
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#121212',
  },
  badgeText: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headline: {
    fontSize: 28,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
  },
  ctaStack: {
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  learnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(18, 18, 18, 0.03)',
  },
  learnText: {
    color: '#B7DE19',
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  divider: {
    width: 1,
    height: 12,
  },
  trustLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default Hero;

