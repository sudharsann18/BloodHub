import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Text, Button, Card } from "react-native-paper";

import {
  getInventory,
  updateInventory,
} from "../../services/api";

export default function InventoryScreen({ navigation }) {
  const [inventory, setInventory] = useState([]);
  const [editingBloodGroup, setEditingBloodGroup] = useState(null);
  const [newUnits, setNewUnits] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  // ==========================================
  // LOAD BLOOD BANK INVENTORY
  // ==========================================

  const loadInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.log("Load inventory error:", error);
      Alert.alert("Error", "Failed to load inventory");
    }
  };

  // ==========================================
  // SAVE UPDATED INVENTORY
  // ==========================================

  const saveInventory = async () => {
    if (newUnits.trim() === "") {
      Alert.alert("Invalid Units", "Please enter the number of units");
      return;
    }

    const units = Number(newUnits);

    if (isNaN(units) || units < 0) {
      Alert.alert(
        "Invalid Units",
        "Units must be a valid number greater than or equal to 0"
      );
      return;
    }

    try {
      await updateInventory(editingBloodGroup, units);

      Alert.alert(
        "Success",
        `${editingBloodGroup} inventory updated`
      );

      setEditingBloodGroup(null);
      setNewUnits("");

      await loadInventory();
    } catch (error) {
      console.log("Update inventory error:", error);

      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to update inventory"
      );
    }
  };

  // ==========================================
  // START EDITING
  // ==========================================

  const startEditing = (item) => {
    setEditingBloodGroup(item.bloodGroup);
    setNewUnits(item.units.toString());
  };

  // ==========================================
  // CANCEL EDITING
  // ==========================================

  const cancelEditing = () => {
    setEditingBloodGroup(null);
    setNewUnits("");
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>

      {/* BACK BUTTON */}

      <Button
        mode="text"
        icon="arrow-left"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        contentStyle={styles.backButtonContent}
      >
        Back
      </Button>

      {/* TITLE */}

      <Text style={styles.title}>
        🩸 Blood Inventory
      </Text>

      <Text style={styles.subtitle}>
        Manage your blood bank inventory
      </Text>

      {/* INVENTORY LIST */}

      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (

          <Card style={styles.card}>

            <Card.Content>

              {/* BLOOD GROUP + UNITS */}

              <View style={styles.headerRow}>

                <Text style={styles.group}>
                  {item.bloodGroup}
                </Text>

                <Text style={styles.units}>
                  {item.units} units
                </Text>

              </View>

              {/* EDIT MODE */}

              {editingBloodGroup === item.bloodGroup ? (

                <View>

                  <Text style={styles.label}>
                    Update available units
                  </Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Enter units"
                    value={newUnits}
                    onChangeText={setNewUnits}
                  />

                  <View style={styles.buttonRow}>

                    <Button
                      mode="contained"
                      onPress={saveInventory}
                      style={styles.saveButton}
                    >
                      Save
                    </Button>

                    <Button
                      mode="outlined"
                      onPress={cancelEditing}
                      style={styles.cancelButton}
                    >
                      Cancel
                    </Button>

                  </View>

                </View>

              ) : (

                /* NORMAL MODE */

                <Button
                  mode="outlined"
                  onPress={() => startEditing(item)}
                  style={styles.updateButton}
                >
                  Update
                </Button>

              )}

            </Card.Content>

          </Card>

        )}
      />

    </SafeAreaView>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F5F5F5",
  },

  // ==========================================
  // BACK BUTTON
  // ==========================================

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },

  backButtonContent: {
    flexDirection: "row-reverse",
  },

  // ==========================================
  // TITLE
  // ==========================================

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#C62828",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },

  // ==========================================
  // LIST
  // ==========================================

  list: {
    paddingBottom: 20,
  },

  // ==========================================
  // CARD
  // ==========================================

  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },

  // ==========================================
  // BLOOD GROUP + UNITS
  // ==========================================

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  group: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C62828",
  },

  units: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  // ==========================================
  // EDIT FORM
  // ==========================================

  label: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 14,
    color: "#555",
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
  },

  // ==========================================
  // BUTTONS
  // ==========================================

  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  saveButton: {
    flex: 1,
    marginRight: 8,
  },

  cancelButton: {
    flex: 1,
    marginLeft: 8,
  },

  updateButton: {
    marginTop: 15,
  },

});