/**
 * LanguageModal + LanguageSwitcher — clone of the parking-alert web
 * LanguageModal (shown on first launch when no language is stored)
 * and the navbar LanguageSwitcher.
 */
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage, type Language } from '@/context/LanguageContext';
import { Radius, Spacing } from '@/constants/theme';

function LanguageOption({
  flag,
  title,
  subtitle,
  onPress,
}: {
  flag: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        { borderColor: 'rgba(18, 18, 18, 0.15)', backgroundColor: 'rgba(247, 248, 242, 0.4)' },
        pressed && { borderColor: theme.accent, backgroundColor: theme.accentSoft, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View style={styles.optionFlag}>
        <ThemedText style={{ fontSize: 26 }}>{flag}</ThemedText>
      </View>
      <ThemedText type="cardTitle">{title}</ThemedText>
      <ThemedText type="caption" themeColor="textSecondary" style={styles.optionSubtitle}>
        {subtitle}
      </ThemedText>
    </Pressable>
  );
}

/** First-launch language gate — same trigger logic as the web MainLayout. */
export function LanguageModal() {
  const { setLanguage } = useLanguage();
  const theme = useTheme();

  const select = (language: Language) => {
    setLanguage(language);
  };

  return (
    <View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.globe}>🌐</ThemedText>

        <ThemedText type="h2" style={styles.center}>
          Select Language
        </ThemedText>
        <ThemedText type="h3" style={[styles.center, { color: theme.accentHover }]} writingDirection="rtl">
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

        <View style={styles.optionsRow}>
          <LanguageOption
            flag="🇺🇸"
            title="English"
            subtitle="Continue in English"
            onPress={() => select('en')}
          />
          <LanguageOption
            flag="🇸🇦"
            title="العربية"
            subtitle="المتابعة باللغة العربية"
            onPress={() => select('ar')}
          />
        </View>

        <ThemedText type="caption" themeColor="textSecondary" style={styles.center}>
          You can change this later from the language menu in the header.
        </ThemedText>
        <ThemedText
          type="caption"
          themeColor="textSecondary"
          style={styles.center}
          writingDirection="rtl"
        >
          يمكنك تغيير هذا لاحقاً من قائمة اللغة في الأعلى.
        </ThemedText>
      </ThemedView>
    </View>
  );
}

/** Globe button for the header — opens a compact switcher modal. */
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const options: Array<{ value: Language; label: string }> = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ];

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        hitSlop={8}
        style={({ pressed }) => [
          styles.switcherButton,
          { backgroundColor: theme.surface },
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="globe-outline" size={20} color={theme.text} />
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.switcherOverlay} onPress={() => setVisible(false)}>
          <ThemedView
            style={styles.switcherCard}
            onStartShouldSetResponder={() => true}
          >
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  setLanguage(option.value);
                  setVisible(false);
                }}
                style={({ pressed }) => [
                  styles.switcherOption,
                  pressed && styles.pressed,
                ]}
              >
                <ThemedText type="cardTitle">{option.label}</ThemedText>
                {language === option.value ? (
                  <Ionicons name="checkmark" size={18} color={theme.text} />
                ) : null}
              </Pressable>
            ))}
          </ThemedView>
        </Pressable>
      </Modal>
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
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
    shadowColor: '#121212',
    shadowOpacity: 0.25,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },
  globe: {
    fontSize: 40,
  },
  center: {
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    marginTop: Spacing.three,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  option: {
    flexGrow: 1,
    flexBasis: '45%',
    minWidth: 140,
    borderRadius: Radius.lg,
    borderWidth: 2,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    alignItems: 'center',
    gap: 4,
  },
  optionFlag: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  optionSubtitle: {
    textAlign: 'center',
  },
  switcherButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switcherOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: Spacing.three,
  },
  switcherCard: {
    width: 200,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.08)',
    backgroundColor: '#FFFFFF',
    padding: Spacing.two,
    gap: 2,
    shadowColor: '#121212',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  switcherOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
