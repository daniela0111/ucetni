import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

interface SettingsScreenProps {} // Optional: Define props interface

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Podpora</Text>

      <Text style={{ fontSize: 16 }}>V případě nutnosti můžete volat telefonickou podporu ve všední dny od 10:00 do 15:00</Text>

      <View style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>IT podpora:</Text>
        <Text>Jméno: Daniela Fedorková</Text>
        <Text>Email: daniela@foto4life.eu</Text>
        <TouchableOpacity onPress={() => Linking.openURL('tel:773212001')}>
          <Text style={{ color: 'blue' }}>Tel číslo: 773 212 001</Text>
        </TouchableOpacity>
      </View>

      <View style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Účetní podpora:</Text>
        <Text>Jméno: Danielle Fedorková</Text>
        <Text>Email: daniela@naseucetni.eu</Text>
        <TouchableOpacity onPress={() => Linking.openURL('tel:777117667')}>
          <Text style={{ color: 'blue' }}>Tel číslo: 777 117 667</Text>
        </TouchableOpacity>
      </View>

      {/* Add other settings options or buttons as needed */}
    </View>
  );
};

export default SettingsScreen;