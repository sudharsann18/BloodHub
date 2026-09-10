import React from 'react';
import { TextInput } from 'react-native-paper';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../constants/theme';

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  left,
  right,
  secureTextEntry = false,
  multiline = false,
  keyboardType = 'default',
  style,
  ...props
}) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    mode="outlined"
    secureTextEntry={secureTextEntry}
    multiline={multiline}
    keyboardType={keyboardType}
    left={left}
    right={right}
    outlineColor={colors.border}
    activeOutlineColor={colors.red}
    textColor={colors.text}
    placeholderTextColor={colors.muted}
    selectionColor={colors.red}
    style={[
      {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.md,
      },
      style,
    ]}
    contentStyle={{ paddingVertical: spacing.sm }}
    theme={{
      colors: {
        primary: colors.red,
        placeholder: colors.muted,
        text: colors.text,
        background: colors.surface,
        onSurfaceVariant: colors.text,
      },
    }}
    {...props}
  />
);

export default InputField;
