import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing, typography } from '../../theme/theme';

export default function InfoRow({ label, value }) { return <View style={styles.row}><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value || 'Not available'}</Text></View>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border }, label: { ...typography.caption, color: colors.muted }, value: { ...typography.caption, color: colors.ink, fontWeight: '700', maxWidth: '62%', textAlign: 'right' } });