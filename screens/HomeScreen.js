import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import FlatButton from '../components/UI/FlatButton';
import DeviceController from '../components/Home/DeviceController';
import { Colors } from '../constants/colors';
import { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import { DEV_BACKEND_IP } from '@env';
import AddNewButton from '../components/UI/AddNewButton';
import AddDeviceForm from '../components/Home/AddDeviceForm';
import { NativeBaseProvider } from 'native-base';

const avatarPlaceholderImg = require('../assets/images/avatar-placeholder.jpg');

function HomeScreen() {
  function getLiveTime() {
    const date = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const timeString = date.toLocaleString('en-US', options);
    setTimeString(timeString.toUpperCase());
    setTimeout(getLiveTime, 1000); // Update every second
  }

  // HANDLERS
  function addNewDeviceHandler() {
    // TODO: show a form sliding up
    sheetRef.current.snapTo(0);
  }

  function avatarPressHandler() {
    // Logout for now
    authCtx.onLogout();
  }

  // CONTEXTS, STATES, REFS
  const authCtx = useContext(AuthContext);
  const [timeString, setTimeString] = useState('');
  const sheetRef = useRef(null);

  useEffect(() => {
    getLiveTime();

    const testAuthBackend = async () => {
      try {
        const resp = await axios.get(
          `http://${DEV_BACKEND_IP}:5000/test-firebase-auth-intg`,
          {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          }
        );

        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };

    testAuthBackend();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.homeContainer}>
        <StatusBar style="auto" />
        <View style={styles.welcomeHeading}>
          <View style={styles.headingTextContainer}>
            <Text style={{ color: '#9BA4B0' }}>{timeString}</Text>
            <Text style={[styles.welcomeText, { fontWeight: 800 }]}>
              Welcome, Hoang!
            </Text>
          </View>
          <Pressable style={styles.avatarImg} onPress={avatarPressHandler}>
            <Image source={avatarPlaceholderImg} style={styles.avatarImg} />
          </Pressable>
        </View>
        <View style={styles.scenariosContainer}>
          <Text style={styles.sectionText}>Favorite Scenarios</Text>
          <FlatButton fontSize={20} textAlign="left" style={styles.scenarioBtn}>
            Go out
          </FlatButton>
          <FlatButton fontSize={20} textAlign="left" style={styles.scenarioBtn}>
            Morning
          </FlatButton>
        </View>
        <View style={styles.devicesContainer}>
          <Text style={styles.sectionText}>Devices</Text>
          <Text style={styles.addDeviceInstructionText}>
            To add a new device, please manually connect it to the Microbit
            board provided first.
          </Text>
          <AddNewButton
            style={{
              width: '100%',
              marginHorizontal: 0,
              marginTop: 0,
              marginBottom: 20,
            }}
            onBtnPress={addNewDeviceHandler}
          />
          {/* <View> */}
          <DeviceController deviceName="Air Conditioner" />
          <DeviceController deviceName="Room Lights" />
          <DeviceController deviceName="Speakers" />
          {/* </View> */}
        </View>
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[600, 500, -50]}
        borderRadius={20}
        renderContent={() => <AddDeviceForm />}
        initialSnap={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    paddingHorizontal: 20,
  },
  welcomeHeading: {
    // backgroundColor: "green",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
  },
  headingTextContainer: {},
  scenariosContainer: {
    // backgroundColor: Colors.orangePrimary,
    marginBottom: 30,
  },
  devicesContainer: {
    // backgroundColor: "red",
    flexDirection: 'row',
    flexWrap: 1,
    justifyContent: 'space-between',
    gap: 12,
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  scenarioBtn: {
    backgroundColor: Colors.bluePrimary,
    margin: 8,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 4, // add shadow - android only
    shadowColor: 'black', // add shadow - ios only
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  sectionText: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: 'rgba(30, 41, 51, 0.7)',
  },
  addDeviceInstructionText: {
    color: 'rgba(30, 41, 51, 0.5)',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 13,
  },
  welcomeText: {
    fontFamily: 'epilogue-700',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 5,
  },
});

export default HomeScreen;
