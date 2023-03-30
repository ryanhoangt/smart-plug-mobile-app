import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

function OnboardScreen() {
  const navigation = useNavigation();

  const getStartedHandler = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.smartplug}> Smart Plug</Text>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('../assets/images/on-board-illustrator.png')}
        />
      </View>
      <View>
        <Text style={styles.label}>Control Anywhere</Text>
      </View>
      <View style={styles.daddy}>
        <Text style={styles.texat}>Control your home with a tap.</Text>
        <Text style={styles.texat}> Adjust your thermostat, turn off</Text>
        <Text style={styles.texat}> lights and more, all in one app.</Text>
        <Text style={styles.texat}>Welcome to Smart Plug.</Text>
      </View>
      <TouchableOpacity
        onPress={getStartedHandler}
        style={styles.getstartedButton}
      >
        <Text style={styles.getstartedText}>Get started </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  smartplug: {
    marginTop: 50,
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgba(126, 175, 213, 1)',
    marginBottom: 20,
    alignItems: 'center',
    fontFamily: 'Pacifico',
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  getstartedButton: {
    height: 50,
    width: '50%',
    borderWidth: 0,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'rgba(250,100,0,1)',
  },
  texat: {
    fontSize: 18,
    color: 'rgba(166, 166, 166, 1)',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getstartedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    // paddingTop: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex',
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default OnboardScreen;
