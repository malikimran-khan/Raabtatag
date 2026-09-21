/**
 * Language provider — lightweight i18n clone of the parking-alert web app.
 * Uses the exact same translation bundles (en/ar), the same localStorage key
 * (`raabta-language`) and the same interpolation syntax (`{{year}}`, `{{count}}`).
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ar from '@/i18n/ar.json';
import en from '@/i18n/en.json';

export type Language = 'en' | 'ar';

/** Same storage key as the web app. */
const STORAGE_KEY = 'raabta-language';

const resources: Record<Language, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  ar: ar as Record<string, unknown>,
};

export type TranslationFunction = (
  key: string,
  vars?: Record<string, string | number>,
) => string;

type LanguageContextValue = {
  language: Language;
  isRTL: boolean;
  /** True once the stored language has been read from storage. */
  ready: boolean;
  /** null while loading, true/false once loaded (web parity for the language modal). */
  hasStoredLanguage: boolean | null;
  setLanguage: (language: Language) => void;
  t: TranslationFunction;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const resolve = (
  tree: Record<string, unknown>,
  key: string,
): string | undefined => {
  const value = key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, tree);
  return typeof value === 'string' ? value : undefined;
};

const interpolate = (
  template: string,
  vars?: Record<string, string | number>,
): string => {
  if (!vars) return template;
  return template.replace(/{{(\w+)}}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [hasStoredLanguage, setHasStoredLanguage] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!active) return;
        if (stored === 'en' || stored === 'ar') {
          setLanguageState(stored);
          setHasStoredLanguage(true);
        } else {
          setHasStoredLanguage(false);
        }
      })
      .catch(() => {
        if (active) setHasStoredLanguage(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => undefined);
  }, []);

  const t = useCallback<TranslationFunction>(
    (key, vars) => {
      const value =
        resolve(resources[language], key) ?? resolve(resources.en, key) ?? key;
      return interpolate(value, vars);
    },
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      isRTL: language === 'ar',
      ready: hasStoredLanguage !== null,
      hasStoredLanguage,
      setLanguage,
      t,
    }),
    [language, hasStoredLanguage, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
