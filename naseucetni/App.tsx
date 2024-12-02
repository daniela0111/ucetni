import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

// Import your screens
import HomePage from '../screens/HomePage';
import SettingsScreen from '../screens/SettingScreen'; 
import PhotoScreen from '../screens/PhotoScreen'; 

// Define the parameter list for the bottom tab navigator
type TabParamList = {
  Doklady: undefined; // No parameters for this screen
  Scanner: undefined; // No parameters for this screen
  Nápověda: undefined; // No parameters for this screen
};

const Tab = createBottomTabNavigator(); // Removed type argument

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route, navigation }: { route: RouteProp<any, string>; navigation: any }): BottomTabNavigationOptions => {
            // Type assertion to ensure route is of the expected type
            const tabRoute = route as RouteProp<TabParamList, keyof TabParamList>;

            return {
              tabBarStyle: {
                backgroundColor: '#060663',
              },
              tabBarIcon: ({ color }) => {
                let iconName: string;

                switch (tabRoute.name) {
                  case 'Doklady':
                    iconName = 'home';
                    break;
                  case 'Scanner':
                    iconName = 'plus';
                    break;
                  case 'Nápověda':
                    iconName = 'help';
                    break;
                  default:
                    iconName = 'alert-circle'; // Fallback icon
                }

                return (
                  <MaterialCommunityIcons
                    name={iconName as keyof typeof MaterialCommunityIcons.glyphMap}
                    color={color}
                  />
                );
              },
            };
          }}
        >
          <Tab.Screen name="Doklady" component={HomePage} />
          <Tab.Screen name="Scanner" component={PhotoScreen} />
          <Tab.Screen name="Nápověda" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
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
