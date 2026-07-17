import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import { colors } from '../constants/colors';
import { borderRadius, spacing } from '../constants/theme';

const BloodGroupDropdown = ({
  label = 'Blood Group',
  value,
  onSelect,
  options = [],
  style,
}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={[styles.container, style]}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setVisible(true)}
            style={styles.button}
            contentStyle={styles.buttonContent}
            textColor={colors.primaryRed}
            buttonColor={colors.white}
          >
            {value || label}
          </Button>
        }
      >
        {options.map((option) => (
          <Menu.Item
            key={option}
            onPress={() => {
              onSelect?.(option);
              setVisible(false);
            }}
            title={option}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    borderRadius: borderRadius.md,
    borderColor: colors.lightRed,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
});

export default BloodGroupDropdown;
