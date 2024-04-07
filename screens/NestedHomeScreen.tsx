import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

type Props = {
  navigation: NavigationProp<any>;
};

const NestedHomeScreen: React.FC<Props> = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [isVehicleOn, setIsVehicleOn] = useState(false);
  const [isLockVehicleOn, setIsLockVehicleOn] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    return () => {
      SplashScreen.hideAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.rightHeader}>
          <Ionicons name="person" size={24} color="#FFFFFF" style={styles.profileIcon} />
        </View>
      </View>
      <Text style={styles.bigText}>Hello, Velowise User</Text>

      <View style={styles.statusInd}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="wifi" size={28} color="#FFFFFF" style={styles.status} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="alert-circle" size={28} color="#FFFFFF" style={styles.status} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="lock-closed" size={28} color="#FFFFFF" style={styles.status} />
        </TouchableOpacity>
      </View>

      <View style={styles.bigBox}>
        <Text style={styles.sectionTitle}>Velowise Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Name:</Text>
          <Text style={styles.infoText}>John Doe</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Email ID:</Text>
          <Text style={styles.infoText}>example@example.com</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>VUIN ID:</Text>
          <Text style={styles.infoText}>123456789</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Vehicle Number:</Text>
          <Text style={styles.infoText}>ABC123</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Model:</Text>
          <Text style={styles.infoText}>Model X</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.lockButton, isLockVehicleOn ? styles.connected : styles.disconnected]}
            onPress={() => setIsLockVehicleOn(!isLockVehicleOn)}
          >
            <Text style={styles.buttonText}>{isLockVehicleOn ? 'Unlock Vehicle' : 'Lock Vehicle'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.connectButton, isVehicleOn ? styles.connected : styles.disconnected]}
            onPress={() => setIsVehicleOn(!isVehicleOn)}
          >
            <Text style={styles.buttonText}>{isVehicleOn ? 'Connected Vehicle' : 'Disconnected Vehicle'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    marginTop: Platform.OS === 'ios' ? 50 : 20,
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
    backgroundColor: '#2F2F2F',
  },
  profileIcon: {
    padding: 10,
    borderRadius: 20,
    color: '#000',
  },
  bigText: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 30,
    marginLeft: 4,
    marginRight: 4,
    color: '#2F2F2F',
    fontFamily: 'OpenSans',
  },
  statusInd: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2F2F2F',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#CCE5E3',
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
    backgroundColor: '#2F2F2F',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#CCE5E3',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#CCE5E3',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#FFFFFF',
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
    backgroundColor: '#4CAF50',
  },
  connectButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '600',
  },
  connected: {
    backgroundColor: 'green',
  },
  disconnected: {
    backgroundColor: 'orange',
  },
  status: {
    marginRight: 20,
  },
});

export default NestedHomeScreen;
