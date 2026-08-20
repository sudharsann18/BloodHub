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

export default function InventoryScreen() {
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newUnits, setNewUnits] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load inventory");
    }
  };

  const saveInventory = async () => {
    try {
      await updateInventory(editingId, newUnits);
      setEditingId(null);
      setNewUnits("");
      loadInventory();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update inventory");
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        🩸 Blood Inventory
      </Text>

      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <Card style={styles.card}>

            <Card.Content>

              <Text style={styles.group}>
                {item.bloodGroup}
              </Text>

              <Text style={styles.units}>
                Available Units : {item.units}
              </Text>

              {editingId === item.id ? (
                <>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Enter new units"
                    value={newUnits}
                    onChangeText={setNewUnits}
                  />

                  <Button
                    mode="contained"
                    onPress={saveInventory}
                    style={styles.button}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  mode="outlined"
                  onPress={() => {
                    setEditingId(item.id);
                    setNewUnits(item.units.toString());
                  }}
                  style={styles.button}
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

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#C62828",
    marginBottom: 20,
  },

  card: {
    marginBottom: 15,
    borderRadius: 10,
  },

  group: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C62828",
  },

  units: {
    marginTop: 10,
    fontSize: 18,
  },

  input: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
  },

  button: {
    marginTop: 15,
  },

});