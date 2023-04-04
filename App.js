import { useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign, Entypo } from '@expo/vector-icons';

// SCREENS
import OnboardScreen from './screens/OnboardScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import AutomationScreen from './screens/AutomationPage/AutomationScreen';
import { ScenarioScreenOptions } from './screens/ScenarioPage/ScenarioScreen';
import StatisticScreen from './screens/StatisticScreen';
import ScenarioStack from './screens/ScenarioPage';
import AutomationStack from './screens/AutomationPage/AutomationStack';
import { AutomationScreenOptions } from './screens/AutomationPage/AutomationStack';

SplashScreen.preventAutoHideAsync()
  .then((_) => {})
  .catch(console.warn);
import * as SplashScreen from 'expo-splash-screen';
import { Image } from 'react-native';
import { Colors } from './constants/colors';
import AuthContextProvider, { AuthContext } from './store/auth-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Splash screen config
SplashScreen.preventAutoHideAsync()
  .then((_) => {})
  .catch(console.warn);

// Before-auth Stack
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        //
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboard" component={OnboardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// After-auth Stack
const viewSensorIcon = require('./assets/icons/view-sensor-icon-64x64.png');
const viewSensorIconOrange = require('./assets/icons/view-sensor-64x64-orange.png');
const scenarioIcon = require('./assets/icons/scenario-icon-64x64.png');
const scenarioIconOrange = require('./assets/icons/scenario-icon-64x64-orange.png');
function AuthenticatedStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => (
            <Entypo
              name="home"
              size={size}
              color={focused ? Colors.orangePrimary : color}
            />
          ),
          tabBarActiveTintColor: Colors.orangePrimary,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen 
        name="Automation Stack" 
        component={AutomationStack} 
        options={AutomationScreenOptions}  
      />
      <Tab.Screen
        name="Scenario Stack"
        component={ScenarioStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Scenario',
          tabBarIcon: ({ focused, size }) => (
            <Image
              style={{ height: size, width: size }}
              source={focused ? scenarioIconOrange : scenarioIcon}
            />
          ),
          tabBarActiveTintColor: Colors.orangePrimary,
        }}
      />
      <Tab.Screen
        name="Sensors' Data"
        component={StatisticScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              style={{ height: size, width: size }}
              source={focused ? viewSensorIconOrange : viewSensorIcon}
            />
          ),
          tabBarActiveTintColor: Colors.orangePrimary,
        }}
      />
    </Tab.Navigator>
  );
}

// Navigation container
function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'be-vietnam': require('./assets/fonts/BeVietnamPro-Regular.ttf'),
    'epilogue-700': require('./assets/fonts/Epilogue-SemiBold-700.ttf'),
    Pacifico: require('./assets/fonts/Pacifico-Regular.ttf'),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }
    if (fontsLoaded) {
      hideSplashScreen();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
