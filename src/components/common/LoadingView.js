import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '../../theme/theme';

export default function LoadingView({ label = 'Loading...' }) { return <View style={styles.container}><ActivityIndicator color={colors.red} size="large" /><Text style={styles.label}>{label}</Text></View>; }
const styles = StyleSheet.create({ container: { flex: 1, minHeight: 180, alignItems: 'center', justifyContent: 'center' }, label: { color: colors.muted, marginTop: spacing.md } });