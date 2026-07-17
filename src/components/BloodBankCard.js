import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { colors } from '../constants/colors';
import { borderRadius, shadows, spacing } from '../constants/theme';

const BloodBankCard = ({
  title,
  subtitle,
  distance,
  availability,
  bloodGroup,
  onPress,
  style,
}) => (
  <Card style={[styles.card, style]} onPress={onPress}>
    <Card.Content>
      <View style={styles.header}>
        <View style={styles.textWrap}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {distance ? <Text style={styles.distance}>{distance}</Text> : null}
      </View>

      <View style={styles.footer}>
        <Chip style={styles.chip} textStyle={styles.chipText}>
          {availability || 'Available'}
        </Chip>
        {bloodGroup ? (
          <Chip style={styles.groupChip} textStyle={styles.groupChipText}>
            {bloodGroup}
          </Chip>
        ) : null}
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  textWrap: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    color: colors.black,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.gray,
    marginTop: spacing.xs / 2,
  },
  distance: {
    color: colors.primaryRed,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.lightRed,
  },
  chipText: {
    color: colors.primaryRed,
  },
  groupChip: {
    backgroundColor: colors.background,
  },
  groupChipText: {
    color: colors.black,
  },
});

export default BloodBankCard;
