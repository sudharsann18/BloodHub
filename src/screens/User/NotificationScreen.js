import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getAvailableSOS } from '../../services/api';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingView from '../../components/common/LoadingView';
import EmptyState from '../../components/common/EmptyState';
import { colors, spacing, typography } from '../../theme/theme';

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => { setLoading(true); try { const token = await AsyncStorage.getItem('token'); const data = await getAvailableSOS(token); setItems(Array.isArray(data) ? data : []); } catch { setItems([]); } finally { setLoading(false); } }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));
  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.container}><AppHeader title="Notifications" subtitle="Emergency requests available to donors" actionIcon="refresh" onAction={load} />{loading ? <LoadingView label="Checking for emergency requests..." /> : items.length === 0 ? <AppCard><EmptyState title="No notifications yet" message="New eligible emergency requests will appear here." /></AppCard> : items.map(item => <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Home', { screen: 'SOSResponse', params: item })}><AppCard style={styles.card} accent={colors.red}><View style={styles.header}><View style={styles.icon}><MaterialCommunityIcons name="alert-outline" size={23} color={colors.red} /></View><View style={styles.copy}><Text style={styles.title}>Emergency blood request</Text><Text style={styles.meta}>{item.hospital || 'Hospital not available'}</Text></View><StatusBadge status={item.status} /></View><Text style={styles.detail}>{item.bloodGroup || 'Blood group unavailable'}  |  {item.units ?? 'Not available'} units required</Text><Text style={styles.tap}>View request</Text></AppCard></TouchableOpacity>)}</ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: colors.canvas }, container: { padding: spacing.lg, paddingBottom: spacing.xxl }, card: { marginBottom: spacing.md }, header: { flexDirection: 'row', alignItems: 'center' }, icon: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.redSoft, alignItems: 'center', justifyContent: 'center' }, copy: { flex: 1, marginHorizontal: spacing.md }, title: { ...typography.heading, color: colors.navy }, meta: { ...typography.caption, color: colors.muted, marginTop: 2 }, detail: { ...typography.body, color: colors.ink, marginTop: spacing.lg }, tap: { ...typography.caption, color: colors.red, fontWeight: '700', marginTop: spacing.md } });
