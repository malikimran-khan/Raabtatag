/**
 * Cta — clone of the web CtaSection (gradient card with dual register CTAs).
 */
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/themed-text';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

export function Cta() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <View style={styles.section}>
      <LinearGradient
        colors={['rgba(203, 243, 43, 0.10)', '#FFFFFF', 'rgba(18, 18, 18, 0.06)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <ThemedText type="h2" style={styles.heading}>
          {t('cta.heading')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.subheading}>
          {t('cta.subheading')}
        </ThemedText>
        <View style={styles.ctaRow}>
          <Button
            variant="primary"
            icon="arrow-forward"
            iconPosition="right"
            onPress={() => router.push('/create')}
          >
            {t('cta.registerVehicle')}
          </Button>
          <Button
            variant="secondary"
            icon="arrow-forward"
            iconPosition="right"
            onPress={() => router.push('/register-item')}
          >
            {t('cta.registerItem')}
          </Button>
        </View>
        <ThemedText type="small" themeColor="textSecondary" style={styles.footerText}>
          {t('cta.footerText')}
        </ThemedText>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: Spacing.three,
  },
  card: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
    padding: Spacing.three,
    alignItems: 'center',
    gap: Spacing.two + 4,
  },
  heading: {
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 30,
  },
  subheading: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
  },
  ctaRow: {
    alignSelf: 'stretch',
    gap: Spacing.two + 2,
  },
  footerText: {
    textAlign: 'center',
  },
});

export default Cta;
