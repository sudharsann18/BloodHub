import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { colors } from '../constants/colors';
import { borderRadius, shadows, spacing } from '../constants/theme';

const SOSCard = ({ title, subtitle, onPress, actionLabel, icon }) => (
  <Card style={styles.card} onPress={onPress}>
    <Card.Content style={styles.content}>
      <View style={styles.left}>
        <View style={styles.iconWrap}>{icon}</View>
        <View style={styles.textWrap}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {actionLabel ? <Text style={styles.action}>{actionLabel}</Text> : null}
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    ...shadows.small,
    marginBottom: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lightRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: colors.black,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.gray,
    marginTop: spacing.xs / 2,
  },
  action: {
    color: colors.primaryRed,
    fontWeight: '600',
  },
});

export default SOSCard;
