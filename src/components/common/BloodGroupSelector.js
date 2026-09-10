import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { bloodGroups } from '../../constants/bloodGroups';
import { colors } from '../../constants/colors';
import { borderRadius, shadows, spacing } from '../../constants/theme';

export default function BloodGroupSelector({
  label = 'Blood Group',
  value,
  onSelect,
  options = bloodGroups,
  style,
}) {
  const [visible, setVisible] = useState(false);

  const selectGroup = (group) => {
    onSelect?.(group);
    setVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={() => setVisible(true)}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>{value || label}</Text>
        <Text style={styles.chevron}>▾</Text>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable style={styles.backdrop} onPress={() => setVisible(false)} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(group) => group}
              renderItem={({ item }) => (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ selected: item === value }}
                  onPress={() => selectGroup(item)}
                  style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
                >
                  <Text style={[styles.optionText, item === value && styles.selectedOptionText]}>
                    {item}
                  </Text>
                  {item === value ? <Text style={styles.checkmark}>✓</Text> : null}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    minHeight: 50,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.lightRed,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonPressed: {
    backgroundColor: colors.lightRed,
  },
  buttonText: {
    color: colors.primaryRed,
    fontSize: 16,
    fontWeight: '600',
  },
  chevron: {
    color: colors.primaryRed,
    fontSize: 20,
    lineHeight: 20,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    maxHeight: '80%',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
  },
  modalTitle: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
  },
  option: {
    minHeight: 48,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionPressed: {
    backgroundColor: colors.lightRed,
  },
  optionText: {
    color: colors.black,
    fontSize: 16,
  },
  selectedOptionText: {
    color: colors.primaryRed,
    fontWeight: '700',
  },
  checkmark: {
    color: colors.primaryRed,
    fontSize: 18,
    fontWeight: '700',
  },
});