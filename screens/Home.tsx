import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import NestedHomeScreen from './NestedHomeScreen';
import VehicleScreen from './VehicleScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createMaterialBottomTabNavigator();

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="NestedHome"
      activeColor="#13141F"
      inactiveColor="#AAAAAA"
      barStyle={styles.tabBar}
    >
      <Tab.Screen
        name="NestedHome"
        component={NestedHomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Vehicle"
        component={VehicleScreen}
        options={{
          tabBarLabel: 'Vehicle',
          tabBarIcon: ({ color }) => <Ionicons name="bicycle" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#13141F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    elevation: 8,
  },
});

export default Home;
