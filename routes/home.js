import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { useAuth } from '../providers/auth';
//import HomeScreen from '../screens/home/Home';
import HomeScreen from '../screens/HomePageScreen';
import CalendarScreen from '../screens/home/Calendar';
import ProfileScreen from '../screens/home/Profile';
import GeneratePDFScreen from '../screens/home/GeneratePDF';


const Tab = createBottomTabNavigator()

export default function HomeStack(props) {

  const { navigate } = props.navigation
  const { handleLogout } = useAuth()

  const SignoutScreen = () => {
    handleLogout()
    return null
  }

  return(
    <Tab.Navigator>
      <Tab.Screen 
        name="Dashboard" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
        }}
      />
      <Tab.Screen 
        name="Calendrier" 
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}calendar
      />
      <Tab.Screen 
        name="Profil" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={30} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Generer un état des lieux" 
        component={GeneratePDFScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={30} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Logout"
        component={SignoutScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="log-out" color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}