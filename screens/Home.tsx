import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import NestedHomeScreen from './NestedHomeScreen';
import VehicleScreen from './VehicleScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createMaterialBottomTabNavigator();

const Home: React.FC<{ navigation: any }> = ({ }) => {
  return (
    <Tab.Navigator
      initialRouteName="NestedHome"
      activeColor="#6A5ACD"
      inactiveColor="#C0C0C0"
      barStyle={{
        backgroundColor: '#F8F8FF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        elevation: 8,
      }}
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

export default Home;
