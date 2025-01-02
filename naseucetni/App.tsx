import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';

// Import screens
import HomePage from './HomePage'; 
import SettingsScreen from './SettingScreen'; 
import PhotoScreen from './PhotoScreen'; 

// Define the parameter list for the bottom tab navigator
type TabParamList = {
  Doklady: undefined;
  Scanner: undefined;
  Nápověda: undefined;
};

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }: { route: RouteProp<any, any> }) => {
            return {
              tabBarStyle: {
                backgroundColor: '#060663', // Tab bar background color
                height: 80, // Increased height to make the tab larger
              },
              tabBarIcon: ({ color }: { color: string; size: number }) => {
                let iconName: string;

                // Set the icon name based on the route
                switch (route.name) {
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
                    iconName = 'alert-circle';
                }

                return (
                  <MaterialCommunityIcons
                    name={iconName as keyof typeof MaterialCommunityIcons.glyphMap}
                    color={color} // Button icon color
                    size={30} // Adjust the size of the icons as necessary
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

export default App;