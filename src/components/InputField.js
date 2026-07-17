import React from 'react';
import { TextInput } from 'react-native-paper';
import { colors } from '../constants/colors';
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
    outlineColor={colors.lightRed}
    activeOutlineColor={colors.primaryRed}
    textColor={colors.black}
    selectionColor={colors.primaryRed}
    style={[{ backgroundColor: colors.white, borderRadius: borderRadius.md }, style]}
    contentStyle={{ paddingVertical: spacing.sm }}
    theme={{
      colors: {
        primary: colors.primaryRed,
        placeholder: colors.gray,
        text: colors.black,
      },
    }}
    {...props}
  />
);

export default InputField;
