import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import api from '../../services/api';
import BloodGroupSelector from '../../components/common/BloodGroupSelector';
import InputField from '../../components/InputField';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import AppButton from '../../components/common/AppButton';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingView from '../../components/common/LoadingView';
import EmptyState from '../../components/common/EmptyState';
import { bloodGroups } from '../../constants/bloodGroups';
import { colors, spacing, typography } from '../../theme/theme';

export default function MapScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [group, setGroup] = useState(route.params?.bloodGroup || '');
  const [units, setUnits] = useState(route.params?.units ? String(route.params.units) : '');
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (route.params?.bloodGroup) { setGroup(route.params.bloodGroup); setUnits(String(route.params.units || '')); search(route.params.bloodGroup, route.params.units); }
  }, [route.params?.bloodGroup]);

  async function search(selectedGroup = group, selectedUnits = units) {
    const requiredUnits = Number(selectedUnits);
    if (!selectedGroup || !Number.isFinite(requiredUnits) || requiredUnits <= 0) { setSearched(true); setBanks([]); return; }
    setLoading(true); setError(false); setSearched(true);
    try {
      const response = await api.get('/inventory');
      const inventory = Array.isArray(response.data) ? response.data : [];
      const bankMap = {};
      inventory.filter(item => item.bloodGroup === selectedGroup && Number(item.units) >= requiredUnits && item.bloodBankId != null).forEach(item => {
        const key = String(item.bloodBankId);
        if (!bankMap[key]) bankMap[key] = { id: key, name: item.bloodBankName, bloodBankId: item.bloodBankId, bloodTypes: [], units: 0 };
        bankMap[key].bloodTypes.push(item.bloodGroup);
        bankMap[key].units += Number(item.units) || 0;
      });
      setBanks(Object.values(bankMap));
    } catch { setBanks([]); setError(true); } finally { setLoading(false); }
  }

  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.container}><AppHeader title="Find blood" subtitle="Search live inventory from participating blood banks" />
    <AppCard style={styles.form}><BloodGroupSelector label="Blood group" value={group} onSelect={setGroup} options={bloodGroups} /><InputField label="Units required" value={units} onChangeText={setUnits} keyboardType="numeric" placeholder="Enter units" style={styles.field} /><AppButton icon="magnify" onPress={() => search()}>Search blood</AppButton></AppCard>
    {loading ? <LoadingView label="Searching available inventory..." /> : error ? <AppCard><EmptyState title="Unable to search inventory" message="Please try again in a moment." /></AppCard> : !searched ? <AppCard><EmptyState title="Start a blood search" message="Select a blood group and enter the number of units you need." /></AppCard> : banks.length === 0 ? <AppCard><EmptyState title="No blood banks found" message="No participating blood bank currently has enough stock for this search." /></AppCard> : <View><Text style={styles.resultTitle}>{banks.length} blood bank{banks.length === 1 ? '' : 's'} found</Text>{banks.map(bank => <AppCard key={bank.id} style={styles.resultCard}><View style={styles.bankHeader}><View style={styles.bankIcon}><MaterialCommunityIcons name="hospital-building" size={22} color={colors.red} /></View><View style={styles.bankCopy}><Text style={styles.bankName}>{bank.name || 'Blood bank name unavailable'}</Text><Text style={styles.location}>Location not available</Text></View><StatusBadge status="Available" /></View><View style={styles.stockRow}><Text style={styles.bloodType}>{bank.bloodTypes.join(', ')}</Text><Text style={styles.unitsText}>{bank.units} units</Text></View><AppButton variant="secondary" onPress={() => navigation.navigate('Home', { screen: 'BloodBankDetails', params: { bank, requestedGroup: group, requestedUnits: Number(units) } })}>View details</AppButton></AppCard>)}</View>}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: colors.canvas }, container: { padding: spacing.lg, paddingBottom: spacing.xxl }, form: { marginBottom: spacing.xl }, field: { marginVertical: spacing.md }, resultTitle: { ...typography.heading, color: colors.navy, marginBottom: spacing.md }, resultCard: { marginBottom: spacing.md }, bankHeader: { flexDirection: 'row', alignItems: 'center' }, bankIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.redSoft, alignItems: 'center', justifyContent: 'center' }, bankCopy: { flex: 1, marginHorizontal: spacing.md }, bankName: { ...typography.heading, color: colors.navy }, location: { ...typography.caption, color: colors.muted, marginTop: 2 }, stockRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: spacing.lg, paddingVertical: spacing.md, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }, bloodType: { ...typography.heading, color: colors.red }, unitsText: { ...typography.body, color: colors.ink, fontWeight: '700' } });
