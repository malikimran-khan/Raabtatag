/**
 * ItemTypeSelect — item-type selector rendered as tappable chips with
 * icons (keys, phone, tablet, wallet, bag, laptop, other). The stored
 * values are unchanged.
 */
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Spacing } from '@/constants/theme';
const ITEM_TYPES = [
  { value: 'keys', icon: 'key-outline' },
  { value: 'phone', icon: 'call-outline' },
  { value: 'tablet', icon: 'tablet-portrait-outline' },
  { value: 'wallet', icon: 'wallet-outline' },
  { value: 'bag', icon: 'briefcase-outline' },
  { value: 'laptop', icon: 'laptop-outline' },
  { value: 'other', icon: 'help-circle-outline' },
] as const;

type ItemTypeSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ItemTypeSelect({ value, onChange }: ItemTypeSelectProps) {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <ThemedText type="smallBold">
        {t('personalItemForm.itemType')}{' '}
        <ThemedText type="smallBold" themeColor="danger">*</ThemedText>
      </ThemedText>
      <View style={styles.chipsRow}>
        {ITEM_TYPES.map(({ value: type, icon }) => {
          const selected = value === type;
          return (
            <Pressable
              key={type}
              onPress={() => onChange(type)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: selected ? theme.accentSoft : theme.white,
                  borderColor: selected ? theme.accentHover : theme.border,
                },
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name={icon}
                size={15}
                color={selected ? theme.accentHover : theme.textSecondary}
              />
              <ThemedText
                type="small"
                style={{ color: selected ? theme.highlight : theme.textSecondary }}
              >
                {t(`personalItemForm.itemTypes.${type}`)}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: Spacing.two + 6,
    paddingVertical: 10,
    minHeight: 40,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default ItemTypeSelect;

