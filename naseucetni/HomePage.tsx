import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} /> 

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handlePress('DokladyVydane')}>
          <Text style={styles.buttonText}>Doklady vydané</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('DokladyPrijate')}>
          <Text style={styles.buttonText}>Doklady přijaté</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Uctenky')}>
          <Text style={styles.buttonText}>Účtenky</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('OstatniDoklady')}>
          <Text style={styles.buttonText}>Ostatní Doklady</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center horizontally
  },
  logo: {
    width: '100%', 
    resizeMode: 'contain', // Adjust image resizing as needed
    marginTop: 20, // Add top margin for spacing
  },
  buttonsContainer: {
    marginTop: 20, // Add spacing between image and buttons
  },
  buttonText: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default HomePage;
function handlePress(arg0: string): void {
  throw new Error('Function not implemented.');
}

