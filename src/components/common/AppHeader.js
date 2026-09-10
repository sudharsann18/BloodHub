import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, typography } from '../../theme/theme';

export default function AppHeader({ title, subtitle, onBack, actionIcon, onAction }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack} style={styles.iconButton}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.ink} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {actionIcon ? (
        <TouchableOpacity accessibilityRole="button" onPress={onAction} style={styles.iconButton}>
          <MaterialCommunityIcons name={actionIcon} size={22} color={colors.ink} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', minHeight: 56, marginBottom: spacing.lg },
  copy: { flex: 1, marginHorizontal: spacing.sm },
  title: { ...typography.title, color: colors.navy },
  subtitle: { ...typography.caption, color: colors.muted, marginTop: 2 },
  iconButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});