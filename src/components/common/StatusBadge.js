import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, typography } from '../../theme/theme';

export default function StatusBadge({ status }) {
  const value = String(status || 'NOT AVAILABLE').replace('_', ' ');
  const normalized = value.toLowerCase();
  const tone = normalized.includes('complete') || normalized.includes('approved') || normalized.includes('accept') || normalized.includes('available')
    ? 'green'
    : normalized.includes('pending') || normalized.includes('requested') || normalized.includes('waiting')
      ? 'orange'
      : normalized.includes('reject') || normalized.includes('cancel') || normalized.includes('critical')
        ? 'red'
        : 'gray';
  return <View style={[styles.badge, styles[`${tone}Bg`]]}><Text style={[styles.text, styles[`${tone}Text`]]}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 5 },
  text: { ...typography.label },
  greenBg: { backgroundColor: colors.successSoft }, greenText: { color: colors.success },
  orangeBg: { backgroundColor: colors.warningSoft }, orangeText: { color: colors.warning },
  redBg: { backgroundColor: colors.redSoft }, redText: { color: colors.redDark },
  grayBg: { backgroundColor: colors.graySoft }, grayText: { color: colors.muted },
});