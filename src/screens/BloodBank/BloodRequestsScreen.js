import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import AppButton from '../../components/common/AppButton';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingView from '../../components/common/LoadingView';
import EmptyState from '../../components/common/EmptyState';
import { getAllRequests, acceptBloodRequest } from '../../services/api';
import { colors, spacing, typography } from '../../theme/theme';

export default function BloodRequestsScreen() {
  const navigation = useNavigation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const requestData = await getAllRequests();
      setRequests(Array.isArray(requestData) ? requestData.filter((item) => item.status === 'REQUESTED') : []);
    } catch {
      setRequests([]);
      Alert.alert('Unable to load requests', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleAccept = async (id) => {
    try {
      await acceptBloodRequest(id);
      Alert.alert('Success', 'Emergency request accepted.');
      await loadData();
    } catch (error) {
      Alert.alert('Unable to accept request', error?.response?.data?.message || 'Please try again.');
    }
  };

  const renderEmergencyItem = (item) => (
    <AppCard key={`request-${item.id}`} style={styles.card} accent={colors.red}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kind}>Emergency request</Text>
          <Text style={styles.patientName}>{item.patientName || 'Patient not available'}</Text>
        </View>
        <StatusBadge status={item.status || 'Pending'} />
      </View>
      <View style={styles.infoList}>
        <Text style={styles.info}><Text style={styles.label}>Blood group:</Text> {item.bloodGroup || 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Units:</Text> {item.units ?? 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Hospital:</Text> {item.hospital || 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Requester:</Text> {item.requestedBy || 'Not available'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Status:</Text> {item.status || 'Requested'}</Text>
      </View>
      {item.status === 'REQUESTED' ? (
        <AppButton icon="check-circle-outline" onPress={() => handleAccept(item.id)}>Accept request</AppButton>
      ) : (
        <AppButton variant="secondary" icon="information-outline" onPress={() => Alert.alert('Request details', `${item.patientName || 'Patient'} • ${item.bloodGroup || 'Blood group'} • ${item.units ?? '0'} units`)}>View details</AppButton>
      )}
    </AppCard>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Requests" subtitle="Review pending emergency blood requests" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.tabs}>
          <AppButton variant="primary" style={styles.tabButton}>Emergency</AppButton>
        </View>

        {loading ? (
          <LoadingView label="Loading requests..." />
        ) : requests.length === 0 ? (
          <AppCard>
            <EmptyState title="No emergency requests" message="There are no active emergency blood requests right now." />
          </AppCard>
        ) : (
          <View>
            {requests.map(renderEmergencyItem)}
          </View>
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
  patientName: { ...typography.heading, color: colors.navy, marginTop: 4 },
  infoList: { marginBottom: spacing.md },
  info: { ...typography.caption, color: colors.text, marginBottom: 6 },
  label: { color: colors.muted, fontWeight: '700' },
});