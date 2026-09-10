import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../components/InputField';
import BloodGroupSelector from '../../components/common/BloodGroupSelector';
import { bloodGroups } from '../../constants/bloodGroups';
import AppCard from '../../components/common/AppCard';
import AppButton from '../../components/common/AppButton';
import SectionHeader from '../../components/common/SectionHeader';
import StatusBadge from '../../components/common/StatusBadge';
import ThemeToggle from '../../components/common/ThemeToggle';
import { colors, spacing, typography, theme } from '../../theme/theme';

export default function UserHomeScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [units, setUnits] = useState('');
  React.useEffect(() => { AsyncStorage.getItem('name').then(value => setName(value || 'there')); }, []);
  const search = () => navigation.navigate('Search', { bloodGroup: group, units });
  return <SafeAreaView style={styles.safeArea}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
    <View style={styles.header}><View style={styles.headerCopy}><Text style={styles.eyebrow}>BLOODHUB</Text><Text style={styles.greeting}>Hello, {name}</Text><Text style={styles.subtitle}>Find blood. Get help when you need it.</Text></View><View style={styles.headerActions}><ThemeToggle compact /><TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.icon}><MaterialCommunityIcons name="bell-outline" size={22} color={colors.navy} /></TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('Profile')}><Avatar.Text size={42} label={String(name).slice(0, 1).toUpperCase()} color={colors.white} style={styles.avatar} /></TouchableOpacity></View></View>
    <AppCard style={styles.sosCard} accent={colors.red}><View style={styles.sosIcon}><MaterialCommunityIcons name="alert-octagon-outline" size={25} color={colors.red} /></View><Text style={styles.sosTitle}>Need blood urgently?</Text><Text style={styles.sosText}>Broadcast an emergency request to eligible donors.</Text><AppButton variant="danger" icon="broadcast" onPress={() => navigation.navigate('SOS')}>Request blood now</AppButton></AppCard>
    <SectionHeader title="Find blood" /><AppCard><BloodGroupSelector label="Blood group" value={group} onSelect={setGroup} options={bloodGroups} /><InputField label="Units required" value={units} onChangeText={setUnits} keyboardType="numeric" placeholder="Enter units" style={styles.field} /><AppButton onPress={search} style={styles.searchButton}>Search available blood</AppButton></AppCard>
    <SectionHeader title="Quick actions" /><View style={styles.actions}>{[['Search', 'magnify', () => navigation.navigate('Search')], ['Requests', 'clipboard-text-outline', () => navigation.navigate('Requests')], ['SOS', 'alarm-light-outline', () => navigation.navigate('SOS')], ['Profile', 'account-outline', () => navigation.navigate('Profile')]].map(([label, icon, onPress]) => <TouchableOpacity key={label} onPress={onPress} style={styles.action}><MaterialCommunityIcons name={icon} size={23} color={colors.red} /><Text style={styles.actionText}>{label}</Text></TouchableOpacity>)}</View>
    <SectionHeader title="Availability" action="View search" onAction={() => navigation.navigate('Search')} /><AppCard><View style={styles.availability}><View><Text style={styles.availabilityTitle}>Live inventory</Text><Text style={styles.availabilityText}>Availability is loaded from participating blood banks.</Text></View><StatusBadge status="Available" /></View></AppCard>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: colors.canvas }, container: { padding: spacing.lg, paddingBottom: 40 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.xl }, headerCopy: { flex: 1, paddingRight: spacing.sm }, eyebrow: { ...typography.label, color: colors.red, letterSpacing: 1.5 }, greeting: { ...typography.display, color: colors.navy, marginTop: 6 }, subtitle: { ...typography.body, color: colors.muted, marginTop: 4, maxWidth: 245 }, headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, icon: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border }, avatar: { backgroundColor: colors.navy }, sosCard: { marginBottom: spacing.xl, backgroundColor: colors.redSoft }, sosIcon: { width: 46, height: 46, borderRadius: 12, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md }, sosTitle: { ...typography.title, color: colors.navy }, sosText: { ...typography.body, color: colors.muted, marginTop: 4, marginBottom: spacing.lg }, field: { marginTop: spacing.md }, searchButton: { marginTop: spacing.lg }, actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.xl }, action: { width: '47%', minHeight: 76, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: theme.radius.md, padding: spacing.md, justifyContent: 'space-between' }, actionText: { ...typography.caption, color: colors.navy, fontWeight: '700' }, availability: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, availabilityTitle: { ...typography.heading, color: colors.navy }, availabilityText: { ...typography.caption, color: colors.muted, marginTop: 4, maxWidth: 220 } });
