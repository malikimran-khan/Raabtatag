/**
 * Register Item — clone of the parking-alert web PersonalItemFormPage:
 * personal item form → Firestore, chip item-type selector,
 * 200-char description counter, success screen.
 */
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Screen } from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ItemTypeSelect } from '@/components/ui/ItemTypeSelect';
import { StatusBanner } from '@/components/ui/StatusBanner';
import { SummaryRow } from '@/components/ui/InfoRow';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import {
  createPersonalItem,
  type PersonalItem,
} from '@/services/personalItemService';
import { Spacing } from '@/constants/theme';

const initialFormState = {
  ownerName: '',
  phoneNumber: '',
  itemType: 'keys',
  itemDescription: '',
};

export default function RegisterItemScreen() {
  const { t } = useLanguage();
  const theme = useTheme();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState<PersonalItem | null>(null);

  const handleChange = (field: keyof typeof initialFormState) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateForm = (): string | null => {
    const requiredFields: Array<'ownerName' | 'phoneNumber'> = [
      'ownerName',
      'phoneNumber',
    ];

    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        return t('personalItemForm.validationRequired');
      }
    }

    if (!/^[A-Za-z\s.'-]{2,60}$/.test(formData.ownerName.trim())) {
      return t('personalItemForm.validationOwner');
    }

    if (!/^\+?[0-9\s-]{7,20}$/.test(formData.phoneNumber)) {
      return t('personalItemForm.validationPhone');
    }

    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
    if (/^(.)\1+$/.test(phoneDigits)) {
      return t('personalItemForm.validationRealPhone');
    }

    return null;
  };

  const handleSubmit = async () => {
    setError('');
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const requestPayload: PersonalItem = {
        ownerName: formData.ownerName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        itemType: formData.itemType,
        itemDescription: formData.itemDescription.trim(),
      };

      const item = await createPersonalItem(requestPayload);
      setSuccessMessage(item);
      setFormData(initialFormState);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : t('personalItemForm.submitError'),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessMessage(null);
    setError('');
  };

  return (
    <Screen showBack title={t('personalItemForm.title')}>
      <View style={styles.header}>
        <ThemedText type="h2" style={{ color: theme.accentHover, textAlign: 'left' }}>
          {t('personalItemForm.title')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.headerSubtitle}>
          {t('personalItemForm.subtitle')}
        </ThemedText>
      </View>

      {successMessage ? (
        <Card glow="green" style={styles.successCard}>
          <View style={[styles.successPill, { backgroundColor: 'rgba(18, 18, 18, 0.06)' }]}>
            <Ionicons name="checkmark-circle-outline" size={16} color={theme.highlight} />
            <ThemedText type="smallBold">{t('personalItemForm.successTitle')}</ThemedText>
          </View>

          <ThemedText type="h3" style={styles.successPending}>
            {t('personalItemForm.successPending')}
          </ThemedText>
          <ThemedText type="body" themeColor="textSecondary" style={styles.centerText}>
            {t('personalItemForm.successText')}
          </ThemedText>

          <View style={styles.summaryStack}>
            <SummaryRow label={t('personalItemForm.requestId')} value={successMessage.id} />
            <SummaryRow label={t('personalItemForm.owner')} value={successMessage.ownerName} />
            <SummaryRow label={t('personalItemForm.phone')} value={successMessage.phoneNumber} />
            <SummaryRow label={t('personalItemForm.itemType')} value={successMessage.itemType} />
            <SummaryRow label={t('personalItemForm.status')} value={successMessage.status} />
          </View>

          <Button icon="refresh-outline" fullWidth onPress={handleReset}>
            {t('personalItemForm.registerAnother')}
          </Button>
        </Card>
      ) : (
        <Card glow="blue" style={styles.formCard}>
          <View style={styles.formStack}>
            <Input
              label={t('personalItemForm.ownerName')}
              placeholder={t('personalItemForm.ownerPlaceholder')}
              value={formData.ownerName}
              onChangeText={handleChange('ownerName')}
              icon="person-outline"
            />
            <Input
              label={t('personalItemForm.phoneNumber')}
              placeholder={t('personalItemForm.phonePlaceholder')}
              value={formData.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              icon="phone-portrait-outline"
              keyboardType="phone-pad"
            />
            <ItemTypeSelect
              value={formData.itemType}
              onChange={(value) => handleChange('itemType')(value)}
            />

            <View style={styles.descriptionWrap}>
              <ThemedText type="smallBold">
                {t('personalItemForm.descriptionLabel')}
              </ThemedText>
              <Input
                placeholder={t('personalItemForm.descriptionPlaceholder')}
                value={formData.itemDescription}
                onChangeText={handleChange('itemDescription')}
                multiline
                maxLength={200}
                style={styles.textArea}
              />
              <ThemedText type="caption" themeColor="textSecondary">
                {t('personalItemForm.characters', {
                  count: formData.itemDescription.length,
                })}
              </ThemedText>
            </View>

            {error ? <StatusBanner type="error" message={error} /> : null}

            <Button fullWidth isLoading={loading} onPress={handleSubmit}>
              {t('personalItemForm.submit')}
            </Button>
          </View>
        </Card>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  headerSubtitle: {
    textAlign: 'center',
  },
  successCard: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  successPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: 8,
  },
  successPending: {
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  summaryStack: {
    alignSelf: 'stretch',
    gap: Spacing.two + 4,
    marginBottom: Spacing.two,
  },
  formCard: {
    padding: Spacing.three,
  },
  formStack: {
    gap: Spacing.three,
  },
  descriptionWrap: {
    gap: Spacing.two,
  },
  textArea: {
    height: 90,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
});
