import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getInventory, updateInventory } from '../../services/api';
import AppHeader from '../../components/common/AppHeader';
import AppCard from '../../components/common/AppCard';
import AppButton from '../../components/common/AppButton';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingView from '../../components/common/LoadingView';
import EmptyState from '../../components/common/EmptyState';
import { colors, spacing, typography } from '../../theme/theme';

export default function InventoryScreen() {
  const navigation = useNavigation();
  const [inventory, setInventory] = useState([]);
  const [editing, setEditing] = useState(null);
  const [units, setUnits] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const load = async () => { setLoading(true); try { const data = await getInventory(); setInventory(Array.isArray(data) ? data : []); } catch { Alert.alert('Unable to load inventory', 'Please try again.'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const save = async () => { const value = Number(units); if (!editing || !Number.isFinite(value) || value < 0) { Alert.alert('Invalid units', 'Enter a number greater than or equal to zero.'); return; } setSaving(true); try { await updateInventory(editing.bloodGroup, value); setEditing(null); setUnits(''); await load(); Alert.alert('Inventory updated', `${editing.bloodGroup} stock was updated.`); } catch (error) { Alert.alert('Unable to update inventory', error.response?.data?.message || 'Please try again.'); } finally { setSaving(false); } };
  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.container}><AppHeader title="Inventory" subtitle="Manage your blood bank stock" onBack={() => navigation.goBack()} actionIcon="refresh" onAction={load} />{loading ? <LoadingView label="Loading inventory..." /> : inventory.length === 0 ? <AppCard><EmptyState title="No inventory records" message="Inventory records will appear here when available." /></AppCard> : inventory.map(item => <AppCard key={item.id || item.bloodGroup} style={styles.card}><View style={styles.row}><View style={styles.groupIcon}><MaterialCommunityIcons name="water" size={22} color={colors.red} /></View><View style={styles.copy}><Text style={styles.group}>{item.bloodGroup || 'Not available'}</Text><Text style={styles.units}>{item.units} units in stock</Text></View><StatusBadge status={Number(item.units) > 0 ? 'Available' : 'Inactive'} /></View>{editing?.bloodGroup === item.bloodGroup ? <View style={styles.editor}><Text style={styles.inputLabel}>Current units</Text><TextInput value={units} onChangeText={setUnits} keyboardType="numeric" style={styles.input} /><View style={styles.actions}><AppButton loading={saving} disabled={saving} onPress={save} style={styles.actionButton}>Save</AppButton><AppButton variant="secondary" disabled={saving} onPress={() => { setEditing(null); setUnits(''); }} style={styles.actionButton}>Cancel</AppButton></View></View> : <TouchableOpacity style={styles.update} onPress={() => { setEditing(item); setUnits(String(item.units ?? '')); }}><Text style={styles.updateText}>Update stock</Text><MaterialCommunityIcons name="pencil-outline" size={18} color={colors.red} /></TouchableOpacity>}</AppCard>)}</ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: colors.canvas }, container: { padding: spacing.lg, paddingBottom: spacing.xxl }, card: { marginBottom: spacing.md }, row: { flexDirection: 'row', alignItems: 'center' }, groupIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.redSoft, alignItems: 'center', justifyContent: 'center' }, copy: { flex: 1, marginHorizontal: spacing.md }, group: { ...typography.title, color: colors.navy }, units: { ...typography.caption, color: colors.muted, marginTop: 3 }, update: { marginTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, updateText: { ...typography.body, color: colors.red, fontWeight: '700' }, editor: { marginTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md }, inputLabel: { ...typography.label, color: colors.muted, marginBottom: spacing.sm }, input: { height: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: spacing.md, color: colors.ink, backgroundColor: colors.canvas, fontSize: 16 }, actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }, actionButton: { flex: 1 } });
