/**
 * Testimonials — clone of the web TestimonialsSection (3 cards with star ratings).
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

export function Testimonials() {
  const theme = useTheme();
  const { t } = useLanguage();

  const testimonials = [1, 2, 3].map((index) => ({
    quote: t(`testimonials.quote${index}`),
    author: t(`testimonials.author${index}`),
    role: t(`testimonials.role${index}`),
  }));

  return (
    <View style={styles.section}>
      <SectionHeading
        title={t('testimonials.heading')}
        subtitle={t('testimonials.subheading')}
      />
      <View style={styles.grid}>
        {testimonials.map((testimonial) => (
          <View
            key={testimonial.author}
            style={[
              styles.card,
              { borderColor: 'rgba(18, 18, 18, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.8)' },
            ]}
          >
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={16} color={theme.accent} />
              ))}
            </View>
            <ThemedText
              type="body"
              themeColor="textSecondary"
              style={[styles.quote, { fontStyle: 'italic' }]}
            >
              "{testimonial.quote}"
            </ThemedText>
            <View>
              <ThemedText type="cardTitle" style={styles.author}>
                {testimonial.author}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {testimonial.role}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: Spacing.three,
  },
  grid: {
    gap: Spacing.three,
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.three,
    gap: Spacing.two + 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  quote: {
    fontSize: 14,
    lineHeight: 21,
  },
  author: {
    marginBottom: 2,
  },
});

export default Testimonials;
