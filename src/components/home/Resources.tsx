/**
 * Resources — guide entry cards (mobile rows with icon, title,
 * description and a chevron action).
 */
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';

import { SectionHeading } from '@/components/ui/SectionHeading';
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
      <View style={styles.stack}>
        {resources.map((resource) => (
          <Pressable
            key={resource.link}
            onPress={() => router.push(resource.link as never)}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.card,
              { borderColor: theme.border, backgroundColor: theme.white },
              pressed && styles.pressed,
            ]}
          >
            <View style={[styles.iconTile, { backgroundColor: theme.accentSoft }]}>
              <Ionicons name={resource.icon} size={21} color={theme.accentHover} />
            </View>
            <View style={styles.textStack}>
              <ThemedText type="cardTitle">{resource.title}</ThemedText>
              <ThemedText type="body" themeColor="textSecondary" style={styles.description}>
                {resource.description}
              </ThemedText>
              <View style={styles.cta}>
                <ThemedText type="smallBold" style={{ color: theme.accentHover }}>
                  {resource.cta}
                </ThemedText>
                <Ionicons name="arrow-forward" size={14} color={theme.accentHover} />
              </View>
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
  stack: {
    gap: Spacing.three,
  },
  card: {
    flexDirection: 'row',
    gap: Spacing.three,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStack: {
    flex: 1,
    gap: Spacing.one,
  },
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
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});

export default Resources;

