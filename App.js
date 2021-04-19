import React, { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import Home from './pages/home'
import Login from './pages/login'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import {firebaseConfig} from './config'
import * as firebase from 'firebase'
import Dashboard from './pages/dashboard';
import Chat from './pages/chat';
import Register from './pages/register'
import store from './store'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}} >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login"  component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Chat"  component={Chat} />
          <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
