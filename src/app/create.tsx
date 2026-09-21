/**
 * Create — clone of the parking-alert web CreateUserPage:
 * vehicle service request form → Firestore with duplicate-plate guard,
 * identical validation rules and success screen.
 */
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Screen } from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBanner } from '@/components/ui/StatusBanner';
import { SummaryRow } from '@/components/ui/InfoRow';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import {
  createVehicleRequest,
  vehicleNumberExists,
  type VehicleRequest,
} from '@/services/vehicleService';
import {
  formatVehicleNumberInput,
  normalizeVehicleNumber,
  validateVehicleNumber,
} from '@/utils/vehicle';
import { Radius, Spacing } from '@/constants/theme';

const initialFormState = {
  ownerName: '',
  email: '',
  contactNumber: '',
  address: '',
  vehicleName: '',
  vehicleNumber: '',
  vehicleColor: '',
};

export default function CreateScreen() {
  const { t } = useLanguage();
  const theme = useTheme();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState<VehicleRequest | null>(null);

  const handleChange = (field: keyof typeof initialFormState) => (value: string) => {
    const nextValue =
      field === 'vehicleNumber' ? formatVehicleNumberInput(value) : value;
    setFormData((prev) => ({ ...prev, [field]: nextValue }));
    setError('');
  };

  const validateForm = (): string | null => {
    const requiredFields = Object.keys(initialFormState) as Array<
      keyof typeof initialFormState
    >;

    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        return t('createVehicle.validationRequired');
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return t('createVehicle.validationEmail');
    }

    if (!/^[A-Za-z\s.'-]{2,60}$/.test(formData.ownerName.trim())) {
      return t('createVehicle.validationOwner');
    }

    if (!/^\+?[0-9\s-]{7,20}$/.test(formData.contactNumber)) {
      return t('createVehicle.validationContact');
    }

    const contactDigits = formData.contactNumber.replace(/\D/g, '');
    if (/^(.)\1+$/.test(contactDigits)) {
      return t('createVehicle.validationContact');
    }

    if (formData.address.trim().length < 8) {
      return t('createVehicle.validationAddress');
    }

    if (!/^[A-Za-z0-9\s.'-]{2,40}$/.test(formData.vehicleName.trim())) {
      return t('createVehicle.validationVehicleName');
    }

    if (!/^[A-Za-z\s-]{3,30}$/.test(formData.vehicleColor.trim())) {
      return t('createVehicle.validationVehicleColor');
    }

    const vehicleNumberError = validateVehicleNumber(formData.vehicleNumber, t);
    if (vehicleNumberError) {
      return vehicleNumberError;
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
      const vehicleNumberNormalized = normalizeVehicleNumber(formData.vehicleNumber);
      const alreadyExists = await vehicleNumberExists(vehicleNumberNormalized);

      if (alreadyExists) {
        setError(t('createVehicle.duplicateVehicle'));
        return;
      }

      const requestPayload: VehicleRequest = {
        ...formData,
        ownerName: formData.ownerName.trim(),
        email: formData.email.trim().toLowerCase(),
        contactNumber: formData.contactNumber.trim(),
        address: formData.address.trim(),
        vehicleName: formData.vehicleName.trim(),
        vehicleNumber: formData.vehicleNumber.trim().toUpperCase(),
        vehicleColor: formData.vehicleColor.trim(),
        vehicleNumberNormalized,
      };

      const request = await createVehicleRequest(requestPayload);
      setSuccessMessage(request);
      setFormData(initialFormState);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : t('createVehicle.submitError'),
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
    <Screen showBack title={t('createVehicle.title')}>
      <View style={styles.header}>
        <ThemedText type="h2" style={{ color: theme.accentHover, textAlign: 'left' }}>
          {t('createVehicle.title')}
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.headerSubtitle}>
          {t('createVehicle.subtitle')}
        </ThemedText>
      </View>

      {successMessage ? (
        <Card glow="green" style={styles.successCard}>
          <View style={[styles.successPill, { backgroundColor: 'rgba(18, 18, 18, 0.06)' }]}>
            <Ionicons name="checkmark-circle-outline" size={16} color={theme.highlight} />
            <ThemedText type="smallBold">{t('createVehicle.successTitle')}</ThemedText>
          </View>

          <ThemedText type="h3" style={styles.successPending}>
            {t('createVehicle.successPending')}
          </ThemedText>
          <ThemedText type="body" themeColor="textSecondary" style={styles.centerText}>
            {t('createVehicle.successText')}
          </ThemedText>

          <View style={styles.summaryStack}>
            <SummaryRow label={t('createVehicle.requestId')} value={successMessage.id} />
            <SummaryRow label={t('createVehicle.owner')} value={successMessage.ownerName} />
            <SummaryRow label={t('createVehicle.vehicle')} value={successMessage.vehicleName} />
            <SummaryRow label={t('createVehicle.status')} value={successMessage.status} />
          </View>

          <Button icon="refresh-outline" fullWidth onPress={handleReset}>
            {t('createVehicle.submitAnother')}
          </Button>
        </Card>
      ) : (
        <Card glow="blue" style={styles.formCard}>
          <View style={styles.formStack}>
            <Input
              label={t('createVehicle.ownerName')}
              placeholder={t('createVehicle.ownerPlaceholder')}
              value={formData.ownerName}
              onChangeText={handleChange('ownerName')}
              icon="person-outline"
            />
            <Input
              label={t('createVehicle.email')}
              placeholder={t('createVehicle.emailPlaceholder')}
              value={formData.email}
              onChangeText={handleChange('email')}
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label={t('createVehicle.contactNumber')}
              placeholder={t('createVehicle.contactPlaceholder')}
              value={formData.contactNumber}
              onChangeText={handleChange('contactNumber')}
              icon="phone-portrait-outline"
              keyboardType="phone-pad"
            />
            <Input
              label={t('createVehicle.address')}
              placeholder={t('createVehicle.addressPlaceholder')}
              value={formData.address}
              onChangeText={handleChange('address')}
              icon="location-outline"
            />
            <Input
              label={t('createVehicle.vehicleName')}
              placeholder={t('createVehicle.vehicleNamePlaceholder')}
              value={formData.vehicleName}
              onChangeText={handleChange('vehicleName')}
              icon="car-outline"
            />
            <Input
              label={t('createVehicle.vehicleNumber')}
              placeholder={t('createVehicle.vehicleNumberPlaceholder')}
              value={formData.vehicleNumber}
              onChangeText={handleChange('vehicleNumber')}
              icon="card-outline"
              maxLength={15}
              autoCapitalize="characters"
            />
            <Input
              label={t('createVehicle.vehicleColor')}
              placeholder={t('createVehicle.vehicleColorPlaceholder')}
              value={formData.vehicleColor}
              onChangeText={handleChange('vehicleColor')}
              icon="color-palette-outline"
            />

            {error ? <StatusBanner type="error" message={error} /> : null}

            <Button fullWidth isLoading={loading} onPress={handleSubmit}>
              {t('createVehicle.submitRequest')}
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
});
