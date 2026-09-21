/**
 * More — app-style settings/information hub (the "Profile"-style tab):
 * grouped list rows for Learn, Support, Legal plus socials and a
 * compact brand footer. Mirrors the web navbar/footer navigation.
 */
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';

import { Screen } from '@/components/ui/Screen';
import { Footer } from '@/components/ui/Footer';
import { TitleWithAccent } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/constants/brand';
import { Radius, Spacing } from '@/constants/theme';

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
    <View style={styles.group}>
      <ThemedText type="caption" themeColor="textSecondary" style={styles.groupTitle}>
        {title.toUpperCase()}
      </ThemedText>
      <View style={[styles.list, { borderColor: 'rgba(18, 18, 18, 0.06)' }]}>
        {items.map((link, index) => (
          <Pressable
            key={link.href + link.label}
            onPress={() => openLink(link.href)}
            style={({ pressed }) => [
              styles.row,
              index < items.length - 1 ? styles.rowDivider : null,
              pressed && styles.pressed,
            ]}
          >
            <View style={[styles.iconTile, { backgroundColor: 'rgba(203, 243, 43, 0.12)' }]}>
              <Ionicons name={link.icon} size={18} color={theme.accentHover} />
            </View>
            <ThemedText type="cardTitle" style={styles.rowLabel} numberOfLines={1}>
              {link.label}
            </ThemedText>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </Pressable>
        ))}
      </View>
    </View>
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
                { backgroundColor: 'rgba(203, 243, 43, 0.14)' },
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
  group: {
    gap: Spacing.two,
  },
  groupTitle: {
    paddingHorizontal: Spacing.one,
    letterSpacing: 0.8,
  },
  list: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 6,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(18, 18, 18, 0.05)',
  },
  iconTile: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  socialGroup: {
    gap: Spacing.two,
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

