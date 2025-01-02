import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface HomePageProps {
  navigation: any; // Assuming you're using React Navigation
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  const handlePress = (page: string) => {
    // Implement navigation logic here
    navigation.navigate(page); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Domovská stránka</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handlePress('DokladyVydane')}>
          <Image source={require('/Users/danielafedorkova/Documents/GitHub/ucetni/naseucetni/assets/doklady_vydane.png')} style={styles.image} />
          <Text style={styles.imageText}>Doklady vydané</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handlePress('DokladyPrijate')}>
          <Image source={require('./assets/dokldy_prijate.png')} style={styles.image} />
          <Text style={styles.imageText}>Doklady přijaté</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handlePress('Uctenky')}>
          <Image source={require('./assets/uctenky.png')} style={styles.image} />
          <Text style={styles.imageText}>Účtenky</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handlePress('OstatniDoklady')}>
          <Image source={require('./assets/ostatni_dokldy.png')} style={styles.image} />
          <Text style={styles.imageText}>Ostatní doklady</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  imageText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomePage;