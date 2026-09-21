/**
 * ItemTypeSelect — mobile clone of the web item-type <select>
 * rendered as selectable chips (keys, phone, tablet, wallet, bag, laptop, other).
 */
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

const ITEM_TYPES = ['keys', 'phone', 'tablet', 'wallet', 'bag', 'laptop', 'other'] as const;

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
        {ITEM_TYPES.map((type) => {
          const selected = value === type;
          return (
            <Pressable
              key={type}
              onPress={() => onChange(type)}
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: selected ? theme.accentSoft : theme.white,
                  borderColor: selected ? theme.accent : theme.border,
                },
                pressed && styles.pressed,
              ]}
            >
              {selected ? (
                <Ionicons name="checkmark" size={14} color={theme.highlight} />
              ) : null}
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
    gap: 4,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.two + 6,
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default ItemTypeSelect;
