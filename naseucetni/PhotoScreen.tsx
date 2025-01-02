import React from 'react';
import { View, Text, Image } from 'react-native';

export default function PhotoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./assets/logo.png')} />
      <Text>Camera</Text>
    </View>
  );
}