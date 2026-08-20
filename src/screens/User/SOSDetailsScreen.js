import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { colors } from '../../constants/colors';

import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function SOSDetailsScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const sos = route.params || {};

  const {
    id,
    patientName = 'Unknown',
    hospital = 'Current Hospital',
    phone = '',
    bloodGroup = '',
    units = 0,
    message = '',
    status = 'BROADCASTED',
  } = sos;


  // --------------------------------
  // STATUS TEXT
  // --------------------------------

  const getStatusText = () => {

    switch (status) {

      case 'BROADCASTED':
        return '🔍 Searching for nearby donors...';

      case 'ACCEPTED':
        return '🩸 A donor has accepted your SOS!';

      case 'CONFIRMED':
        return '✅ Donor confirmed. They are coming to help.';

      case 'COMPLETED':
        return '✅ Blood request completed.';

      default:
        return '🔍 Searching for nearby donors...';
    }
  };


  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.card}>

        {/* ICON */}

        <Text style={styles.icon}>
          🚨
        </Text>


        {/* TITLE */}

        <Text style={styles.title}>
          SOS Request Sent
        </Text>


        <Text style={styles.subtitle}>
          Your emergency blood request has been
          broadcast to nearby users.
        </Text>


        {/* REQUEST ID */}

        {id && (

          <View style={styles.idBox}>

            <Text style={styles.idLabel}>
              SOS Request ID
            </Text>

            <Text style={styles.idValue}>
              #{id}
            </Text>

          </View>

        )}


        {/* DETAILS */}

        <View style={styles.details}>

          <View style={styles.row}>
            <Text style={styles.label}>
              Patient
            </Text>

            <Text style={styles.value}>
              {patientName}
            </Text>
          </View>


          <View style={styles.row}>
            <Text style={styles.label}>
              Hospital
            </Text>

            <Text style={styles.value}>
              {hospital}
            </Text>
          </View>


          <View style={styles.row}>
            <Text style={styles.label}>
              Phone
            </Text>

            <Text style={styles.value}>
              {phone || '-'}
            </Text>
          </View>


          <View style={styles.row}>
            <Text style={styles.label}>
              Blood Group
            </Text>

            <Text style={styles.bloodValue}>
              {bloodGroup}
            </Text>
          </View>


          <View style={styles.row}>
            <Text style={styles.label}>
              Units
            </Text>

            <Text style={styles.value}>
              {units}
            </Text>
          </View>


          <View style={styles.row}>
            <Text style={styles.label}>
              Message
            </Text>

            <Text style={styles.value}>
              {message || '-'}
            </Text>
          </View>

        </View>


        {/* STATUS */}

        <View style={styles.statusBox}>

          <Text style={styles.statusTitle}>
            Current Status
          </Text>

          <Text style={styles.status}>
            {getStatusText()}
          </Text>

          <Text style={styles.statusSmall}>
            Status: {status}
          </Text>

        </View>


        {/* HOME */}

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >

          <Text style={styles.homeText}>
            Back to Home
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor:
      colors.background,

    justifyContent:
      'center',

    padding:
      spacing.lg,

  },


  card: {

    backgroundColor:
      colors.white,

    borderRadius:
      borderRadius.xl,

    padding:
      spacing.xl,

    ...shadows.medium,

  },


  icon: {

    fontSize:
      70,

    textAlign:
      'center',

  },


  title: {

    fontSize:
      26,

    fontWeight:
      '700',

    color:
      colors.primaryRed,

    textAlign:
      'center',

    marginTop:
      15,

  },


  subtitle: {

    textAlign:
      'center',

    color:
      colors.gray,

    marginTop:
      10,

    lineHeight:
      22,

  },


  idBox: {

    marginTop:
      20,

    backgroundColor:
      '#F5F5F5',

    borderRadius:
      12,

    padding:
      12,

    alignItems:
      'center',

  },


  idLabel: {

    color:
      colors.gray,

    fontSize:
      13,

  },


  idValue: {

    marginTop:
      3,

    color:
      colors.black,

    fontSize:
      18,

    fontWeight:
      '700',

  },


  details: {

    marginTop:
      25,

  },


  row: {

    flexDirection:
      'row',

    justifyContent:
      'space-between',

    marginBottom:
      14,

  },


  label: {

    fontWeight:
      '700',

    color:
      colors.gray,

  },


  value: {

    color:
      colors.black,

    fontWeight:
      '600',

    maxWidth:
      '60%',

    textAlign:
      'right',

  },


  bloodValue: {

    color:
      colors.primaryRed,

    fontWeight:
      '800',

    fontSize:
      16,

  },


  statusBox: {

    marginTop:
      20,

    backgroundColor:
      '#FFF5F5',

    borderRadius:
      15,

    padding:
      20,

  },


  statusTitle: {

    color:
      colors.primaryRed,

    fontWeight:
      '700',

    marginBottom:
      10,

  },


  status: {

    marginTop:
      5,

    color:
      colors.black,

    fontWeight:
      '600',

    lineHeight:
      22,

  },


  statusSmall: {

    marginTop:
      10,

    color:
      colors.gray,

    fontSize:
      13,

  },


  homeButton: {

    marginTop:
      25,

    backgroundColor:
      colors.primaryRed,

    padding:
      16,

    borderRadius:
      15,

    alignItems:
      'center',

  },


  homeText: {

    color:
      '#fff',

    fontWeight:
      '700',

    fontSize:
      17,

  },

});