import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomePage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./assets/logo.png')} />
      
      <TouchableOpacity onPress={() => handlePress('DokladyVydane')}>
      <Text>Doklady vydané</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('DokladyPrijate')}>
      <Text>Doklady přijaté</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Uctenky')}>
      <Text>Účtenky</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('OstatniDoklady')}>
      <Text>Ostatní Doklady</Text>
      </TouchableOpacity>

    </View>
  );
};

export default HomePage;

function handlePress(arg0: string): void {
  throw new Error('Function not implemented.');
}
