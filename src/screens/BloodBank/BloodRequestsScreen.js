import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Alert,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

export default function BloodRequestsScreen() {

  const navigation = useNavigation();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH BLOOD BANK REQUESTS
  // =========================

  const fetchRequests = async () => {

    try {

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.log('No authentication token found');
        setRequests([]);
        return;
      }

      const response = await api.get('/request/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Blood bank requests:', response.data);

      // Show only pending requests
      const pendingRequests = response.data.filter(
        request => request.status === 'REQUESTED'
      );

      setRequests(pendingRequests);

    } catch (error) {

      console.log(
        'Failed to fetch blood requests:',
        error?.response?.data || error
      );

      setRequests([]);

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // INITIAL LOAD + AUTO REFRESH
  // =========================

  useEffect(() => {

    fetchRequests();

    const interval = setInterval(() => {
      fetchRequests();
    }, 5000);

    return () => clearInterval(interval);

  }, []);


  // =========================
  // ACCEPT REQUEST
  // =========================

  const acceptRequest = async (id) => {

    try {

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert(
          'Authentication Error',
          'Please login again.'
        );
        return;
      }

      await api.put(
        `/request/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(
        'Success',
        'Blood request accepted successfully.'
      );

      // Refresh requests
      fetchRequests();

    } catch (error) {

      console.log(
        'Failed to accept request:',
        error?.response?.data || error
      );

      Alert.alert(
        'Error',
        error?.response?.data?.message ||
        'Failed to accept request.'
      );
    }
  };


  // =========================
  // REQUEST CARD
  // =========================

  const renderItem = ({ item }) => (

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
          value={item.units}
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
          label="Urgency"
          value={item.urgency}
        />

        <InfoRow
          label="Status"
          value={item.status}
        />

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => acceptRequest(item.id)}
        >
          Accept Request
        </Button>

      </Card.Content>

    </Card>
  );


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <SafeAreaView style={styles.loader}>

        <ActivityIndicator
          size="large"
        />

        <Text style={styles.loadingText}>
          Loading blood requests...
        </Text>

      </SafeAreaView>

    );
  }


  // =========================
  // SCREEN
  // =========================

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        🩸 Pending Blood Requests
      </Text>

      <Text style={styles.subtitle}>
        Requests assigned to this blood bank
      </Text>

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        ← Back
      </Button>

      <FlatList
        data={requests}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={
          requests.length === 0
            ? styles.emptyList
            : styles.list
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={

          <View style={styles.empty}>

            <Text style={styles.emptyIcon}>
              🩸
            </Text>

            <Text style={styles.emptyTitle}>
              No Pending Requests
            </Text>

            <Text style={styles.emptyText}>
              There are currently no pending blood requests
              for this blood bank.
            </Text>

          </View>

        }
      />

    </SafeAreaView>

  );
}


// =========================
// INFO ROW
// =========================

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


// =========================
// STYLES
// =========================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  loadingText: {
    marginTop: 12,
    color: '#666',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 5,
  },

  subtitle: {
    color: '#666',
    marginBottom: 10,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  list: {
    paddingBottom: 30,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },

  card: {
    marginBottom: 15,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },

  patient: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#C62828',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  label: {
    color: '#666',
    fontWeight: '600',
    flex: 1,
  },

  value: {
    fontWeight: '700',
    flex: 1,
    textAlign: 'right',
  },

  button: {
    marginTop: 15,
    backgroundColor: '#C62828',
  },

  empty: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    lineHeight: 21,
  },

});