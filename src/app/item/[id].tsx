/**
 * Personal Item Detail — clone of the parking-alert web PersonalItemDetailPage:
 * fetches a personal item by scanned QR id from Firestore.
 */
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ErrorState } from '@/components/ui/StateViews';
import { DetailRow } from '@/components/ui/InfoRow';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import {
  getPersonalItemByQrId,
  type PersonalItem,
} from '@/services/personalItemService';
import { Radius, Spacing } from '@/constants/theme';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const [item, setItem] = useState<PersonalItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const fetchItem = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getPersonalItemByQrId(id);
        if (!active) return;
        if (!data) {
          setError('No matching personal item found.');
          return;
        }
        setItem(data);
      } catch (err) {
        if (!active) return;
        setError(
          err instanceof Error && err.message
            ? err.message
            : 'Unable to load personal item.',
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchItem();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Screen showBack title="Item Details">
        <CardSkeleton />
      </Screen>
    );
  }

  if (error || !item) {
    return (
      <Screen showBack title="Item Details">
        <ErrorState
          icon="pricetag-outline"
          title="Item Not Found"
          message={error}
          actionLabel="Back to Home"
          onAction={() => router.replace('/')}
        />
      </Screen>
    );
  }

  return (
    <Screen showBack title="Item Details">
      <Badge icon="shield-checkmark-outline" label="Registered Item" />

      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.avatar, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name="pricetag-outline" size={26} color={theme.accentHover} />
          </View>
          <View style={styles.cardHeaderText}>
            <ThemedText type="h3">{item.ownerName}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Contact the owner using the details below.
            </ThemedText>
          </View>
        </View>

        <View style={styles.rows}>
          <DetailRow icon="person-outline" label="Owner Name" value={item.ownerName} />
          <DetailRow
            icon="phone-portrait-outline"
            label="Contact Number"
            value={item.phoneNumber}
          />
        </View>
      </Card>

      <Button
        variant="primary"
        icon="arrow-back"
        fullWidth
        onPress={() => router.replace('/')}
      >
        Back to Home
      </Button>

      <ThemedText type="caption" themeColor="textSecondary" style={styles.poweredBy}>
        Powered by{' '}
        <ThemedText type="caption" style={{ color: theme.highlight, fontWeight: 700 }}>
          RAABTA TAG
        </ThemedText>
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.three,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderText: {
    flex: 1,
    gap: 2,
  },
  rows: {
    gap: Spacing.two,
  },
  poweredBy: {
    textAlign: 'center',
  },
});

