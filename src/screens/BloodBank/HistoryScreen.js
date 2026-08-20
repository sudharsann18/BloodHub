import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import {
  getAllRequests,
  getReservations,
} from "../../services/api";

export default function HistoryScreen() {

  const navigation = useNavigation();

  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {

    try {

      const requests = await getAllRequests();
      const reservations = await getReservations();

      const completedRequests = requests
        .filter(item => item.status !== "REQUESTED")
        .map(item => ({
          ...item,
          type: "Emergency Request",
        }));

      const completedReservations = reservations
        .filter(item => item.status !== "REQUESTED")
        .map(item => ({
          ...item,
          type: "Reservation",
        }));

      setHistory([
        ...completedRequests,
        ...completedReservations,
      ]);

    } catch (error) {
      console.log(error);
    }

  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {

    switch (status) {

      case "ACCEPTED":
        return "#2E7D32";

      case "COMPLETED":
        return "#1565C0";

      default:
        return "#EF6C00";
    }

  };

  return (
    <SafeAreaView style={styles.container}>

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
      >
        ← Back
      </Button>

      <Text style={styles.title}>
        📜 History
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item) =>
          `${item.type}-${item.id}`
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            No History Available
          </Text>
        }
        renderItem={({ item }) => (

          <Card style={styles.card}>

            <Card.Content>

              <Text style={styles.type}>
                {item.type}
              </Text>

              <Text style={styles.patient}>
                {item.patientName}
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

              {
                item.type === "Reservation" && (
                  <>
                    <InfoRow
                      label="Date"
                      value={item.reservationDate}
                    />

                    <InfoRow
                      label="Time"
                      value={item.reservationTime}
                    />
                  </>
                )
              }

              {
                item.type === "Emergency Request" && (
                  <InfoRow
                    label="Urgency"
                    value={item.urgency}
                  />
                )
              }

              <Text
                style={[
                  styles.status,
                  {
                    color: getStatusColor(item.status),
                  },
                ]}
              >
                {item.status}
              </Text>

            </Card.Content>

          </Card>

        )}
      />

    </SafeAreaView>
  );
}

function InfoRow({ label, value }) {

  return (
    <Text style={styles.info}>
      <Text style={styles.label}>
        {label}:
      </Text>{" "}
      {value}
    </Text>
  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#C62828",
    marginBottom: 20,
  },

  card: {
    marginBottom: 15,
    borderRadius: 12,
  },

  type: {
    color: "#C62828",
    fontWeight: "bold",
    marginBottom: 5,
  },

  patient: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    marginBottom: 6,
    fontSize: 16,
  },

  label: {
    fontWeight: "bold",
  },

  status: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 18,
  },

  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 18,
  },

});