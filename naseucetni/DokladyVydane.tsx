import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DokladyVydane = () => {
  return (
    <View style={styles.container}>
      <Text>Doklady Vydané</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DokladyVydane;