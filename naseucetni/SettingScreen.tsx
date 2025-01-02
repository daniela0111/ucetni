import React from 'react';
import { View, Text, TouchableOpacity, Linking, Image , StyleSheet} from 'react-native';

interface SettingsScreenProps {} // Optional: Define props interface

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./assets/logo.png')} style={styles.logo}/>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color:`#C00006`  }}>Podpora</Text>

      <Text style={{ fontSize: 16, color:`#060663` }}>V případě nutnosti můžete volat telefonickou podporu ve všední dny od 10:00 do 15:00</Text>

      <View style={{ borderWidth: 1, borderColor: `#060663`, padding: 12, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>IT podpora:</Text>
        <Text>Jméno: Daniela Fedorková</Text>
        <Text>Email: daniela@foto4life.eu</Text>
        <TouchableOpacity onPress={() => Linking.openURL('tel:773212001')}>
          <Text style={{ color:`#060663` }}>Tel číslo: 773 212 001</Text>
        </TouchableOpacity>
      </View>

      <View style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Účetní podpora:</Text>
        <Text>Jméno: Danielle Fedorková</Text>
        <Text>Email: daniela@naseucetni.eu</Text>
        <TouchableOpacity onPress={() => Linking.openURL('tel:777117667')}>
          <Text style={{ color: '#060663' }}>Tel číslo: 777 117 667</Text>
        </TouchableOpacity>
      </View>

      {/* Add other settings options or buttons as needed */}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center horizontally
  },
  logo: {
    width: '100%', 
    resizeMode: 'contain', // Adjust image resizing as needed
    marginTop: 20, // Add top margin for spacing
  }})