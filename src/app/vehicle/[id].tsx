/**
 * Vehicle Detail — clone of the parking-alert web VehicleDetailPage:
 * fetches a vehicle request by scanned QR id from Firestore.
 */
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { Button } from '@/components/ui/Button';
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
      <Screen showBack>
        <CardSkeleton />
      </Screen>
    );
  }

  if (error || !request) {
    return (
      <Screen showBack>
        <View style={styles.errorWrap}>
          <View style={[styles.errorIcon, { backgroundColor: 'rgba(239, 68, 68, 0.08)' }]}>
            <Ionicons name="car-outline" size={30} color="rgba(239, 68, 68, 0.7)" />
          </View>
          <ThemedText type="h2" style={styles.center}>
            Vehicle Not Found
          </ThemedText>
          <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
            {error}
          </ThemedText>
          <Button
            variant="primary"
            icon="arrow-back"
            onPress={() => router.replace('/')}
          >
            Back to Home
          </Button>
        </View>
      </Screen>
    );
  }

  return (
    <Screen showBack title="Vehicle Details">
      <View style={styles.card}>
        {/* Accent header bar (web: gradient-to-r from-accent via-accent/70 to-accent/30) */}
        <LinearGradient
          colors={['#CBF32B', 'rgba(203, 243, 43, 0.7)', 'rgba(203, 243, 43, 0.3)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.accentBar}
        />

        <View style={styles.cardBody}>
          <View
            style={[
              styles.verifiedBadge,
              {
                backgroundColor: 'rgba(203, 243, 43, 0.1)',
                borderColor: 'rgba(203, 243, 43, 0.2)',
              },
            ]}
          >
            <Ionicons name="shield-checkmark-outline" size={13} color={theme.highlight} />
            <ThemedText type="caption">Verified Vehicle</ThemedText>
          </View>

          <ThemedText type="h2">{request.ownerName}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Contact the owner using the details below.
          </ThemedText>

          <View style={styles.rows}>
            <DetailRow icon="person-outline" label="Owner Name" value={request.ownerName} />
            <DetailRow icon="car-outline" label="Vehicle Name" value={request.vehicleName} />
            <DetailRow icon="card-outline" label="Vehicle Number" value={request.vehicleNumber} />
            <DetailRow icon="call-outline" label="Contact Number" value={request.contactNumber} />
          </View>

          <Button
            variant="primary"
            icon="call-outline"
            fullWidth
            onPress={() => router.replace('/')}
          >
            Back to Home
          </Button>
        </View>
      </View>

      <ThemedText type="caption" themeColor="textSecondary" style={styles.poweredBy}>
        Powered by <ThemedText type="caption" style={{ color: theme.highlight, fontWeight: 700 }}>RAABTA TAG</ThemedText>
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  errorWrap: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.six,
  },
  errorIcon: {
    width: 64,
    height: 64,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: Radius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.08)',
    overflow: 'hidden',
    shadowColor: '#121212',
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 2,
  },
  accentBar: {
    height: 8,
  },
  cardBody: {
    padding: Spacing.three,
    gap: Spacing.two + 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: Spacing.two + 4,
    paddingVertical: 6,
    marginBottom: Spacing.two,
  },
  rows: {
    gap: Spacing.two + 4,
    marginTop: Spacing.two,
  },
  poweredBy: {
    textAlign: 'center',
  },
});
