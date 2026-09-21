/**
 * User Detail — fetches a user doc by id, shows the QR code image and
 * details, with QR share (mobile equivalent of the web "Download QR").
 */
import { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
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
import { getUserById, type UserDoc } from '@/services/userService';
import { Radius, Spacing } from '@/constants/theme';

const HOME_URL = 'https://raabtatag.com';

function formatRegisteredOn(createdAt: unknown): string {
  try {
    const toDate = (createdAt as { toDate?: () => Date } | undefined)?.toDate;
    const date =
      typeof toDate === 'function' ? toDate.call(createdAt) : new Date(String(createdAt));
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'N/A';
  }
}

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const [user, setUser] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getUserById(id);
        if (active) setUser(data);
      } catch (err) {
        if (active) {
          setError(err instanceof Error && err.message ? err.message : 'User not found');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchUser();
    return () => {
      active = false;
    };
  }, [id]);

  // "Download QR" equivalent: share the QR image file (native only).
  const handleShareQR = async () => {
    if (!user?.qrCode || Platform.OS === 'web') return;
    try {
      const base64Data = user.qrCode.includes(',')
        ? user.qrCode.split(',')[1]
        : user.qrCode;
      const FileSystem = await import('expo-file-system/legacy');
      const Sharing = await import('expo-sharing');
      const fileUri = `${FileSystem.cacheDirectory}raabta-qr.png`;
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, { mimeType: 'image/png' });
      }
    } catch {
      // sharing unavailable — no-op
    }
  };

  if (loading) {
    return (
      <Screen showBack title="User Profile">
        <CardSkeleton />
      </Screen>
    );
  }

  if (error || !user) {
    return (
      <Screen showBack title="User Profile">
        <ErrorState
          icon="person-outline"
          title="User Not Found"
          message={error}
          actionLabel="Go Home"
          onAction={() => router.replace('/')}
        />
      </Screen>
    );
  }

  const details = [
    { icon: 'person-outline' as const, label: 'Full Name', value: user.name },
    { icon: 'id-card-outline' as const, label: 'CNIC Number', value: user.cnic },
    { icon: 'phone-portrait-outline' as const, label: 'Mobile Number', value: user.mobile },
    { icon: 'finger-print-outline' as const, label: 'Unique ID', value: user.uniqueId },
    {
      icon: 'calendar-outline' as const,
      label: 'Registered On',
      value: formatRegisteredOn(user.createdAt),
    },
  ];

  return (
    <Screen showBack title="User Profile">
      <Badge icon="checkmark-circle-outline" label="Verified User" tone="ink" />

      {user.qrCode ? (
        <Card glow="blue" style={styles.qrCard}>
          <View style={styles.qrTile}>
            {user.qrCode.startsWith('data:') ? (
              <Image
                source={{ uri: user.qrCode }}
                style={styles.qrImage}
                resizeMode="contain"
              />
            ) : (
              <ThemedText style={styles.qrFallback}>QR</ThemedText>
            )}
          </View>
          <ThemedText type="cardTitle" style={styles.center}>
            {user.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
            Registered user in RAABTA TAG system
          </ThemedText>
          {Platform.OS !== 'web' ? (
            <Button
              variant="outline"
              icon="download-outline"
              size="sm"
              onPress={handleShareQR}
            >
              Share QR
            </Button>
          ) : null}
        </Card>
      ) : null}

      <Card style={styles.detailsCard}>
        <View style={styles.rows}>
          {details.map((detail) => (
            <DetailRow
              key={detail.label}
              icon={detail.icon}
              label={detail.label}
              value={detail.value}
            />
          ))}
        </View>
      </Card>

      <ThemedText type="caption" themeColor="textSecondary" style={styles.poweredBy}>
        Powered by{' '}
        <ThemedText type="caption" style={{ color: theme.highlight, fontWeight: 700 }}>
          RAABTA TAG
        </ThemedText>{' '}
        · {HOME_URL}
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  qrCard: {
    alignItems: 'center',
    gap: Spacing.two + 2,
  },
  qrTile: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.lg,
    padding: Spacing.two + 4,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
  },
  qrFallback: {
    width: 128,
    height: 128,
    textAlign: 'center',
    lineHeight: 128,
    fontSize: 26,
    fontWeight: 700,
    color: '#121212',
  },
  qrImage: {
    width: 152,
    height: 152,
  },
  detailsCard: {
    gap: Spacing.three,
  },
  rows: {
    gap: Spacing.two,
  },
  poweredBy: {
    textAlign: 'center',
  },
});

