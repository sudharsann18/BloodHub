import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { colors } from '../constants/colors';
import { spacing } from '../constants/theme';

const Header = ({ title, subtitle, onBackPress, right, style }) => (
  <Appbar.Header style={[styles.header, style]} elevated>
    {onBackPress ? <Appbar.BackAction onPress={onBackPress} color={colors.primaryRed} /> : null}
    <Appbar.Content
      title={title}
      subtitle={subtitle}
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
    />
    {right ? <View style={styles.right}>{right}</View> : null}
  </Appbar.Header>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    elevation: 2,
  },
  title: {
    color: colors.black,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.gray,
    marginTop: spacing.xs / 2,
  },
  right: {
    marginRight: spacing.sm,
  },
});

export default Header;
