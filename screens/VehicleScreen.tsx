import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text,Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const VehicleScreen: React.FC = () => {
  const latitude = 37.7749; // Example latitude
  const longitude = -122.4194; // Example longitude

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.bigText}>Vehcile Location</Text>
        <View style={styles.boxContainer}>
        
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {/* Marker for the vehicle location */}
              <Marker
                coordinate={{ latitude: latitude, longitude: longitude }}
                title="Vehicle Location"
              />
            </MapView>
          </View>
          
        </View>
        <Text style={styles.bigText}>Master Switch</Text>
        <View style={styles.iconContainer}>
          <View style={styles.topBox}>
          <TouchableOpacity style={styles.iconBox}>
              <View style={styles.smallIconBox}>
                <Image source={require('../assets/enginelogo.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonText}>Engine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox}>
              <View style={styles.smallIconBox}>
                <Image source={require('../assets/alertlogo.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonText}>Alert</Text>
            </TouchableOpacity>
           
          </View>
         
          <View style={styles.bottomBox}>
          <TouchableOpacity style={styles.iconBox}>
              <View style={styles.smallIconBox}>
                <Image source={require('../assets/antithief.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonText}>Anti Thief</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox}>
              <View style={styles.smallIconBox}>
                <Image source={require('../assets/accidentlogo.png')} style={styles.iconImage} />
              </View>
              <Text style={styles.buttonText}>Accident Alert</Text>
            </TouchableOpacity>
        
          </View>
        </View>

        <Text style={styles.bigText}>Sub-Master Switch</Text>
        <View style={styles.iconIHSContainer}>
          <View style={styles.topBox}>
            <TouchableOpacity style={styles.iconBox}>
              <View style={styles.smallIHSIconBox}>
                <Ionicons name="ios-car" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Engine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox}>
              <View style={styles.smallIHSIconBox}>
                <Ionicons name="ios-alert" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Alert</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBox}>
            <TouchableOpacity style={styles.iconBox}>
              <View style={styles.smallIHSIconBox}>
                <Ionicons name="ios-lock" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Anti-theft</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox}>
              <View style={styles.smallIHSIconBox}>
                <Ionicons name="ios-lock" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Anti-theft</Text>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    backgroundColor: '#FEE1B6',
    width: 360,
    height: 680,
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
    backgroundColor: '#FEE1B6',
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
    backgroundColor: '#2F2F2F',
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
    backgroundColor: '#CCE5E3',
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
  smallIHSIconBox: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: '#EEDEF6',
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
  },
  bigText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#2F2F2F',

  },
  iconImage: {
    width: 100,
    height: 100,
  },
});

export default VehicleScreen;
