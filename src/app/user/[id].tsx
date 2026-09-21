/**
 * User Detail — clone of the parking-alert web UserDetailPage:
 * fetches a user doc by id, shows the QR code image and details,
 * with QR share (mobile equivalent of the web "Download QR").
 */
import { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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
      <Screen showBack>
        <CardSkeleton />
      </Screen>
    );
  }

  if (error || !user) {
    return (
      <Screen showBack>
        <Card style={styles.errorCard}>
          <ThemedText type="h2" style={styles.center}>
            User Not Found
          </ThemedText>
          <ThemedText type="body" themeColor="textSecondary" style={styles.center}>
            {error}
          </ThemedText>
          <Button variant="primary" icon="arrow-back" onPress={() => router.replace('/')}>
            Go Home
          </Button>
        </Card>
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
      {user.qrCode && Platform.OS !== 'web' ? (
        <View style={styles.shareRow}>
          <Button variant="outline" icon="download-outline" size="sm" onPress={handleShareQR}>
            Share QR
          </Button>
        </View>
      ) : null}

      <View style={styles.verifiedWrap}>
        <View style={[styles.verifiedBadge, { backgroundColor: 'rgba(18, 18, 18, 0.06)' }]}>
          <View style={[styles.verifiedDot, { backgroundColor: theme.highlight }]} />
          <ThemedText type="small">Verified User</ThemedText>
        </View>
      </View>

      <Card glow="blue" style={styles.mainCard}>
        <View style={styles.headerRow}>
          {user.qrCode ? (
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
          ) : null}
          <View style={styles.headerText}>
            <ThemedText type="h2">{user.name}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Registered user in RAABTA TAG system
            </ThemedText>
          </View>
        </View>

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
  errorCard: {
    alignItems: 'center',
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  verifiedWrap: {
    alignItems: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: 8,
  },
  verifiedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  mainCard: {
    gap: Spacing.three,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  qrTile: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.md,
    padding: Spacing.two,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.06)',
  },
  qrFallback: {
    width: 88,
    height: 88,
    textAlign: 'center',
    lineHeight: 88,
    fontSize: 22,
    fontWeight: 700,
    color: '#121212',
  },
  qrImage: {
    width: 96,
    height: 96,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  rows: {
    gap: Spacing.three,
  },
  poweredBy: {
    textAlign: 'center',
  },
});
