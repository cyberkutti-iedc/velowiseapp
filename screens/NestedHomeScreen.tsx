import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import firebaseApp from '../constants/firebase'; 

type Props = {
  navigation: NavigationProp<any>;
};

const NestedHomeScreen: React.FC<Props> = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const [isVehicleOn, setIsVehicleOn] = useState(false);
  const [isLockVehicleOn, setIsLockVehicleOn] = useState(false);
  const [isConnectionVehicleOn, setIsConnectionVehicleOn] = useState(false);
  const [isConnectionStatusOn, setIsConnectionStatusOn] = useState(false);
  const [isWifiOn, setIsWifiOn] = useState(false);
  const [isAlertOn, setIsAlertOn] = useState(false);
  const [isLockClosed, setIsLockClosed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [vuinId, setVuinId] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [model, setModel] = useState('');

  const lockVehicleRef = firebaseApp.database().ref('velowise/lockVehicle');
  const connectionVehicleRef = firebaseApp.database().ref('velowise/Connection_vehicle');
  const wifiRef = firebaseApp.database().ref('velowise/Connection_vehicle');
  const alertRef = firebaseApp.database().ref('velowise/key');
  const lockClosedRef = firebaseApp.database().ref('velowise/lockVehicle');
  const accountRef = firebaseApp.database().ref('velowise/accounts');
  

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    return () => {
      SplashScreen.hideAsync();
    };
  }, []);

  useEffect(() => {
    const accountListener = accountRef.on('value', (snapshot) => {
      const accountData = snapshot.val();
      setName(accountData.name);
      setEmail(accountData.email);
      setVuinId(accountData.vuinId);
      setVehicleNumber(accountData.vehicleNumber);
      setModel(accountData.model);
    });

    return () => accountRef.off('value', accountListener);
  }, []);

  // Toggle lock vehicle
  const toggleLockVehicle = () => {
    const newLockStatus = !isLockVehicleOn;
    lockVehicleRef.set(newLockStatus);
    setIsLockVehicleOn(newLockStatus);
  };

  // Toggle connection vehicle
  const toggleConnectionVehicle = () => {
    const newConnectionStatus = !isConnectionVehicleOn;
    connectionVehicleRef.set(newConnectionStatus);
    setIsConnectionVehicleOn(newConnectionStatus);
  };

  // Toggle wifi
  const toggleWifi = () => {
    const newWifiStatus = !isWifiOn;
    wifiRef.set(newWifiStatus);
    setIsWifiOn(newWifiStatus);
  };

  // Toggle alert
  const toggleAlert = () => {
    const newAlertStatus = !isAlertOn;
    alertRef.set(newAlertStatus);
    setIsAlertOn(newAlertStatus);
  };

  // Toggle lock closed
  const toggleLockClosed = () => {
    const newLockClosedStatus = !isLockClosed;
    lockClosedRef.set(newLockClosedStatus);
    setIsLockClosed(newLockClosedStatus);
  };

  useEffect(() => {
    const lockListener = lockVehicleRef.on('value', (snapshot) => {
      const lockStatus = snapshot.val();
      setIsLockVehicleOn(lockStatus);
    });
  
    return () => lockVehicleRef.off('value', lockListener);
  }, []);

  useEffect(() => {
    const connectionListener = connectionVehicleRef.on('value', (snapshot) => {
      const connectionStatus = snapshot.val();
      setIsConnectionVehicleOn(connectionStatus);
    });
   
    return () => connectionVehicleRef.off('value', connectionListener);
  }, []);

  useEffect(() => {
    const wifiListener = wifiRef.on('value', (snapshot) => {
      const wifiStatus = snapshot.val();
      setIsWifiOn(wifiStatus);
    });

    const alertListener = alertRef.on('value', (snapshot) => {
      const alertStatus = snapshot.val();
      setIsAlertOn(alertStatus);
    });

    const lockClosedListener = lockClosedRef.on('value', (snapshot) => {
      const lockClosedStatus = snapshot.val();
      setIsLockClosed(lockClosedStatus);
    });

    return () => {
      wifiRef.off('value', wifiListener);
      alertRef.off('value', alertListener);
      lockClosedRef.off('value', lockClosedListener);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.rightHeader}>
  <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
    <Ionicons name="person" size={24} color="#FFFFFF" style={styles.profileIcon} />
  </TouchableOpacity>
</View>

      </View>
      <Text style={styles.bigText}>Hello, Velowise User</Text>

      <View style={styles.statusInd}>
        <TouchableOpacity onPress={toggleWifi}>
          <Ionicons name="wifi" size={28} color={isWifiOn ? '#FFFFFF' : '#333333'} style={styles.status} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleAlert}>
          <Ionicons name="alert-circle" size={28} color={isAlertOn ? '#333333' : '#FFFFFF'} style={styles.status} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLockClosed}>
          <Ionicons name="lock-closed" size={28} color={isLockClosed ? '#FFFFFF' : '#333333'} style={styles.status} />
        </TouchableOpacity>
      </View>

      <View style={styles.bigBox}>
        <Text style={styles.sectionTitle}>Velowise Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Name:</Text>
          <Text style={styles.infoText}>{name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Email ID:</Text>
          <Text style={styles.infoText}>{email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>VUIN ID:</Text>
          <Text style={styles.infoText}>{vuinId}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Vehicle Number:</Text>
          <Text style={styles.infoText}>{vehicleNumber}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Model:</Text>
          <Text style={styles.infoText}>{model}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.lockButton, isLockVehicleOn ? styles.connected : styles.disconnected]}
            onPress={toggleLockVehicle}
          >
            <Text style={styles.buttonText}>{isLockVehicleOn ? 'Unlock Vehicle' : 'Lock Vehicle'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isConnectionVehicleOn ? styles.connected : styles.disconnected]}
            onPress={toggleConnectionVehicle}
          >
            <Text style={styles.buttonText}>
              {isConnectionVehicleOn ? 'Disconnect Vehicle' : 'Connect Vehicle'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6A5ACD', // Violet background color
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 24 : 12,
  },
  leftHeader: {
    borderRadius: 20,
    padding: 10,
  },
  rightHeader: {
    borderRadius: 20,
    padding: 10,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#4B0082', // Indigo color
  },
  profileIcon: {
    padding: 10,
    borderRadius: 20,
    color: '#FFFFFF',
  },
  bigText: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 30,
    marginLeft: 4,
    marginRight: 4,
    color: '#FFFFFF',
    
  },
  statusInd: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#9390DF', // Indigo color
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 10,
    width: 380,
    height: 80,
  },
  bigBox: {
    backgroundColor: '#9390DF', // Indigo color
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 10,
    width: 380,
    height: 380,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoTitle: {
    fontSize: 21, // Increased font size
    fontWeight: '600', // Slightly heavier font weight
    color: '#8A2BE2', // Blue Violet color
    marginRight: 10,
    marginBottom: 5, // Add some spacing between title and text
    textTransform: 'uppercase', // Uppercase text
  },
  infoText: {
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 24, // Increase line height for better readability
    letterSpacing: 0.5, // Add some letter spacing for better visual appeal
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  button: {
    width: '45%',
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockButton: {
    backgroundColor: '#9400D3', // Dark violet color
  },
  connectButton: {
    backgroundColor: '#800080', // Purple color
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '600',
  },
  connected: {
    backgroundColor: '#8A2BE2', // Blue Violet color
  },
  disconnected: {
    backgroundColor: '#FFA500', // Orange color
  },
  
  status: {
    marginRight: 20,
  },
});

export default NestedHomeScreen;
