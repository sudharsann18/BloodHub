import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Text, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../../services/api";

export default function ProfileScreen() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const token = await AsyncStorage.getItem("token");

      const response = await API.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);

    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }

  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D32F2F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        My Profile
      </Text>

      <Card style={styles.card}>
        <Card.Content>

          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{user.fullName}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user.phone}</Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user.role}</Text>

        </Card.Content>
      </Card>

    </View>
  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#D32F2F",
  },

  card: {
    borderRadius: 12,
    elevation: 4,
    paddingVertical: 10,
  },

  label: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },

  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

});