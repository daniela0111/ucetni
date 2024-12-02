// HomePage.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

interface HomePageProps {
  navigation: any; // You can replace 'any' with a more specific type if you have defined navigation types
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main navigation</Text>
      <View>
        <Button
          title="Doklady přijaté"
          color="#060663"
          onPress={() => {
            console.log('Doklady přijaté pressed');
            navigation.navigate('DokladyPrijate'); // Navigate to another screen
          }}
        />
      </View>
      <View>
        <Button
          title="Doklady vydané"
          color="#060663"
          onPress={() => {
            console.log('Doklady vydané pressed');
            navigation.navigate('DokladyVydane'); // Navigate to another screen
          }}
        />
      </View>
      <View>
        <Button
          title="Účtenky"
          color="#060663"
          onPress={() => {
            console.log('Účtenky pressed');
            navigation.navigate('Uctenky'); // Navigate to another screen
          }}
        />
      </View>
      <View>
        <Button
          title="Ostatní dokumenty"
          color="#060663"
          onPress={() => {
            console.log('Ostatní doklady pressed');
            navigation.navigate('OstatniDoklady'); // Navigate to another screen
          }}
        />
      </View>
    </View>
  );
};

export default HomePage;