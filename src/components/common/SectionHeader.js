import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing, typography } from '../../theme/theme';

export default function SectionHeader({ title, action, onAction }) {
  return <View style={styles.row}><Text style={styles.title}>{title}</Text>{action ? <Text onPress={onAction} style={styles.action}>{action}</Text> : null}</View>;
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md }, title: { ...typography.heading, color: colors.navy }, action: { ...typography.caption, color: colors.red, fontWeight: '700' } });