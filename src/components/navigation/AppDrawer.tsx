/**
 * AppDrawer — side menu for secondary navigation.
 * A lightweight, dependency-free drawer: a modal overlay with an
 * animated slide-in panel, backdrop tap to dismiss and Android
 * hardware-back support via Modal.
 *
 * Tab roots open it from the AppHeader menu button; it links to the
 * three tabs (switch) and all secondary screens (push).
 */
import {
  Animated,
  Easing,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/constants/brand';
import { Radius, Spacing } from '@/constants/theme';

const LOGO = require('@/assets/images/raabta-logo.png');

type DrawerContextValue = {
  open: () => void;
  close: () => void;
  visible: boolean;
};

const AppDrawerContext = createContext<DrawerContextValue | null>(null);

export function AppDrawerProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  const value = useMemo(() => ({ open, close, visible }), [open, close, visible]);

  return (
    <AppDrawerContext.Provider value={value}>
      {children}
      <AppDrawerHost />
    </AppDrawerContext.Provider>
  );
}

export function useAppDrawer(): DrawerContextValue {
  const ctx = useContext(AppDrawerContext);
  if (!ctx) {
    throw new Error('useAppDrawer must be used within an AppDrawerProvider');
  }
  return ctx;
}

type DrawerLink = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  href: string;
  /** switch = tab switch (replace), push = stack navigation. */
  mode: 'switch' | 'push';
};

function AppDrawerHost() {
  const ctx = useContext(AppDrawerContext);
  const { visible = false, close } = ctx ?? { visible: false, close: () => undefined };
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const progress = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else if (mounted) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible, progress, mounted]);

  if (!mounted) return null;

  const panelTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-340, 0],
  });
  const backdropOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const tabs: DrawerLink[] = [
    { icon: 'home-outline', label: t('nav.home'), href: '/', mode: 'switch' },
    { icon: 'add-circle-outline', label: 'Register', href: '/register', mode: 'switch' },
    { icon: 'ellipsis-horizontal', label: 'More', href: '/more', mode: 'switch' },
  ];

  const learn: DrawerLink[] = [
    { icon: 'information-circle-outline', label: t('nav.about'), href: '/about', mode: 'push' },
    { icon: 'refresh-circle-outline', label: t('nav.howItWorks'), href: '/how-it-works', mode: 'push' },
    { icon: 'book-outline', label: 'Smart Parking Guide', href: '/smart-parking-guide', mode: 'push' },
    { icon: 'shield-checkmark-outline', label: 'QR Code Safety', href: '/qr-code-safety', mode: 'push' },
  ];

  const support: DrawerLink[] = [
    { icon: 'help-circle-outline', label: t('nav.faq'), href: '/faq', mode: 'push' },
    { icon: 'mail-outline', label: t('nav.contact'), href: '/contact', mode: 'push' },
    { icon: 'lock-closed-outline', label: t('footer.privacyPolicy'), href: '/privacy', mode: 'push' },
  ];

  const handleLink = (link: DrawerLink) => {
    close();
    if (link.mode === 'switch') {
      router.replace(link.href as never);
    } else {
      router.push(link.href as never);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const renderGroup = (label: string, links: DrawerLink[]) => (
    <View style={styles.group}>
      <ThemedText type="caption" themeColor="textSecondary" style={styles.groupLabel}>
        {label.toUpperCase()}
      </ThemedText>
      {links.map((link) => {
        const active = isActive(link.href);
        return (
          <Pressable
            key={link.href + link.label}
            onPress={() => handleLink(link)}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.row,
              active && { backgroundColor: theme.accentSoft },
              pressed && !active && styles.pressed,
            ]}
          >
            <Ionicons
              name={link.icon}
              size={20}
              color={active ? theme.accentHover : theme.textSecondary}
            />
            <ThemedText
              type="cardTitle"
              style={[styles.rowLabel, active && { color: theme.accentHover }]}
            >
              {link.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );

  const socials = [
    { icon: 'logo-instagram' as const, href: BRAND.socials.instagram, label: 'Instagram' },
    { icon: 'logo-linkedin' as const, href: BRAND.socials.linkedin, label: 'LinkedIn' },
    { icon: 'logo-facebook' as const, href: BRAND.socials.facebook, label: 'Facebook' },
  ];


  return (
    <Modal transparent visible onRequestClose={close} statusBarTranslucent animationType="none">
      <View style={styles.flex}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={close} accessibilityLabel="Close menu">
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
          </Pressable>
        </Animated.View>

        <Animated.View
          style={[
            styles.panel,
            {
              backgroundColor: theme.white,
              paddingTop: insets.top + Spacing.three,
              paddingBottom: insets.bottom + Spacing.three,
              transform: [{ translateX: panelTranslateX }],
            },
          ]}
        >
          <View style={styles.brandRow}>
            <Image source={LOGO} style={styles.logo} contentFit="contain" />
            <Pressable onPress={close} hitSlop={8} accessibilityLabel="Close menu">
              <Ionicons name="close" size={22} color={theme.textSecondary} />
            </Pressable>
          </View>
          <ThemedText type="caption" themeColor="textSecondary" style={styles.tagline}>
            Smart parking &amp; QR tags — register vehicles and personal items.
          </ThemedText>

          <View style={styles.scroll}>
            {renderGroup('Menu', tabs)}
            {renderGroup('Learn', learn)}
            {renderGroup('Support', support)}
          </View>

          <View style={styles.footer}>
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
                    { backgroundColor: theme.accentSoft },
                    pressed && styles.pressed,
                  ]}
                >
                  <Ionicons name={icon} size={18} color={theme.highlight} />
                </Pressable>
              ))}
            </View>
            <ThemedText type="caption" themeColor="textSecondary">
              {BRAND.name}
            </ThemedText>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 320,
    maxWidth: '86%',
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
    borderTopRightRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
    shadowColor: '#121212',
    shadowOpacity: 0.25,
    shadowRadius: 32,
    shadowOffset: { width: 8, height: 0 },
    elevation: 16,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 28,
    width: 92,
  },
  tagline: {
    marginBottom: Spacing.two,
  },
  scroll: {
    flex: 1,
    gap: Spacing.four,
  },
  group: {
    gap: Spacing.one + 2,
  },
  groupLabel: {
    paddingHorizontal: Spacing.two,
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.two + 4,
    paddingVertical: 12,
    minHeight: 44,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  pressed: {
    backgroundColor: 'rgba(18, 18, 18, 0.04)',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  socialButton: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

