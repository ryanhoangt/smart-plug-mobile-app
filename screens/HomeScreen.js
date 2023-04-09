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
import { BACKEND_HOST } from '@env';
import AddNewButton from '../components/UI/AddNewButton';
import AddDeviceForm from '../components/Home/AddDeviceForm';
import { NativeBaseProvider } from 'native-base';
import { UserDataContext } from '../store/user-data-context';
import Device from '../model/device';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import Scenario from '../model/scenario';
import { getAllDevices, getAllScenarios } from '../services/user-data.service';

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

  const fetchDevicesAndScenarios = async () => {
    setIsLoading(true);

    try {
      // fetch all devices and store
      const devicesArr = await getAllDevices(userDataCtx.id);
      userDataCtx.updateAllDevices(devicesArr);

      // fetch all scenarios without actions and store
      const scenariosArr = await getAllScenarios(userDataCtx.id);
      userDataCtx.updateAllScenarios(scenariosArr);
    } catch (err) {
      // TODO: handle error, retry..., user scroll..
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // HANDLERS
  function addNewDeviceHandler() {
    sheetRef.current.snapTo(0);
  }

  function avatarPressHandler() {
    // Logout for now
    authCtx.onLogout();
    userDataCtx.onLogout();
  }

  function onScrollHandler(event) {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY < -12) {
      fetchDevicesAndScenarios();
    }
  }

  // CONTEXTS, STATES, REFS
  const authCtx = useContext(AuthContext);
  const userDataCtx = useContext(UserDataContext);
  const [timeString, setTimeString] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const sheetRef = useRef(null);

  useEffect(() => {
    getLiveTime();

    fetchDevicesAndScenarios();
  }, []);

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.homeContainer}
        onScroll={onScrollHandler}
        scrollEventThrottle={500}
      >
        <StatusBar style="auto" />
        <View style={styles.welcomeHeading}>
          <View style={styles.headingTextContainer}>
            <Text style={{ color: '#9BA4B0' }}>{timeString}</Text>
            <Text style={[styles.welcomeText, { fontWeight: 800 }]}>
              Welcome, {userDataCtx.name}!
            </Text>
          </View>
          <Pressable style={styles.avatarImg} onPress={avatarPressHandler}>
            <Image source={avatarPlaceholderImg} style={styles.avatarImg} />
          </Pressable>
        </View>
        <View style={styles.scenariosContainer}>
          <Text style={styles.sectionText}>Favorite Scenarios</Text>
          {userDataCtx.allScenarios
            .filter((obj) => obj.isFavorite === true)
            .map((scenarioObj) => {
              return (
                <FlatButton
                  fontSize={20}
                  textAlign="left"
                  style={styles.scenarioBtn}
                  key={scenarioObj._id}
                >
                  {scenarioObj.name}
                </FlatButton>
              );
            })}
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
            btnText="Add New Device"
          />
          {/* <View> */}
          {userDataCtx.allDevices
            ? userDataCtx.allDevices.map((deviceObj) => (
                <DeviceController
                  deviceName={deviceObj.name}
                  key={deviceObj._id}
                />
              ))
            : ''}

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
