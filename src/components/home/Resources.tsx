/**
 * Resources — clone of the web ResourcesSection (guide cards with CTA links).
 */
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';

import { SectionHeading, TitleWithAccent } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const resources: Array<{
  icon: IconName;
  title: string;
  description: string;
  link: string;
  cta: string;
}> = [
  {
    icon: 'book-outline',
    title: 'Smart Parking Guide',
    description:
      'Learn everything about smart parking with QR codes. From setup tips to best practices, discover how RAABTA TAG makes parking communication effortless and private.',
    link: '/smart-parking-guide',
    cta: 'Read the Guide',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'QR Code Safety & Privacy',
    description:
      'Understand how dynamic QR technology protects your data. Learn about our encryption, anonymous communication, and best practices for staying safe.',
    link: '/qr-code-safety',
    cta: 'Learn About Safety',
  },
];

export function Resources() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={styles.section}>
      <SectionHeading
        title="Learn More About RAABTA TAG"
        subtitle="Explore our detailed guides to get the most out of your RAABTA TAG experience."
      />
      <View style={styles.grid}>
        {resources.map((resource) => (
          <Pressable
            key={resource.link}
            onPress={() => router.push(resource.link as never)}
            style={({ pressed }) => [
              styles.card,
              { borderColor: 'rgba(18, 18, 18, 0.06)', backgroundColor: 'rgba(255, 255, 255, 0.8)' },
              pressed && { borderColor: 'rgba(203, 243, 43, 0.4)', transform: [{ translateY: -2 }] },
            ]}
          >
            <View style={[styles.iconTile, { backgroundColor: 'rgba(203, 243, 43, 0.1)' }]}>
              <Ionicons name={resource.icon} size={22} color={theme.accent} />
            </View>
            <ThemedText type="cardTitle" style={styles.title}>
              {resource.title}
            </ThemedText>
            <ThemedText type="body" themeColor="textSecondary" style={styles.description}>
              {resource.description}
            </ThemedText>
            <View style={styles.cta}>
              <ThemedText
                type="smallBold"
                style={{ color: theme.accentHover }}
              >
                {resource.cta}
              </ThemedText>
              <Ionicons name="arrow-forward" size={14} color={theme.accentHover} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  grid: {
    gap: Spacing.three,
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.three,
    gap: Spacing.two + 2,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
  description: {
    fontSize: 13,
    lineHeight: 20,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.one,
  },
});

export default Resources;
