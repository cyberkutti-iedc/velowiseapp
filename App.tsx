import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Signup, Welcome, Home } from './screens'; // Import the Home screen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          name='Welcome'
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Home' // Add the Home screen
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
