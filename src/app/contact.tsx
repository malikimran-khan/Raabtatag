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
import { PageHeader } from '@/components/ui/PageHeader';
import { ListGroup, ListRow } from '@/components/ui/ListGroup';
import { StatusBanner } from '@/components/ui/StatusBanner';
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
      <PageHeader
        icon="mail-outline"
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

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

      <ListGroup label="Reach us">
        <ListRow
          icon="mail-outline"
          label={t('contact.emailUs')}
          description={t('contact.emailDescription')}
          value={BRAND.email}
          onPress={() => open(`mailto:${BRAND.email}`)}
          showChevron={false}
        />
        <ListRow
          icon="call-outline"
          label={t('contact.callUs')}
          description={t('contact.callDescription')}
          value={BRAND.phoneDisplay}
          onPress={() => open(`tel:${BRAND.phone}`)}
          showChevron={false}
        />
        <ListRow
          icon="location-outline"
          label={t('contact.visitUs')}
          description={t('contact.visitDescription')}
          value={BRAND.addressLines.join(', ')}
          showChevron={false}
        />
      </ListGroup>

      <Card style={styles.socialCard}>
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
                { backgroundColor: theme.accentSoft },
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
  socialCard: {
    gap: Spacing.one + 2,
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

