import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for the navigation stack
type RootStackParamList = {
  DokladyVydane: undefined;
  DokladyPrijate: undefined;
  Uctenky: undefined;
  OstatniDoklady: undefined;
  HomePage: undefined; // Add HomePage to the RootStackParamList
};

// Define the navigation prop type for the HomePage
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const HomePage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />

      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DokladyVydane')} // Corrected navigation call
          >
            <Image source={require('./assets/dokladyvydane.png')} />
            <Text style={styles.buttonText}>Doklady vydané</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('DokladyPrijate')}>
            <Image source={require('./assets/dokladyprijate.png')} />
            <Text style={styles.buttonText}>Doklady přijaté</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Uctenky')}>
            <Image source={require('./assets/uctenky.png')} />
            <Text style={styles.buttonText}>Účtenky</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('OstatniDoklady')}>
            <Image source={require('./assets/ostatnidoklady.png')} />
            <Text style={styles.buttonText}>Ostatní Doklady</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'column', // Arrange buttons in columns
  },
  row: {
    flexDirection: 'row', // Arrange buttons in rows within each column
    justifyContent: 'space-between', // Space buttons evenly within each row
    width: '80%', // Adjust width as needed
  },
  buttonText: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default HomePage;