/**
 * More — settings/information hub tab: grouped list rows for Learn,
 * Support, Legal plus socials and a compact brand footer.
 */
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';

import { Screen } from '@/components/ui/Screen';
import { Footer } from '@/components/ui/Footer';
import { ListGroup, ListRow } from '@/components/ui/ListGroup';
import { TitleWithAccent } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/constants/brand';
import { Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

type LinkItem = { icon: IconName; label: string; href: string };

export default function MoreScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

  const learn: LinkItem[] = [
    { icon: 'information-circle-outline', label: t('nav.about'), href: '/about' },
    { icon: 'refresh-circle-outline', label: t('nav.howItWorks'), href: '/how-it-works' },
    { icon: 'book-outline', label: 'Smart Parking Guide', href: '/smart-parking-guide' },
    { icon: 'shield-checkmark-outline', label: 'QR Code Safety & Privacy', href: '/qr-code-safety' },
  ];

  const support: LinkItem[] = [
    { icon: 'help-circle-outline', label: 'FAQ', href: '/faq' },
    { icon: 'mail-outline', label: t('nav.contact'), href: '/contact' },
  ];

  const legal: LinkItem[] = [
    { icon: 'lock-closed-outline', label: t('footer.privacyPolicy'), href: '/privacy' },
    {
      icon: 'document-text-outline',
      label: t('footer.terms'),
      href: `mailto:${BRAND.email}?subject=Terms%20of%20Service`,
    },
  ];

  const socials = [
    { icon: 'logo-instagram' as const, href: BRAND.socials.instagram, label: 'Instagram' },
    { icon: 'logo-linkedin' as const, href: BRAND.socials.linkedin, label: 'LinkedIn' },
    { icon: 'logo-facebook' as const, href: BRAND.socials.facebook, label: 'Facebook' },
  ];

  const openLink = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto')) {
      if (Platform.OS !== 'web') Linking.openURL(href).catch(() => undefined);
      return;
    }
    router.push(href as never);
  };

  const openSocial = (href: string) => {
    if (Platform.OS !== 'web') Linking.openURL(href).catch(() => undefined);
  };

  const renderGroup = (title: string, items: LinkItem[]) => (
    <ListGroup label={title}>
      {items.map((link) => (
        <ListRow
          key={link.href + link.label}
          icon={link.icon}
          label={link.label}
          onPress={() => openLink(link.href)}
        />
      ))}
    </ListGroup>
  );

  return (
    <Screen withFooter>
      <View style={styles.intro}>
        <TitleWithAccent text="Explore RAABTA TAG" type="h2" style={styles.left} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.left}>
          Guides, answers and ways to get in touch.
        </ThemedText>
      </View>

      {renderGroup('Learn', learn)}
      {renderGroup('Support', support)}
      {renderGroup(t('footer.legal'), legal)}

      <View style={styles.socialGroup}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.groupTitle}>
          {t('nav.followUs').toUpperCase()}
        </ThemedText>
        <View style={styles.socialRow}>
          {socials.map(({ icon, href, label }) => (
            <Pressable
              key={label}
              onPress={() => openSocial(href)}
              accessibilityLabel={label}
              style={({ pressed }) => [
                styles.socialButton,
                { backgroundColor: theme.accentSoft },
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name={icon} size={20} color={theme.highlight} />
            </Pressable>
          ))}
        </View>
      </View>

      <Footer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: {
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  left: {
    textAlign: 'left',
  },
  socialGroup: {
    gap: Spacing.two,
  },
  groupTitle: {
    paddingHorizontal: Spacing.one,
    letterSpacing: 0.8,
  },
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  socialButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});

