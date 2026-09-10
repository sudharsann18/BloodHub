import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { colors, spacing, theme } from '../../theme/theme';

export default function AppButton({ children, variant = 'primary', icon, loading, disabled, onPress, style }) {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const isSecondary = variant === 'secondary';
  const isText = variant === 'text';

  return (
    <Button
      mode={isText ? 'text' : isSecondary ? 'outlined' : 'contained'}
      icon={icon}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      buttonColor={isDanger ? colors.redDark : isPrimary || !isSecondary ? colors.red : 'transparent'}
      textColor={isText ? colors.red : isPrimary || isDanger ? colors.white : colors.red}
      style={[styles.button, isSecondary && styles.outlinedButton, isText && styles.textButton, style]}
      contentStyle={styles.content}
      labelStyle={styles.label}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: theme.radius.sm, minHeight: 48, marginVertical: 4 },
  outlinedButton: { borderWidth: 1, borderColor: colors.border },
  textButton: { minHeight: 32 },
  content: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  label: { fontWeight: '700' },
});