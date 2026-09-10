import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import API from '../../services/api';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import AppButton from '../../components/common/AppButton';
import InfoRow from '../../components/common/InfoRow';
import LoadingView from '../../components/common/LoadingView';
import EmptyState from '../../components/common/EmptyState';
import { colors, spacing, typography } from '../../theme/theme';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const load = useCallback(async () => { setLoading(true); setError(false); try { const token = await AsyncStorage.getItem('token'); const response = await API.get('/user/profile', { headers: { Authorization: `Bearer ${token}` } }); setUser(response.data); } catch { setError(true); } finally { setLoading(false); } }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));
  const logout = async () => { await AsyncStorage.multiRemove(['token', 'role', 'name']); const rootNavigation = navigation.getParent()?.getParent() || navigation.getParent(); rootNavigation?.reset({ index: 0, routes: [{ name: 'Auth' }] }); };
  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.container}><AppHeader title="Profile" subtitle="Your BloodHub account" />{loading ? <LoadingView label="Loading profile..." /> : error ? <AppCard><EmptyState title="Unable to load profile" message="Please try again." /><AppButton variant="secondary" onPress={load}>Try again</AppButton></AppCard> : !user ? <AppCard><EmptyState title="Profile unavailable" /></AppCard> : <><AppCard style={styles.identity}><View style={styles.avatar}><MaterialCommunityIcons name="account-heart-outline" size={31} color={colors.red} /></View><View><Text style={styles.name}>{user.fullName || 'Not available'}</Text><Text style={styles.role}>{String(user.role || 'Account').replace('_', ' ')}</Text></View></AppCard><AppCard><Text style={styles.section}>Account information</Text><InfoRow label="Full name" value={user.fullName} /><InfoRow label="Email" value={user.email} /><InfoRow label="Phone" value={user.phone} /><InfoRow label="Role" value={user.role} /></AppCard><AppButton variant="danger" icon="logout" onPress={logout} style={styles.logout}>Log out</AppButton></>}</ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: colors.canvas }, container: { padding: spacing.lg, paddingBottom: spacing.xxl }, identity: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }, avatar: { width: 62, height: 62, borderRadius: 31, backgroundColor: colors.redSoft, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md }, name: { ...typography.title, color: colors.navy }, role: { ...typography.caption, color: colors.muted, marginTop: spacing.xs }, section: { ...typography.heading, color: colors.navy, marginBottom: spacing.sm }, themeCard: { marginTop: spacing.md, marginBottom: spacing.md }, logout: { marginTop: spacing.lg } });
