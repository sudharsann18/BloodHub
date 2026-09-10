import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingView from '../../components/common/LoadingView';
import EmptyState from '../../components/common/EmptyState';
import InfoRow from '../../components/common/InfoRow';
import { colors, spacing, typography } from '../../theme/theme';

export default function UserRequestsScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const [requests, reservations] = await Promise.all([
        api.get('/request/my', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/reservation/my', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setItems([
        ...(Array.isArray(requests.data) ? requests.data : []).map(item => ({ ...item, kind: 'Emergency request' })),
        ...(Array.isArray(reservations.data) ? reservations.data : []).map(item => ({ ...item, kind: 'Reservation' })),
      ].sort((a, b) => String(b.createdAt || b.reservationDate || '').localeCompare(String(a.createdAt || a.reservationDate || ''))));
    } catch { setItems([]); } finally { setLoading(false); }
  }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));
  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.container}><AppHeader title="My requests" subtitle="Track reservations and emergency requests" />{loading ? <LoadingView label="Loading your activity..." /> : items.length === 0 ? <AppCard><EmptyState title="No requests yet" message="Your reservations and emergency requests will appear here." /></AppCard> : items.map(item => <AppCard key={`${item.kind}-${item.id}`} style={styles.card} accent={item.kind === 'Emergency request' ? colors.red : colors.navy}><View style={styles.cardHeader}><View><Text style={styles.kind}>{item.kind}</Text><Text style={styles.name}>{item.hospital || 'Hospital not available'}</Text></View><StatusBadge status={item.status} /></View><InfoRow label="Blood group" value={item.bloodGroup} /><InfoRow label="Units" value={item.units} /><InfoRow label="Patient" value={item.patientName} /></AppCard>)}</ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: colors.canvas }, container: { padding: spacing.lg, paddingBottom: spacing.xxl }, card: { marginBottom: spacing.md }, cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm }, kind: { ...typography.label, color: colors.muted, textTransform: 'uppercase' }, name: { ...typography.heading, color: colors.navy, marginTop: 4 } });
