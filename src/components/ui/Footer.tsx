/**
 * Footer — compact mobile app footer (dark surface, brand + socials,
 * quick links, legal). Rendered inside the scroll content on the More hub.
 */
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { BRAND } from '@/constants/brand';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();

  const open = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto')) {
      if (Platform.OS !== 'web') Linking.openURL(href).catch(() => undefined);
      return;
    }
    if (href === '/') {
      router.replace('/');
    } else {
      router.push(href as never);
    }
  };

  const quickLinks: Array<{ label: string; href: string }> = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.howItWorks'), href: '/how-it-works' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Smart Parking Guide', href: '/smart-parking-guide' },
    { label: 'QR Code Safety', href: '/qr-code-safety' },
    { label: t('nav.contact'), href: '/contact' },
    { label: t('footer.terms'), href: `mailto:${BRAND.email}?subject=Terms%20of%20Service` },
  ];

  const socials = [
    { icon: 'logo-instagram' as const, href: BRAND.socials.instagram, label: 'Instagram' },
    { icon: 'logo-linkedin' as const, href: BRAND.socials.linkedin, label: 'LinkedIn' },
    { icon: 'logo-facebook' as const, href: BRAND.socials.facebook, label: 'Facebook' },
  ];

  return (
    <View style={[styles.footer, { backgroundColor: theme.highlight }]}>
      <View style={styles.footerInner}>
        <View style={styles.brandRow}>
          <ThemedText style={[styles.brand, { color: theme.white }]}>
            RAABTA{' '}
            <ThemedText style={[styles.brand, { color: theme.accent }]}>TAG</ThemedText>
          </ThemedText>
          <View style={styles.socialRow}>
            {socials.map(({ icon, href, label }) => (
              <Pressable
                key={label}
                onPress={() => {
                  if (Platform.OS !== 'web') Linking.openURL(href).catch(() => undefined);
                }}
                accessibilityLabel={label}
                style={({ pressed }) => [
                  styles.socialButton,
                  { backgroundColor: 'rgba(255,255,255,0.1)' },
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons name={icon} size={16} color="rgba(255,255,255,0.8)" />
              </Pressable>
            ))}
          </View>
        </View>

        <ThemedText type="caption" style={styles.description}>
          {t('footer.description')}
        </ThemedText>

        <View style={styles.linksWrap}>
          {quickLinks.map((link) => (
            <Pressable
              key={link.href + link.label}
              onPress={() => open(link.href)}
              style={({ pressed }) => [styles.link, pressed && styles.pressed]}
            >
              <ThemedText type="caption" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {link.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <View style={[styles.divider, { borderTopColor: 'rgba(255,255,255,0.12)' }]} />
        <ThemedText type="caption" style={[styles.copyright, { color: 'rgba(255,255,255,0.55)' }]}>
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: Spacing.four,
    paddingVertical: Spacing.three + Spacing.two,
  },
  footerInner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    gap: Spacing.two + 2,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  brand: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 900,
  },
  description: {
    color: 'rgba(255,255,255,0.6)',
  },
  linksWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one + Spacing.two,
    marginTop: Spacing.one,
  },
  link: {
    paddingVertical: Spacing.one,
  },
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.one + 2,
  },
  socialButton: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    borderTopWidth: 1,
    paddingTop: Spacing.two + 2,
  },
  copyright: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});

export default Footer;
