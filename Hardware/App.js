import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/components/Home.js'
import Contactos from './src/components/Contacts.js';
import Temperatura from './src/components/Temperatura.js';
import QR from './src/components/QR.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Contacts"
        component={Contactos}
      />
      <Stack.Screen
        name="QR"
        component={QR}
      />
      <Stack.Screen
        name="Temperatura"
        component={Temperatura}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

