/**
 * Vehicle Detail — clone of the parking-alert web VehicleDetailPage:
 * fetches a vehicle request by scanned QR id from Firestore.
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
import { useLanguage } from '@/context/LanguageContext';
import {
  getVehicleRequestByQrId,
  type VehicleRequest,
} from '@/services/vehicleService';
import { Radius, Spacing } from '@/constants/theme';

export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();
  const [request, setRequest] = useState<VehicleRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const fetchRequest = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getVehicleRequestByQrId(id);
        if (!active) return;
        if (!data) {
          setError('No matching vehicle request found.');
          return;
        }
        setRequest(data);
      } catch (err) {
        if (!active) return;
        setError(
          err instanceof Error && err.message
            ? err.message
            : 'Unable to load vehicle request.',
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchRequest();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Screen showBack title="Vehicle Details">
        <CardSkeleton />
      </Screen>
    );
  }

  if (error || !request) {
    return (
      <Screen showBack title="Vehicle Details">
        <ErrorState
          icon="car-outline"
          title="Vehicle Not Found"
          message={error}
          actionLabel="Back to Home"
          onAction={() => router.replace('/')}
        />
      </Screen>
    );
  }

  return (
    <Screen showBack title="Vehicle Details">
      <Badge icon="shield-checkmark-outline" label="Verified Vehicle" />

      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.avatar, { backgroundColor: theme.accentSoft }]}>
            <Ionicons name="car-outline" size={26} color={theme.accentHover} />
          </View>
          <View style={styles.cardHeaderText}>
            <ThemedText type="h3">{request.ownerName}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Contact the owner using the details below.
            </ThemedText>
          </View>
        </View>

        <View style={styles.rows}>
          <DetailRow icon="person-outline" label="Owner Name" value={request.ownerName} />
          <DetailRow icon="car-outline" label="Vehicle Name" value={request.vehicleName} />
          <DetailRow icon="card-outline" label="Vehicle Number" value={request.vehicleNumber} />
          <DetailRow icon="call-outline" label="Contact Number" value={request.contactNumber} />
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
        Powered by <ThemedText type="caption" style={{ color: theme.highlight, fontWeight: 700 }}>RAABTA TAG</ThemedText>
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

