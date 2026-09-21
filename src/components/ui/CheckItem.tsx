/**
 * CheckItem — clone of the web ✓ list rows (accent check + secondary text).
 */
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

type CheckItemProps = {
  children: string;
  /** Optional bold lead, e.g. "No direct phone number exposure" — rest is normal. */
  boldLead?: string;
};

export function CheckItem({ children, boldLead }: CheckItemProps) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <Ionicons name="checkmark" size={16} color={theme.accent} />
      <ThemedText type="body" themeColor="textSecondary" style={styles.text}>
        {boldLead ? (
          <>
            <ThemedText type="body" style={{ fontWeight: 700, color: theme.text }}>
              {boldLead}
            </ThemedText>
            {children}
          </>
        ) : (
          children
        )}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two + 2,
  },
  text: {
    flex: 1,
  },
});

export default CheckItem;
