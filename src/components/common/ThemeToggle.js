import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeMode } from '../../theme/ThemeContext';
import { colors, spacing, typography } from '../../theme/theme';

export default function ThemeToggle({ compact = false }) {
  const { setMode, isDark } = useThemeMode();

  if (compact) {
    return (
      <View style={styles.compactRow}>
        <Text style={styles.compactLabel}>Appearance</Text>
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMode('light')}
            style={[styles.modeOption, !isDark && styles.modeOptionActive]}
          >
            <Text style={[styles.modeText, !isDark && styles.modeTextActive]}>☀ Light</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMode('dark')}
            style={[styles.modeOption, isDark && styles.modeOptionActiveDark]}
          >
            <Text style={[styles.modeText, isDark && styles.modeTextActiveDark]}>🌙 Dark</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.label}>Appearance</Text>
        <Text style={styles.value}>{isDark ? 'Dark mode' : 'Light mode'}</Text>
      </View>
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setMode('light')}
          style={[styles.modeOption, !isDark && styles.modeOptionActive]}
        >
          <Text style={[styles.modeText, !isDark && styles.modeTextActive]}>☀</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setMode('dark')}
          style={[styles.modeOption, isDark && styles.modeOptionActiveDark]}
        >
          <Text style={[styles.modeText, isDark && styles.modeTextActiveDark]}>🌙</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  copy: {
    flex: 1,
  },
  label: {
    ...typography.heading,
    color: colors.text,
  },
  compactLabel: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    ...typography.caption,
    color: colors.secondaryText,
    marginTop: 2,
  },
  segmentedControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.graySoft,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 3,
  },
  modeOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  modeOptionActive: {
    backgroundColor: colors.white,
  },
  modeOptionActiveDark: {
    backgroundColor: colors.surface,
  },
  modeText: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '700',
  },
  modeTextActive: {
    color: colors.red,
  },
  modeTextActiveDark: {
    color: colors.red,
  },
});
