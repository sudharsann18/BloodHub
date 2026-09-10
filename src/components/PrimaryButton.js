import React from 'react';
import { Button } from 'react-native-paper';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../constants/theme';

const PrimaryButton = ({
  label,
  onPress,
  mode = 'contained',
  disabled = false,
  loading = false,
  icon,
  style,
  ...props
}) => (
  <Button
    mode={mode}
    onPress={onPress}
    disabled={disabled}
    loading={loading}
    icon={icon}
    buttonColor={mode === 'contained' ? colors.red : colors.surface}
    textColor={mode === 'contained' ? colors.white : colors.red}
    style={[{ borderRadius: borderRadius.md, overflow: 'hidden' }, style]}
    contentStyle={{ paddingVertical: spacing.sm }}
    {...props}
  >
    {label}
  </Button>
);

export default PrimaryButton;
