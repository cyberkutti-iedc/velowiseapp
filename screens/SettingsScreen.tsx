import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Linking,
  TextInput,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';






const SettingsScreen: React.FC = () => {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEmgVisible, setEmgModalVisible] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newEmgPhoneNumber, setEmgNewPhoneNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [modalVehicleVisible, setModalVehicleVisible] = useState(false);
  const navigation = useNavigation();
  

  const handleChangePhoneNumber = () => {
    setModalVisible(true);
  };

  const handleEmgChangePhoneNumber = () => {
    setEmgModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleEmgCancel = () => {
    setEmgModalVisible(false);
  };

  const handleConfirm = () => {
    if (newPhoneNumber.trim() !== '') {
      console.log('New phone number:', newPhoneNumber);
      setModalVisible(false);
    }
  };

  const handleEmgConfirm = () => {
    if (newEmgPhoneNumber.trim() !== '') {
      console.log('New Emergncy phone number:', newEmgPhoneNumber);
      setEmgModalVisible(false);
    }
  };

  const handleVehicleDetailsConfirm = () => {
    console.log('Vehicle Number:', vehicleNumber);
    console.log('Vehicle Model:', vehicleModel);
    setModalVehicleVisible(false);
    // Logic to save vehicle details
  };

  const handleCancelVehicle = () => {
    setModalVehicleVisible(false);
  };

  const handleVehicleModalOpen = () => {
    setModalVehicleVisible(true);
  };

  const handleLogout = async () => {
    try {
      // Remove the login status from AsyncStorage upon logout
      await AsyncStorage.removeItem('loginStatus');
      // Navigate to the login screen
      navigation.navigate("Login");

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.profileAvatar}
              />

              <TouchableOpacity onPress={() => {}}></TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName}>Velowise User</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <TouchableOpacity onPress={handleVehicleModalOpen} style={styles.row}>
  <View style={[styles.rowIcon, { backgroundColor: '#0f0' }]}>
    <FeatherIcon color="#fff" name="truck" size={20} />
  </View>
  <Text style={styles.rowLabel}>Vehicle Details</Text>
  <View style={styles.rowSpacer} />
  <FeatherIcon color="#c6c6c6" name="chevron-right" size={20} />
</TouchableOpacity>

            <TouchableOpacity onPress={handleChangePhoneNumber} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <FeatherIcon color="#fff" name="phone" size={20} />
              </View>
              <Text style={styles.rowLabel}>Change Phone Number</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEmgChangePhoneNumber} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#f00' }]}>
                <FeatherIcon color="#fff" name="phone" size={20} />
              </View>
              <Text style={styles.rowLabel}>Change Emergncy Phone Number</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#c6c6c6" name="chevron-right" size={20} />

            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://instagram.com/sreeraj_vr');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                <FeatherIcon color="#fff" name="flag" size={20} />
              </View>

              <Text style={styles.rowLabel}>Report Bug</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Alert.alert('Contact Us', 'Email: cyberkutti@gmail.com');
              }}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <FeatherIcon color="#fff" name="mail" size={20} />
              </View>

              <Text style={styles.rowLabel}>Contact Us</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Modal */}
      {modalVisible && (
       <View style={styles.modalContainer}>
       <View style={styles.modal}>
         <Text style={styles.modalTitle}>Change Phone Number</Text>
         <TextInput
           style={styles.input}
           onChangeText={setNewPhoneNumber}
           value={newPhoneNumber}
           placeholder="Enter new phone number"
         />
         <View style={styles.modalButtons}>
           <TouchableOpacity onPress={handleCancel} style={[styles.modalButton, styles.cancelButton]}>
             <Text style={styles.buttonText}>Cancel</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={handleConfirm} style={[styles.modalButton, styles.confirmButton]}>
             <Text style={styles.buttonText}>Confirm</Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
     )}
     
     {/* Emergency Phone Number Modal */}
     {modalEmgVisible && (
       <View style={styles.modalContainer}>
         <View style={styles.modal}>
           <Text style={styles.modalTitle}>Change Emergency Phone Number</Text>
           <TextInput
             style={styles.input}
             onChangeText={setEmgNewPhoneNumber}
             value={newEmgPhoneNumber}
             placeholder="Enter new Emergency phone number"
           />
           <View style={styles.modalButtons}>
             <TouchableOpacity onPress={handleEmgCancel} style={[styles.modalButton, styles.cancelButton]}>
               <Text style={styles.buttonText}>Cancel</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={handleEmgConfirm} style={[styles.modalButton, styles.confirmButton]}>
               <Text style={styles.buttonText}>Confirm</Text>
             </TouchableOpacity>
            
           </View>
         </View>
       </View>
     )}
     {modalVehicleVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Change Vehicle Details</Text>
            <TextInput
              style={styles.input}
              onChangeText={setVehicleNumber}
              value={vehicleNumber}
              placeholder="Enter vehicle number"
            />
            <TextInput
              style={styles.input}
              onChangeText={setVehicleModel}
              value={vehicleModel}
              placeholder="Enter vehicle model"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleCancelVehicle} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleVehicleDetailsConfirm} style={[styles.modalButton, styles.confirmButton]}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA', // Light grey background
  },
  profile: {
    padding: 24,
    backgroundColor: '#FFFFFF', // White background
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007BFF', // Primary blue color
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#1E293B', // Dark grey color
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#6B7280', // Grey color
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280', // Grey color
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEB2B2', // Red color
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#4B5563', // Dark grey color
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#FFFFFF', // White background
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E293B', // Dark grey color
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#D1D5DB', // Light grey border color
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#4B5563', // Dark grey color
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E5E7EB', // Light grey color
  },
  confirmButton: {
    backgroundColor: '#3B82F6', // Blue color
  },
  buttonText: {
    color: '#FFFFFF', // White color
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#EF4444', // Red color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF', // White color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
