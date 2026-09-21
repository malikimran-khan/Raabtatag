/**
 * Hero — clone of the parking-alert web HeroSection:
 * status badge with pulsing dot, big headline with accent words,
 * subtitle, 3 CTAs, trust indicators.
 */
import { Animated, StyleSheet, View } from 'react-native';
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
    <View style={[styles.hero, { borderColor: 'rgba(18, 18, 18, 0.06)' }]}>
      <LinearGradient
        colors={['rgba(203, 243, 43, 0.18)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <View style={[styles.badge, { backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: 'rgba(203, 243, 43, 0.2)' }]}>
          <PulsingDot />
          <ThemedText type="caption" themeColor="textSecondary" style={styles.badgeText}>
            {t('hero.badge')}
          </ThemedText>
        </View>

        <ThemedText type="hero" style={styles.headline}>
          {t('hero.headlinePart1')}
          {'\n'}
          {t('hero.headlinePart2')}{' '}
          <ThemedText type="hero" style={{ color: theme.accentHover }}>
            {t('hero.headlinePart3')}
          </ThemedText>{' '}
          <ThemedText type="hero" style={{ color: theme.accent }}>
            {t('hero.headlinePart4')}
          </ThemedText>
        </ThemedText>

        <ThemedText type="body" themeColor="textSecondary" style={styles.subtitle}>
          {t('hero.subtitle')}
        </ThemedText>

        <View style={styles.ctaRow}>
          <Button
            variant="primary"
            icon="person-add-outline"
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
          <Button
            variant="outline"
            icon="qr-code-outline"
            fullWidth
            onPress={() => router.push('/how-it-works')}
          >
            {t('hero.learnMore')}
          </Button>
        </View>

        <View style={styles.trustRow}>
          {trust.map((label, index) => (
            <View key={label} style={styles.trustItem}>
              {index > 0 ? <View style={[styles.divider, { backgroundColor: theme.border }]} /> : null}
              <View style={styles.trustLabel}>
                <Ionicons name="checkmark-circle" size={14} color={theme.accent} />
                <ThemedText type="caption" themeColor="textSecondary" style={styles.trustText}>
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
    borderRadius: Radius.xl,
    overflow: 'hidden',
    shadowColor: '#121212',
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  content: {
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
    gap: Spacing.three,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: 1,
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
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 38,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
  },
  ctaRow: {
    alignSelf: 'stretch',
    gap: Spacing.two + 2,
    marginTop: Spacing.one,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.three,
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
  trustText: {
    fontWeight: 600,
  },
});

export default Hero;
