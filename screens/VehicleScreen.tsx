import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import firebaseApp from '../constants/firebase';

// @ts-ignore
import markerGif from '../assets/marker.png';


const VehicleScreen = () => {

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [engine, setEngine] = useState(false);
  const [alert, setAlert] = useState(false);
  const [antiThief, setAntiThief] = useState(false);
  const [accidentAlert, setAccidentAlert] = useState(false);
  const [headlight, setHeadlight] = useState(false);
  const [hazardMode, setHazardMode] = useState(false);
  const [findMyVehicle, setFindMyVehicle] = useState(false);
  const [lockVehicle, setLockVehicle] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);

  const EngineRef = firebaseApp.database().ref('velowise/engine');
  const HeadlightRef = firebaseApp.database().ref('velowise/headlight');
  const HazardModeRef = firebaseApp.database().ref('velowise/hazardlight');
  const FindMyVehicleRef = firebaseApp.database().ref('velowise/findmyvehicle');
  const LockVehicleRef = firebaseApp.database().ref('velowise/lockVehicle');
  const TotalDistanceRef = firebaseApp.database().ref('velowise/totalDistance');
  const AverageSpeedRef = firebaseApp.database().ref('velowise/averageSpeed');

  const toggleEngine = () => {
    const newEngineStatus = !engine;
    console.log('New Engine Status:', newEngineStatus);
    EngineRef.set(newEngineStatus); // Update engine status in Firebase Realtime Database
    setEngine(newEngineStatus);
  };


  const toggleAlert = () => {
    const newAlertStatus = !alert;
    firebaseApp.database().ref('velowise/lockVehicle').set(newAlertStatus);
    setAlert(newAlertStatus);
  };

  const toggleAntiThief = () => {
    const newAntiThiefStatus = !antiThief;
    firebaseApp.database().ref('velowise/antiThief').set(newAntiThiefStatus);
    setAntiThief(newAntiThiefStatus);
  };

  const toggleAccidentAlert = () => {
    const newAccidentAlertStatus = !accidentAlert;
    firebaseApp.database().ref('velowise/accidentAlert').set(newAccidentAlertStatus);
    setAccidentAlert(newAccidentAlertStatus);
  };

  const toggleHeadlight = () => {
    const newHeadlightStatus = !headlight;
    HeadlightRef.set(newHeadlightStatus);
    setHeadlight(newHeadlightStatus);
  };

  const toggleHazardMode = () => {
    const newHazardModeStatus = !hazardMode;
    HazardModeRef.set(newHazardModeStatus);
    setHazardMode(newHazardModeStatus);
  };

  const toggleFindMyVehicle = () => {
    const newFindMyVehicleStatus = !findMyVehicle;
    FindMyVehicleRef.set(newFindMyVehicleStatus);
    setFindMyVehicle(newFindMyVehicleStatus);
  };

  const toggleLockVehicle = () => {
    const newLockVehicleStatus = !lockVehicle;
    LockVehicleRef.set(newLockVehicleStatus);
    setLockVehicle(newLockVehicleStatus);
  };
  useEffect(() => {
    const totalDistanceListener = TotalDistanceRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        setTotalDistance(snapshot.val());
      }
    });

    const averageSpeedListener = AverageSpeedRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        setAverageSpeed(snapshot.val());
      }
    });

    return () => {
      TotalDistanceRef.off('value', totalDistanceListener);
      AverageSpeedRef.off('value', averageSpeedListener);
    };
  }, []);

  const updateTotalDistance = (newDistance: number) => {
    TotalDistanceRef.set(newDistance);
  };

  const updateAverageSpeed = (newSpeed: number) => {
    AverageSpeedRef.set(newSpeed);
  };


// Fetch latitude and longitude from Firebase
useEffect(() => {
  // Reference to latitude and longitude in Firebase
  const latitudeRef = firebaseApp.database().ref('velowise/latitude');
  const longitudeRef = firebaseApp.database().ref('velowise/longitude');

  // Listen for changes in latitude
  const latitudeListener = latitudeRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setLatitude(data);
      setLoading(false); // Set loading to false once latitude is fetched
    }
  });

  // Listen for changes in longitude
  const longitudeListener = longitudeRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setLongitude(data);
    }
  });

  // Cleanup function to remove listeners
  return () => {
    latitudeRef.off('value', latitudeListener);
    longitudeRef.off('value', longitudeListener);
  };
}, []);

// Render loading indicator if data is still loading
if (loading) {
  return (
    <View style={styles.loadingContainer}>
      <Text>Loading...</Text>
    </View>
  );
}
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.bigText}>Vehicle Location</Text>
        <View style={styles.boxContainer}>
          <View style={styles.mapContainer}>

          <MapView
              style={styles.map}
              initialRegion={{
                latitude: 10.8505, // Latitude of Kerala, India
                longitude: 76.2711, // Longitude of Kerala, India
                latitudeDelta: 1.5, // Adjust zoom level as needed
                longitudeDelta: 1.5,
              }}
            >
              <Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
              >
                <Image source={markerGif} style={{ width: 50, height: 50 }} />
                <Callout>
                  <View>
                    <Text>Your Vehicle Location</Text>
                    <Text>Latitude: {latitude}</Text>
                    <Text>Longitude: {longitude}</Text>
                  </View>
                </Callout>
              </Marker>
            </MapView>

          </View>

        </View>

        <Text style={styles.bigText}>Master Switch</Text>
        <View style={styles.iconContainer}>
          <View style={styles.topBox}>
            <TouchableOpacity style={styles.iconBox} onPress={toggleEngine}>
              <View style={[styles.smallIconBox, { backgroundColor: engine ? '#D8BFD8' : '#F0E6FA' }]}>
                <Image source={require('../assets/enginelogo.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonTopText}>Engine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox} onPress={toggleAlert}>
              <View style={[styles.smallIconBox, { backgroundColor: alert ? '#D8BFD8' : '#F0E6FA' }]}>
                <Image source={require('../assets/alertlogo.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonTopText}>Alert</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomBox}>

            <TouchableOpacity style={styles.iconBox} onPress={toggleAntiThief}>
              <View style={[styles.smallIconBox, { backgroundColor: antiThief ? '#D8BFD8' : '#F0E6FA' }]}>
                <Image source={require('../assets/antithief.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonTopText}>Anti Thief</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={toggleAccidentAlert}>
              <View style={[styles.smallIconBox, { backgroundColor: accidentAlert ? '#D8BFD8' : '#F0E6FA' }]}>
                <Image source={require('../assets/accidentlogo.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonTopText}>Accident Alert</Text>
            </TouchableOpacity>

          </View>
        </View>

        <Text style={styles.bigText}>Sub-Master Switch</Text>
        <View style={styles.iconIHSContainer}>
          <View style={styles.topBox}>
            <TouchableOpacity style={styles.iconBox} onPress={toggleHeadlight}>
              <View style={[styles.smallIconBox, { backgroundColor: headlight ? '#D8BFD8' : '#E6E6FA' }]}>
                <Image source={require('../assets/headlight.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonText}>Headlight</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={toggleHazardMode}>
              <View style={[styles.smallIconBox, { backgroundColor: hazardMode ? '#D8BFD8' : '#E6E6FA' }]}>
                <Image source={require('../assets/hazard.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonText}>Hazard Mode</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.bottomBox}>
            <TouchableOpacity style={styles.iconBox} onPress={toggleFindMyVehicle}>
              <View style={[styles.smallIconBox, { backgroundColor: findMyVehicle ? '#D8BFD8' : '#E6E6FA' }]}>
                <Image source={require('../assets/search.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonText}>Find My Vehicle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={toggleLockVehicle}>
              <View style={[styles.smallIconBox, { backgroundColor: lockVehicle ? '#D8BFD8' : '#E6E6FA' }]}>
                <Image source={require('../assets/bike.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonText}>Lock Vehicle</Text>
            </TouchableOpacity>
          </View>
        </View>

        

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    backgroundColor: '#F0E8FF', // White background
    width: 360,
    height: 480,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  mapContainer: {
    flex: 1,
    height: 50,
  },
  map: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#F0E8FF', // White background
    width: 380,
    height: 380,
    borderRadius: 10,
  },
  iconIHSContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#6A5ACD', // Dark gray background
    width: 380,
    height: 380,
    borderRadius: 10,
  },
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  iconBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallIconBox: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: '#D9BFD8', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#ffffff', // Dark gray text
  },
  buttonTopText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333333',
  },
  bigText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#333333', // Dark gray text
  },
  iconImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },

});

export default VehicleScreen;
