import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import AppButton from '../../components/common/AppButton';
import InfoRow from '../../components/common/InfoRow';
import StatusBadge from '../../components/common/StatusBadge';
import { openMapLocation, openPhoneDialer } from '../../utils/deviceActions';
import { colors, spacing, typography } from '../../theme/theme';

export default function BloodBankDetailsScreen() {
  const navigation = useNavigation();
  const bank = useRoute().params?.bank || {};
  const group = useRoute().params?.requestedGroup;
  const units = useRoute().params?.requestedUnits;
  const goToForm = name => navigation.navigate(name, { hospital: bank.name, bloodBankId: bank.bloodBankId || bank.id, bloodGroup: group, units });
  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.container}><AppHeader title="Blood bank details" onBack={() => navigation.goBack()} /><AppCard style={styles.identity}><View style={styles.icon}><MaterialCommunityIcons name="hospital-building" size={28} color={colors.red} /></View><View><Text style={styles.name}>{bank.name || 'Blood bank name unavailable'}</Text><Text style={styles.meta}>{bank.address || 'Address not available'}</Text></View></AppCard><AppCard><View style={styles.status}><Text style={styles.section}>Availability</Text><StatusBadge status={Number(bank.units) > 0 ? 'Available' : 'Inactive'} /></View><InfoRow label="Requested group" value={group} /><InfoRow label="Requested units" value={units} /><InfoRow label="Available units" value={bank.units} /><InfoRow label="Blood groups" value={bank.bloodTypes?.join(', ')} /><InfoRow label="Phone" value={bank.phone || bank.contactNumber} /><InfoRow label="Location" value={bank.address} /></AppCard><View style={styles.actions}><AppButton variant="secondary" icon="phone-outline" onPress={() => openPhoneDialer(bank.phone || bank.contactNumber, 'Blood bank')}>Call</AppButton><AppButton variant="secondary" icon="map-marker-outline" onPress={() => openMapLocation({ latitude: bank.latitude, longitude: bank.longitude, address: bank.address || bank.name, label: 'Blood bank location' })}>Get directions</AppButton></View><AppButton icon="calendar-plus" onPress={() => goToForm('ReserveBlood')}>Request blood</AppButton><AppButton variant="danger" icon="alert-outline" onPress={() => goToForm('EmergencyBlood')} style={styles.emergency}>Emergency request</AppButton></ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: colors.canvas }, container: { padding: spacing.lg, paddingBottom: spacing.xxl }, identity: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }, icon: { width: 52, height: 52, borderRadius: 14, backgroundColor: colors.redSoft, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }, name: { ...typography.title, color: colors.navy, maxWidth: 250 }, meta: { ...typography.caption, color: colors.muted, marginTop: spacing.xs }, status: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }, section: { ...typography.heading, color: colors.navy }, actions: { flexDirection: 'row', gap: spacing.sm, marginVertical: spacing.md }, emergency: { marginTop: spacing.md } });
