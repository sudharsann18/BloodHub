import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import AppButton from '../../components/common/AppButton';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingView from '../../components/common/LoadingView';
import EmptyState from '../../components/common/EmptyState';
import { getAllRequests, getReservations } from '../../services/api';
import { colors, spacing, typography } from '../../theme/theme';

export default function HistoryScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState('emergency');
  const [requests, setRequests] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const [requestData, reservationData] = await Promise.all([getAllRequests(), getReservations()]);
      setRequests(Array.isArray(requestData) ? requestData.filter((item) => item.status && item.status !== 'REQUESTED') : []);
      setReservations(Array.isArray(reservationData) ? reservationData.filter((item) => item.status && item.status !== 'REQUESTED') : []);
    } catch {
      setRequests([]);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadHistory(); }, []);

  const renderEmergency = (item) => (
    <AppCard key={`history-request-${item.id}`} style={styles.card} accent={colors.red}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kind}>Emergency history</Text>
          <Text style={styles.patient}>{item.patientName || 'Patient not available'}</Text>
        </View>
        <StatusBadge status={item.status || 'Completed'} />
      </View>
      <View style={styles.infoList}>
        <Text style={styles.info}><Text style={styles.label}>Blood group:</Text> {item.bloodGroup || 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Units:</Text> {item.units ?? 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Hospital:</Text> {item.hospital || 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Requester:</Text> {item.requestedBy || 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Date:</Text> {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Not available'}</Text>
      </View>
    </AppCard>
  );

  const renderReservation = (item) => (
    <AppCard key={`history-reservation-${item.id}`} style={styles.card} accent={colors.navy}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kind}>Reservation history</Text>
          <Text style={styles.patient}>{item.patientName || 'Patient not available'}</Text>
        </View>
        <StatusBadge status={item.status || 'Approved'} />
      </View>
      <View style={styles.infoList}>
        <Text style={styles.info}><Text style={styles.label}>Blood group:</Text> {item.bloodGroup || 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Units:</Text> {item.units ?? 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Hospital:</Text> {item.hospital || 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Date:</Text> {item.reservationDate || 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Time:</Text> {item.reservationTime || 'Not available'}</Text>
      </View>
    </AppCard>
  );

  const selectedList = tab === 'emergency' ? requests : reservations;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="History" subtitle="Completed emergency and reservation activity" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.tabs}>
          <AppButton variant={tab === 'emergency' ? 'primary' : 'secondary'} onPress={() => setTab('emergency')} style={styles.tabButton}>Emergency history</AppButton>
          <AppButton variant={tab === 'reservation' ? 'primary' : 'secondary'} onPress={() => setTab('reservation')} style={styles.tabButton}>Reservation history</AppButton>
        </View>

        {loading ? (
          <LoadingView label="Loading history..." />
        ) : selectedList.length === 0 ? (
          <AppCard>
            <EmptyState title={tab === 'emergency' ? 'No emergency history' : 'No reservation history'} message={tab === 'emergency' ? 'Completed emergency requests will appear here.' : 'Completed reservations will appear here.'} />
          </AppCard>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
            {tab === 'emergency' ? requests.map(renderEmergency) : reservations.map(renderReservation)}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.canvas },
  container: { flex: 1, padding: spacing.lg },
  tabs: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  tabButton: { flex: 1 },
  card: { marginBottom: spacing.md },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
  kind: { ...typography.label, color: colors.muted, textTransform: 'uppercase' },
  patient: { ...typography.heading, color: colors.navy, marginTop: 4 },
  infoList: { marginBottom: spacing.sm },
  info: { ...typography.caption, color: colors.text, marginBottom: 6 },
  label: { color: colors.muted, fontWeight: '700' },
  listContent: { paddingBottom: spacing.xxl },
});