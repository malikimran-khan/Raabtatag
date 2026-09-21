/**
 * Contact — clone of the parking-alert web ContactPage:
 * Formspree-backed message form + email/visit/call/social info cards.
 */
import { useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Screen } from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { StatusBanner } from '@/components/ui/StatusBanner';
import { TitleWithAccent } from '@/components/ui/SectionHeading';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/constants/brand';
import { Radius, Spacing } from '@/constants/theme';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

type Status = { type: 'success' | 'error'; message: string } | null;

export default function ContactScreen() {
  const { t } = useLanguage();
  const theme = useTheme();
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<Status>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof initialFormState) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(BRAND.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: t('contact.successMessage') });
        setFormData(initialFormState);
      } else {
        setStatus({ type: 'error', message: t('contact.errorMessage') });
      }
    } catch {
      setStatus({ type: 'error', message: t('contact.networkError') });
    } finally {
      setLoading(false);
    }
  };

  const open = (url: string) => {
    if (Platform.OS !== 'web') Linking.openURL(url).catch(() => undefined);
  };

  const socials = [
    { icon: 'logo-instagram' as const, href: BRAND.socials.instagram, label: 'Instagram' },
    { icon: 'logo-linkedin' as const, href: BRAND.socials.linkedin, label: 'LinkedIn' },
    { icon: 'logo-facebook' as const, href: BRAND.socials.facebook, label: 'Facebook' },
  ];

  return (
    <Screen showBack withFooter title={t('contact.title')}>
      <View style={styles.header}>
        <TitleWithAccent text={t('contact.title')} type="h2" style={styles.left} />
        <ThemedText type="body" themeColor="textSecondary" style={styles.left}>
          {t('contact.subtitle')}
        </ThemedText>
      </View>

      <Card style={styles.formCard}>
        <ThemedText type="h3">{t('contact.formTitle')}</ThemedText>

        {status ? <StatusBanner type={status.type} message={status.message} /> : null}

        <View style={styles.formStack}>
          <Input
            label={t('contact.firstName')}
            placeholder={t('contact.placeholderFirstName')}
            value={formData.firstName}
            onChangeText={handleChange('firstName')}
            icon="person-outline"
          />
          <Input
            label={t('contact.lastName')}
            placeholder={t('contact.placeholderLastName')}
            value={formData.lastName}
            onChangeText={handleChange('lastName')}
            icon="person-outline"
          />
          <Input
            label={t('contact.emailAddress')}
            placeholder={t('contact.placeholderEmail')}
            value={formData.email}
            onChangeText={handleChange('email')}
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label={t('contact.message')}
            placeholder={t('contact.placeholderMessage')}
            value={formData.message}
            onChangeText={handleChange('message')}
            icon="chatbubble-outline"
            multiline
            style={styles.textArea}
          />
          <Button fullWidth isLoading={loading} onPress={handleSubmit}>
            {loading ? t('contact.sending') : t('contact.sendMessage')}
          </Button>
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <View style={[styles.infoIconTile, { backgroundColor: 'rgba(203, 243, 43, 0.2)' }]}>
          <Ionicons name="mail-outline" size={20} color={theme.highlight} />
        </View>
        <ThemedText type="cardTitle">{t('contact.emailUs')}</ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          {t('contact.emailDescription')}
        </ThemedText>
        <Pressable onPress={() => open(`mailto:${BRAND.email}`)}>
          <ThemedText type="smallBold">{BRAND.email}</ThemedText>
        </Pressable>
      </Card>

      <Card style={styles.infoCard}>
        <View style={[styles.infoIconTile, { backgroundColor: 'rgba(18, 18, 18, 0.06)' }]}>
          <Ionicons name="location-outline" size={20} color={theme.highlight} />
        </View>
        <ThemedText type="cardTitle">{t('contact.visitUs')}</ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          {t('contact.visitDescription')}
        </ThemedText>
        <ThemedText type="smallBold">{BRAND.addressLines.join('\n')}</ThemedText>
      </Card>

      <Card style={styles.infoCard}>
        <View style={[styles.infoIconTile, { backgroundColor: 'rgba(203, 243, 43, 0.2)' }]}>
          <Ionicons name="call-outline" size={20} color={theme.highlight} />
        </View>
        <ThemedText type="cardTitle">{t('contact.callUs')}</ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          {t('contact.callDescription')}
        </ThemedText>
        <Pressable onPress={() => open(`tel:${BRAND.phone}`)}>
          <ThemedText type="smallBold">{BRAND.phoneDisplay}</ThemedText>
        </Pressable>
      </Card>

      <Card style={styles.infoCard}>
        <ThemedText type="cardTitle">{t('contact.followUs')}</ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          {t('contact.followDescription')}
        </ThemedText>
        <View style={styles.socialRow}>
          {socials.map(({ icon, href, label }) => (
            <Pressable
              key={label}
              onPress={() => open(href)}
              accessibilityLabel={label}
              style={({ pressed }) => [
                styles.socialButton,
                { backgroundColor: 'rgba(203, 243, 43, 0.2)' },
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name={icon} size={20} color={theme.highlight} />
            </Pressable>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  header: {
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  left: {
    textAlign: 'left',
  },
  formCard: {
    gap: Spacing.three,
  },
  formStack: {
    gap: Spacing.three,
  },
  textArea: {
    height: 110,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  infoCard: {
    gap: Spacing.one + 2,
  },
  infoIconTile: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.two + 2,
    marginTop: Spacing.two,
  },
  socialButton: {
    width: 46,
    height: 46,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
