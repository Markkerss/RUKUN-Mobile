import React, { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import Home from './pages/home'
import Login from './pages/login'
import Notif from './pages/notif'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import {firebaseConfig} from './config'
import * as firebase from 'firebase'
import Dashboard from './pages/dashboard';
import Chat from './pages/chat';
import Pay from './pages/pay';
import Midtrans from './pages/midtrans';

// firebase.initializeApp(firebaseConfig)

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}} >
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Login"  component={Login} />
        {/* <Stack.Screen name="Notif" component={Notif} /> */}
        <Stack.Screen name="Chat"  component={Chat} options={{ headerShown: true }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Pay" component={Pay} />
        <Stack.Screen name="Midtrans" component={Midtrans} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
