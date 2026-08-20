import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Alert,
} from "react-native";
import { Card, Text, Button, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import {
  getReservations,
  approveReservation,
} from "../../services/api";

export default function ReservationScreen() {
  const navigation = useNavigation();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReservations = async () => {
    try {
      setLoading(true);

      const data = await getReservations();

      console.log("BLOOD BANK RESERVATIONS:", data);

      setReservations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(
        "Reservation loading error:",
        error?.response?.data || error
      );

      Alert.alert(
        "Error",
        "Failed to load blood bank reservations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const approve = async (id) => {
    try {
      await approveReservation(id);

      Alert.alert(
        "Success",
        "Reservation approved successfully"
      );

      await loadReservations();

    } catch (error) {
      console.log(
        "Approve reservation error:",
        error?.response?.data || error
      );

      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          "Unable to approve reservation"
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Loading reservations...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        ← Back
      </Button>

      <Text style={styles.title}>
        📅 Blood Reservations
      </Text>

      <Text style={styles.subtitle}>
        Reservations received by this blood bank
      </Text>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No reservations found
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>

              <Text style={styles.patient}>
                👤 {item.patientName}
              </Text>

              <InfoRow
                label="Blood Group"
                value={item.bloodGroup}
              />

              <InfoRow
                label="Units"
                value={String(item.units)}
              />

              <InfoRow
                label="Hospital"
                value={item.hospital}
              />

              <InfoRow
                label="Location"
                value={item.location}
              />

              <InfoRow
                label="Contact"
                value={item.contactNumber}
              />

              <InfoRow
                label="Date"
                value={item.reservationDate}
              />

              <InfoRow
                label="Time"
                value={item.reservationTime}
              />

              <InfoRow
                label="Status"
                value={item.status}
              />

              {item.status === "REQUESTED" && (
                <Button
                  mode="contained"
                  style={styles.approveButton}
                  onPress={() => approve(item.id)}
                >
                  Approve Reservation
                </Button>
              )}

            </Card.Content>
          </Card>
        )}
      />

    </SafeAreaView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  loadingText: {
    marginTop: 10,
    color: "#666",
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#C62828",
  },

  subtitle: {
    color: "#666",
    marginBottom: 15,
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    marginBottom: 15,
    borderRadius: 12,
    elevation: 4,
  },

  patient: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#C62828",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  label: {
    color: "#666",
    fontWeight: "600",
  },

  value: {
    fontWeight: "700",
    maxWidth: "65%",
    textAlign: "right",
  },

  approveButton: {
    marginTop: 15,
    backgroundColor: "#C62828",
  },

  empty: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    color: "#666",
  },

});