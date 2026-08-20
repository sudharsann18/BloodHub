import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PrimaryButton from '../../components/PrimaryButton';
import InputField from '../../components/InputField';
import BloodGroupDropdown from '../../components/BloodGroupDropdown';

import { createSOS } from '../../services/api';

import { colors } from '../../constants/colors';
import { bloodGroups } from '../../constants/bloodGroups';

import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function SOSScreen() {

  const navigation = useNavigation();

  // -----------------------------
  // STATE
  // -----------------------------

  const [selectedGroup, setSelectedGroup] = useState('O-');
  const [units, setUnits] = useState('1');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  /*
   * Prevents multiple API requests if the
   * user clicks Broadcast SOS repeatedly.
   */
  const submittingRef = useRef(false);


  // -----------------------------
  // BLOOD GROUP CHANGE
  // -----------------------------

  const handleBloodGroupChange = (group) => {

    console.log('Selected blood group:', group);

    if (group) {
      setSelectedGroup(group);
    }
  };


  // -----------------------------
  // BROADCAST SOS
  // -----------------------------

  const broadcastSOS = async () => {

    // Prevent duplicate requests
    if (submittingRef.current) {
      console.log('SOS submission already in progress');
      return;
    }

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!selectedGroup) {

      Alert.alert(
        'Validation',
        'Please select a blood group.'
      );

      return;
    }

    if (!units || units.trim() === '') {

      Alert.alert(
        'Validation',
        'Enter required units.'
      );

      return;
    }

    const numberOfUnits = Number(units);

    if (
      isNaN(numberOfUnits) ||
      numberOfUnits <= 0
    ) {

      Alert.alert(
        'Validation',
        'Units must be greater than 0.'
      );

      return;
    }


    // -----------------------------
    // START SUBMISSION
    // -----------------------------

    submittingRef.current = true;
    setLoading(true);


    try {

      // -----------------------------
      // GET JWT TOKEN
      // -----------------------------

      const token =
        await AsyncStorage.getItem('token');

      if (!token) {

        Alert.alert(
          'Login Required',
          'Please login again.'
        );

        return;
      }


      // -----------------------------
      // SOS DATA
      // -----------------------------

      const sosData = {

        hospital: 'Current Hospital',

        bloodGroup: selectedGroup,

        units: numberOfUnits,

        message: message.trim(),

      };


      console.log(
        'Sending SOS:',
        sosData
      );


      // -----------------------------
      // API REQUEST
      // -----------------------------

      const response = await createSOS(
        sosData,
        token
      );


      console.log(
        'SOS created:',
        response
      );


      // -----------------------------
      // SUCCESS
      // -----------------------------

      Alert.alert(
        'SOS Broadcasted',
        'Your emergency blood request has been sent to nearby users and blood banks.',
        [
          {
            text: 'OK',

            onPress: () => {

              navigation.navigate(
                'SOSDetails',
                response
              );

            },
          },
        ]
      );


    } catch (error) {

      console.log(
        'SOS creation error:',
        error?.response?.data || error
      );


      let errorMessage =
        'Failed to broadcast SOS.';


      if (error?.response?.data?.message) {

        errorMessage =
          error.response.data.message;

      }


      Alert.alert(
        'Error',
        errorMessage
      );


    } finally {

      /*
       * Always unlock submission,
       * whether request succeeds or fails.
       */

      submittingRef.current = false;

      setLoading(false);

    }

  };


  // -----------------------------
  // UI
  // -----------------------------

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        {/* BACK */}

        <TouchableOpacity
          disabled={loading}
          onPress={() => navigation.goBack()}
        >

          <Text style={styles.back}>
            ← Back
          </Text>

        </TouchableOpacity>


        <View style={styles.card}>


          {/* TITLE */}

          <Text style={styles.title}>
            🚨 Emergency SOS
          </Text>


          <Text style={styles.subtitle}>
            Your registered profile details will be
            automatically used while sending the SOS.
          </Text>


          {/* REGISTERED INFORMATION */}

          <View style={styles.profileCard}>

            <Text style={styles.profileTitle}>
              Registered Information
            </Text>

            <Text style={styles.profileInfo}>
              Your name and phone number will be
              automatically attached to this SOS.
            </Text>

          </View>


          {/* BLOOD GROUP */}

          <View style={styles.formGroup}>

            <BloodGroupDropdown
              label="Blood Group"
              value={selectedGroup}
              onSelect={handleBloodGroupChange}
              options={bloodGroups}
            />

          </View>


          {/* SELECTED GROUP DEBUG / CONFIRMATION */}

          <View style={styles.selectedGroupCard}>

            <Text style={styles.selectedGroupLabel}>
              Selected Blood Group
            </Text>

            <Text style={styles.selectedGroupValue}>
              {selectedGroup || 'Not selected'}
            </Text>

          </View>


          {/* UNITS */}

          <View style={styles.formGroup}>

            <InputField
              label="Units Required"
              value={units}
              onChangeText={setUnits}
              placeholder="Enter units"
              keyboardType="numeric"
              editable={!loading}
            />

          </View>


          {/* MESSAGE */}

          <View style={styles.formGroup}>

            <InputField
              label="Emergency Message (Optional)"
              value={message}
              onChangeText={setMessage}
              placeholder="Example: Surgery in 30 minutes. Urgent blood required."
              multiline
              numberOfLines={5}
              style={styles.messageInput}
              editable={!loading}
            />

          </View>


          {/* BROADCAST */}

          <PrimaryButton

            label={
              loading
                ? 'Broadcasting...'
                : '🚨 Broadcast SOS'
            }

            onPress={broadcastSOS}

            style={styles.button}

            disabled={loading}

          />


          {/* LOADING INFORMATION */}

          {loading && (

            <Text style={styles.loadingText}>
              Sending emergency request...
            </Text>

          )}

        </View>

      </ScrollView>

    </SafeAreaView>

  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  safeArea: {

    flex: 1,

    backgroundColor:
      colors.background,

  },


  container: {

    flexGrow: 1,

    justifyContent:
      'center',

    padding:
      spacing.lg,

  },


  back: {

    color:
      colors.primaryRed,

    fontWeight:
      '700',

    marginBottom:
      spacing.md,

    fontSize:
      16,

  },


  card: {

    backgroundColor:
      colors.white,

    borderRadius:
      borderRadius.xl,

    padding:
      spacing.lg,

    ...shadows.medium,

  },


  title: {

    fontSize:
      26,

    fontWeight:
      '700',

    color:
      colors.primaryRed,

  },


  subtitle: {

    marginTop:
      spacing.sm,

    color:
      colors.gray,

    lineHeight:
      22,

  },


  profileCard: {

    marginTop:
      spacing.xl,

    backgroundColor:
      '#FFF5F5',

    borderRadius:
      borderRadius.lg,

    padding:
      spacing.md,

  },


  profileTitle: {

    fontSize:
      18,

    fontWeight:
      '700',

    color:
      colors.primaryRed,

    marginBottom:
      spacing.sm,

  },


  profileInfo: {

    color:
      colors.gray,

    lineHeight:
      21,

  },


  formGroup: {

    marginTop:
      spacing.lg,

  },


  selectedGroupCard: {

    marginTop:
      spacing.sm,

    backgroundColor:
      '#FFF5F5',

    borderRadius:
      borderRadius.lg,

    padding:
      spacing.md,

    flexDirection:
      'row',

    justifyContent:
      'space-between',

    alignItems:
      'center',

  },


  selectedGroupLabel: {

    color:
      colors.gray,

    fontWeight:
      '600',

  },


  selectedGroupValue: {

    color:
      colors.primaryRed,

    fontSize:
      18,

    fontWeight:
      '700',

  },


  messageInput: {

    minHeight:
      120,

    textAlignVertical:
      'top',

  },


  button: {

    marginTop:
      spacing.xl,

    marginBottom:
      spacing.sm,

  },


  loadingText: {

    textAlign:
      'center',

    marginTop:
      spacing.sm,

    color:
      colors.gray,

    fontSize:
      14,

  },

});