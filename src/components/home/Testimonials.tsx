/**
 * Testimonials — stacked quote cards with star ratings and an author
 * avatar (initials), mobile list style.
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

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
      <View style={styles.stack}>
        {testimonials.map((testimonial) => (
          <View
            key={testimonial.author}
            style={[
              styles.card,
              { borderColor: theme.border, backgroundColor: theme.white },
            ]}
          >
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={14} color={theme.accentHover} />
              ))}
            </View>
            <ThemedText
              type="body"
              themeColor="textSecondary"
              style={[styles.quote, { fontStyle: 'italic' }]}
            >
              "{testimonial.quote}"
            </ThemedText>
            <View style={styles.authorRow}>
              <View style={[styles.avatar, { backgroundColor: theme.accentSoft }]}>
                <ThemedText type="smallBold" style={{ color: theme.accentHover }}>
                  {initialsOf(testimonial.author) || '·'}
                </ThemedText>
              </View>
              <View style={styles.authorText}>
                <ThemedText type="cardTitle" style={styles.authorName}>
                  {testimonial.author}
                </ThemedText>
                <ThemedText type="caption" themeColor="textSecondary">
                  {testimonial.role}
                </ThemedText>
              </View>
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
  stack: {
    gap: Spacing.three,
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: Spacing.two + 2,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  quote: {
    fontSize: 14,
    lineHeight: 21,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 4,
    marginTop: Spacing.one,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorText: {
    gap: 1,
  },
  authorName: {
    fontSize: 15,
    lineHeight: 21,
  },
});

export default Testimonials;

