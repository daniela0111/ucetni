import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} /> 

      <View style={styles.buttonsContainer}>
        <View style={styles.row}> 
          <TouchableOpacity onPress={() => handlePress('DokladyVydane')}>
            <Image source={require('./assets/dokladyvydane.png')}></Image>
            <Text style={styles.buttonText}>Doklady vydané</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePress('DokladyPrijate')}>
            <Image source={require('./assets/dokladyprijate.png')}></Image>
            <Text style={styles.buttonText}>Doklady přijaté</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}> 
          <TouchableOpacity onPress={() => handlePress('Uctenky')}>
            <Image source={require('./assets/uctenky.png')}></Image>
            <Text style={styles.buttonText}>Účtenky</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePress('OstatniDoklady')}>
            <Image source={require('./assets/ostatnidoklady.png')}></Image>
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
  },
  logo: {
    width: '100%', 
    resizeMode: 'contain', 
    marginTop: 80, 
  },
  buttonsContainer: {
    marginTop: 70, 
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

function handlePress(arg0: string): void {
  throw new Error('Function not implemented.');
}