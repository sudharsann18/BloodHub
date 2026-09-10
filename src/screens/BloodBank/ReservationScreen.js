import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import AppButton from '../../components/common/AppButton';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingView from '../../components/common/LoadingView';
import EmptyState from '../../components/common/EmptyState';
import { getReservations, approveReservation } from '../../services/api';
import { colors, spacing, typography } from '../../theme/theme';

export default function ReservationScreen() {
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await getReservations();
      setReservations(Array.isArray(data) ? data.filter((item) => item.status === 'REQUESTED') : []);
    } catch (error) {
      setReservations([]);
      Alert.alert('Unable to load reservations', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReservations(); }, []);

  const approve = async (id) => {
    try {
      await approveReservation(id);
      Alert.alert('Success', 'Reservation approved successfully.');
      await loadReservations();
    } catch (error) {
      Alert.alert('Unable to approve reservation', error?.response?.data?.message || 'Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Reservations" subtitle="Reservation requests for this blood bank" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        {loading ? (
          <LoadingView label="Loading reservations..." />
        ) : reservations.length === 0 ? (
          <AppCard><EmptyState title="No reservations" message="There are no blood reservation requests right now." /></AppCard>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
            {reservations.map((item) => (
              <AppCard key={`reservation-${item.id}`} style={styles.card} accent={colors.navy}>
                <View style={styles.headerRow}>
                  <View>
                    <Text style={styles.kind}>Blood reservation</Text>
                    <Text style={styles.patientName}>{item.patientName || 'Patient not available'}</Text>
                  </View>
                  <StatusBadge status={item.status || 'Pending'} />
                </View>
                <View style={styles.infoList}>
                  <Text style={styles.info}><Text style={styles.label}>Blood group:</Text> {item.bloodGroup || 'Not available'}</Text>
                  <Text style={styles.info}><Text style={styles.label}>Units:</Text> {item.units ?? 'Not available'}</Text>
                  <Text style={styles.info}><Text style={styles.label}>Hospital:</Text> {item.hospital || 'Not available'}</Text>
                  <Text style={styles.info}><Text style={styles.label}>Date:</Text> {item.reservationDate || 'Not available'}</Text>
                  <Text style={styles.info}><Text style={styles.label}>Time:</Text> {item.reservationTime || 'Not available'}</Text>
                  <Text style={styles.info}><Text style={styles.label}>Status:</Text> {item.status || 'Requested'}</Text>
                </View>
                {item.status === 'REQUESTED' ? (
                  <AppButton icon="check" onPress={() => approve(item.id)}>Approve reservation</AppButton>
                ) : (
                  <AppButton variant="secondary" icon="information-outline" onPress={() => Alert.alert('Reservation details', `${item.patientName || 'Patient'} • ${item.bloodGroup || 'Blood group'} • ${item.units ?? '0'} units`)}>View details</AppButton>
                )}
              </AppCard>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.canvas },
  container: { flex: 1, padding: spacing.lg },
  listContent: { paddingBottom: spacing.xxl },
  card: { marginBottom: spacing.md },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
  kind: { ...typography.label, color: colors.muted, textTransform: 'uppercase' },
  patientName: { ...typography.heading, color: colors.navy, marginTop: 4 },
  infoList: { marginBottom: spacing.md },
  info: { ...typography.caption, color: colors.text, marginBottom: 6 },
  label: { color: colors.muted, fontWeight: '700' },
});