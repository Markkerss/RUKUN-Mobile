import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Notif from './notif';
import Home from './home';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const Dashboard = ({route, navgation}) => {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
          
        }}
        
        />
      <Tab.Screen name="Settings" component={Notif} 
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
            ),
            
        }}
        listeners={({navigation})=>({
            tabPress: event =>{
                event.preventDefault();
                console.log("fadhoo");
                navigation.navigate("Chat")
            }
        })}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;