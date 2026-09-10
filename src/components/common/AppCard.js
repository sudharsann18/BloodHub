import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, theme } from '../../theme/theme';

export default function AppCard({ children, style, accent }) {
  return <View style={[styles.card, accent ? { borderLeftColor: accent, borderLeftWidth: 4 } : null, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: theme.radius.md, padding: theme.spacing.lg, borderWidth: 1, borderColor: colors.border, ...theme.shadow },
});