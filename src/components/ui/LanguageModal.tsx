/**
 * LanguageModal + LanguageSwitcher — mobile-native language controls.
 * - LanguageModal: first-launch gate (shown when no language is stored),
 *   rendered as a centered mobile dialog with large tappable options.
 * - LanguageSwitcher: header icon that opens a bottom sheet with the
 *   language choices (replaces the web dropdown menu).
 * The trigger logic and storage behavior are unchanged.
 */
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage, type Language } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

const LANGUAGE_OPTIONS: Array<{
  value: Language;
  flag: string;
  title: string;
  subtitle: string;
  label: string;
}> = [
  { value: 'en', flag: '🇺🇸', title: 'English', subtitle: 'Continue in English', label: 'English' },
  { value: 'ar', flag: '🇸🇦', title: 'العربية', subtitle: 'المتابعة باللغة العربية', label: 'العربية' },
];

function LanguageOptionCard({
  option,
  selected = false,
  onPress,
}: {
  option: (typeof LANGUAGE_OPTIONS)[number];
  selected?: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.option,
        {
          backgroundColor: selected ? theme.accentSoft : 'rgba(247, 248, 242, 0.6)',
          borderColor: selected ? theme.accentHover : theme.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.optionFlag}>
        <ThemedText style={{ fontSize: 22 }}>{option.flag}</ThemedText>
      </View>
      <View style={styles.optionText}>
        <ThemedText type="cardTitle">{option.title}</ThemedText>
        <ThemedText type="caption" themeColor="textSecondary">
          {option.subtitle}
        </ThemedText>
      </View>
      <Ionicons
        name={selected ? 'checkmark-circle' : 'chevron-forward'}
        size={selected ? 20 : 16}
        color={selected ? theme.accentHover : theme.textSecondary}
      />
    </Pressable>
  );
}

/** First-launch language gate — same trigger logic as the web MainLayout. */
export function LanguageModal() {
  const { setLanguage } = useLanguage();

  const select = (language: Language) => {
    setLanguage(language);
  };

  return (
    <View style={styles.overlay}>
      <ThemedView style={styles.card}>
        <View style={styles.globeTile}>
          <Ionicons name="globe-outline" size={28} color="#B7DE19" />
        </View>

        <ThemedText type="h2" style={styles.center}>
          Select Language
        </ThemedText>
        <ThemedText type="h3" style={[styles.center, { color: '#B7DE19' }]} writingDirection="rtl">
          اختر اللغة
        </ThemedText>

        <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
          Please choose your preferred language to customize your experience.
        </ThemedText>
        <ThemedText
          type="body"
          themeColor="textSecondary"
          style={styles.center}
          writingDirection="rtl"
        >
          يرجى اختيار لغتك المفضلة لتخصيص تجربتك.
        </ThemedText>

        <View style={styles.optionsStack}>
          {LANGUAGE_OPTIONS.map((option) => (
            <LanguageOptionCard
              key={option.value}
              option={option}
              onPress={() => select(option.value)}
            />
          ))}
        </View>

        <ThemedText type="caption" themeColor="textSecondary" style={styles.center}>
          You can change this later from the language menu in the header.
        </ThemedText>
      </ThemedView>
    </View>
  );
}

/** Header language button that opens the bottom-sheet picker. */
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="Change language"
        style={({ pressed }) => [styles.switcherButton, pressed && styles.pressed]}
      >
        <Ionicons name="language-outline" size={22} color={theme.text} />
      </Pressable>

      <BottomSheet visible={visible} onClose={() => setVisible(false)} title="Language">
        <View style={styles.sheetOptions}>
          {LANGUAGE_OPTIONS.map((option) => {
            const selected = language === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => {
                  setLanguage(option.value);
                  setVisible(false);
                }}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.sheetOption,
                  selected && { backgroundColor: theme.accentSoft },
                  pressed && styles.pressed,
                ]}
              >
                <ThemedText style={{ fontSize: 20 }}>{option.flag}</ThemedText>
                <ThemedText type="cardTitle" style={styles.sheetOptionLabel}>
                  {option.label}
                </ThemedText>
                {selected ? (
                  <Ionicons name="checkmark" size={18} color={theme.accentHover} />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </BottomSheet>
    </>
  );
}


const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.three,
    zIndex: 100,
    elevation: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
    shadowColor: '#121212',
    shadowOpacity: 0.25,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },
  globeTile: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(203, 243, 43, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  center: {
    textAlign: 'center',
  },
  optionsStack: {
    alignSelf: 'stretch',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    minHeight: 68,
  },
  optionFlag: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    flex: 1,
    gap: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  switcherButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetOptions: {
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
    paddingHorizontal: Spacing.three,
    paddingVertical: 14,
    minHeight: 52,
  },
  sheetOptionLabel: {
    flex: 1,
  },
});
