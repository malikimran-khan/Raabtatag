/**
 * Vehicle number helpers — cloned 1:1 from the parking-alert web app
 * (src/pages/CreateUserPage.jsx).
 */
export type TranslationFunction = (
  key: string,
  vars?: Record<string, string | number>,
) => string;

export const normalizeVehicleNumber = (value: string): string =>
  value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

export const formatVehicleNumberInput = (value: string): string =>
  value
    .toUpperCase()
    .replace(/[^A-Z0-9-\s]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 15);

export const validateVehicleNumber = (
  value: string,
  t: TranslationFunction,
): string | null => {
  const normalized = normalizeVehicleNumber(value);

  if (normalized.length < 4 || normalized.length > 10) {
    return t('createVehicle.validationVehicleNumber');
  }

  if (!/[A-Z]/.test(normalized)) {
    return t('createVehicle.validationVehicleNumberLetters');
  }

  if (!/[0-9]/.test(normalized)) {
    return t('createVehicle.validationVehicleNumberDigits');
  }

  if (/^\d+$/.test(normalized)) {
    return t('createVehicle.validationVehicleNumberOnlyNumbers');
  }

  if (/^(.)\1+$/.test(normalized)) {
    return t('createVehicle.validationVehicleNumberRepeats');
  }

  if (!/^[A-Z]{1,4}[0-9]{1,6}[A-Z]{0,2}$/.test(normalized)) {
    return t('createVehicle.validationVehicleNumberFormat');
  }

  return null;
};
