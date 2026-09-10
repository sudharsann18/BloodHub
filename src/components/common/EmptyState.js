import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing, typography } from '../../theme/theme';

export default function EmptyState({ title, message }) { return <View style={styles.container}><Text style={styles.title}>{title}</Text>{message ? <Text style={styles.message}>{message}</Text> : null}</View>; }
const styles = StyleSheet.create({ container: { alignItems: 'center', padding: spacing.xl }, title: { ...typography.heading, color: colors.navy }, message: { ...typography.body, color: colors.muted, textAlign: 'center', marginTop: spacing.sm } });