import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import OnboardScreen from './screens/OnboardScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import AutomationScreen from './screens/AutomationScreen';
import ScenarioScreen, {
  ScenarioScreenOptions,
} from './screens/ScenarioPage/ScenarioScreen';
import StatisticScreen from './screens/StatisticScreen';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import ScenarioStack from './screens/ScenarioPage';

SplashScreen.preventAutoHideAsync()
  .then((_) => {})
  .catch(console.warn);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={
        {
          //
        }
      }>
      <Stack.Screen name="Onboard" component={OnboardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// TODO: stack of screens after successfully authenticated
function AuthenticatedStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen name="Automation" component={AutomationScreen} />
      <Tab.Screen
        name="Scenario"
        component={ScenarioStack}
        options={ScenarioScreenOptions}
      />
      <Tab.Screen name="Statistic" component={StatisticScreen} />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      {/* <AuthStack /> */}
      <AuthenticatedStack />
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'be-vietnam': require('./assets/fonts/BeVietnamPro-Regular.ttf'),
    'epilogue-700': require('./assets/fonts/Epilogue-SemiBold-700.ttf'),
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

      <Navigation />
    </SafeAreaProvider>
  );
}
