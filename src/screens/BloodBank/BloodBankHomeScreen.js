import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function BloodBankHomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        🩸 Blood Bank Dashboard
      </Text>

      {/* Blood Requests */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("BloodRequests Pressed");
          navigation.navigate("BloodRequests");
        }}
      >
        <Text style={styles.cardTitle}>
          📋 Blood Requests
        </Text>

        <Text style={styles.cardSubtitle}>
          View and accept incoming blood requests
        </Text>
      </TouchableOpacity>

      {/* Inventory */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("Inventory Pressed");
          navigation.navigate("Inventory");
        }}
      >
        <Text style={styles.cardTitle}>
          📦 Inventory
        </Text>

        <Text style={styles.cardSubtitle}>
          Manage blood stock
        </Text>
      </TouchableOpacity>

      {/* Reservations */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("Reservations Pressed");
          navigation.navigate("Reservations");
        }}
      >
        <Text style={styles.cardTitle}>
          📅 Reservations
        </Text>

        <Text style={styles.cardSubtitle}>
          View scheduled reservations
        </Text>
      </TouchableOpacity>

      {/* History */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("History Pressed");
          navigation.navigate("History");
        }}
      >
        <Text style={styles.cardTitle}>
          📜 History
        </Text>

        <Text style={styles.cardSubtitle}>
          Completed requests
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C62828',
  },

  cardSubtitle: {
    marginTop: 8,
    color: '#666',
    fontSize: 15,
  },

});