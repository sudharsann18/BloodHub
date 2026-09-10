import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getInventory, getAllRequests, getReservations } from '../../services/api';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import AppButton from '../../components/common/AppButton';
import LoadingView from '../../components/common/LoadingView';
import EmptyState from '../../components/common/EmptyState';
import ThemeToggle from '../../components/common/ThemeToggle';
import { colors, spacing, typography, theme } from '../../theme/theme';

export default function BloodBankHomeScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('Blood bank');
  const [data, setData] = useState({ inventory: [], requests: [], reservations: [] });
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const [inventory, requests, reservations] = await Promise.all([getInventory(), getAllRequests(), getReservations()]);
      setData({ inventory: Array.isArray(inventory) ? inventory : [], requests: Array.isArray(requests) ? requests : [], reservations: Array.isArray(reservations) ? reservations : [] });
      const storedName = await AsyncStorage.getItem('name');
      setName(storedName || 'Blood bank');
    } catch { setData({ inventory: [], requests: [], reservations: [] }); } finally { setLoading(false); }
  }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));
  if (loading) return <SafeAreaView style={styles.safeArea}><LoadingView label="Loading dashboard..." /></SafeAreaView>;
  const totalUnits = data.inventory.reduce((sum, item) => sum + (Number(item.units) || 0), 0);
  const groups = new Set(data.inventory.filter(item => Number(item.units) > 0).map(item => item.bloodGroup)).size;
  const pending = data.requests.filter(item => item.status === 'REQUESTED').length + data.reservations.filter(item => item.status === 'REQUESTED').length;
  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.container}><AppHeader title="Blood bank dashboard" subtitle={name} actionIcon="account-outline" onAction={() => navigation.navigate('Profile')} /><View style={styles.headerTheme}><ThemeToggle compact /></View><AppCard style={styles.banner} accent={colors.navy}><Text style={styles.bannerLabel}>OPERATIONS OVERVIEW</Text><Text style={styles.bannerTitle}>Keep every unit accounted for.</Text><Text style={styles.bannerText}>Monitor stock and respond to incoming patient requests.</Text></AppCard><Text style={styles.sectionTitle}>Today at a glance</Text><View style={styles.stats}>{[['Total units', totalUnits, 'blood-bag-outline'], ['Groups active', groups, 'water-outline'], ['Pending', pending, 'clock-outline']].map(([label, value, icon]) => <AppCard key={label} style={styles.stat}><MaterialCommunityIcons name={icon} size={21} color={colors.red} /><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></AppCard>)}</View><Text style={styles.sectionTitle}>Manage operations</Text><View style={styles.menu}>{[['Inventory', 'view-grid-outline', 'Manage blood stock'], ['Requests', 'clipboard-alert-outline', 'Review patient requests'], ['Reservations', 'calendar-clock-outline', 'Approve scheduled reservations'], ['History', 'history', 'Review completed activity']].map(([label, icon, description]) => <TouchableOpacity key={label} onPress={() => navigation.navigate(label === 'Inventory' ? 'Inventory' : label === 'Requests' ? 'BloodRequests' : label === 'Reservations' ? 'Reservations' : 'History')} style={styles.menuItem}><View style={styles.menuIcon}><MaterialCommunityIcons name={icon} size={22} color={colors.red} /></View><View style={styles.menuCopy}><Text style={styles.menuTitle}>{label}</Text><Text style={styles.menuDescription}>{description}</Text></View><MaterialCommunityIcons name="chevron-right" size={22} color={colors.muted} /></TouchableOpacity>)}</View><AppButton variant="secondary" onPress={load} style={styles.refresh}>Refresh dashboard</AppButton></ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: colors.canvas }, container: { padding: spacing.lg, paddingBottom: spacing.xxl }, headerTheme: { marginTop: -spacing.sm, marginBottom: spacing.md }, banner: { backgroundColor: colors.navy, marginBottom: spacing.xl }, bannerLabel: { ...typography.label, color: '#B8C7DD' }, bannerTitle: { ...typography.title, color: colors.white, marginTop: spacing.sm }, bannerText: { ...typography.body, color: '#D9E2F0', marginTop: spacing.sm }, sectionTitle: { ...typography.heading, color: colors.navy, marginBottom: spacing.md }, stats: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl }, stat: { flex: 1, padding: spacing.md }, statValue: { ...typography.title, color: colors.navy, marginTop: spacing.md }, statLabel: { ...typography.caption, color: colors.muted, marginTop: 3 }, menu: { backgroundColor: colors.white, borderRadius: theme.radius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg }, menuItem: { minHeight: 76, flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }, menuIcon: { width: 42, height: 42, borderRadius: 10, backgroundColor: colors.redSoft, alignItems: 'center', justifyContent: 'center' }, menuCopy: { flex: 1, marginHorizontal: spacing.md }, menuTitle: { ...typography.heading, color: colors.navy }, menuDescription: { ...typography.caption, color: colors.muted, marginTop: 2 }, refresh: { marginTop: spacing.sm } });
