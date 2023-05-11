import { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'

// SCREENS
import OnboardScreen from './screens/OnboardScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomePage'
import StatisticStack from './screens/StatisticPage'
import ScenarioStack from './screens/ScenarioPage'
import AutomationStack from './screens/AutomationPage/AutomationStack'
import { AutomationScreenOptions } from './screens/AutomationPage/AutomationStack'
import './ignoreWarnings'
import { createMQTTClient } from './services/mqtt.service'

SplashScreen.preventAutoHideAsync()
  .then((_) => {})
  .catch(console.warn)
import * as SplashScreen from 'expo-splash-screen'
import { Colors } from './constants/colors'
import AuthContextProvider, { AuthContext } from './store/auth-context'
import { UserContextProvider } from './store/userContext'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './redux/store'
import { createInstance } from './services/axios.service'
import { getAllDevices } from './services/device.service'
import { getAllScenarios } from './services/scenario.service'
import { fetchScenarios, setAllScenarios } from './redux/features/scenarioSlice'
import {
  fetchDevices,
  setAllDevices,
  updateState,
} from './redux/features/deviceSlice'
import MQTTCLient from './model/MQTTClient'
import { Alert } from 'react-native'
import LoadingOverlay from './components/UI/LoadingOverlay'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// Splash screen config
SplashScreen.preventAutoHideAsync()
  .then((_) => {})
  .catch(console.warn)

// Before-auth Stack
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboard" component={OnboardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  // Establish MQTT connection
  const mqttClient = MQTTCLient.getInstance()
  const { token } = useContext(AuthContext)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(!mqttClient.connected)
  const [error, setError] = useState(null)

  mqttClient.on('connect', () => {
    setLoading(false)
    setError(null)
  })
  mqttClient.on('error', (err) => {
    setLoading(true)
    setError(err.message)
  })
  mqttClient.on('message', (topic, message) => {
    console.log('message')
    dispatch(updateState({ topic, message: message.toString() }))
  })

  useEffect(() => {
    dispatch(fetchDevices(token))
    dispatch(fetchScenarios(token))
  }, [dispatch, token])

  if (error) return Alert.alert(error)

  if (loading) return <LoadingOverlay />

  return (
    !loading && (
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
            tabBarLabel: 'Scenarios',
            tabBarIcon: ({ focused, size, color }) => (
              <Entypo
                name="flow-tree"
                size={size}
                color={focused ? Colors.orangePrimary : color}
              />
            ),
            tabBarActiveTintColor: Colors.orangePrimary,
          }}
        />
        <Tab.Screen
          name="Sensors"
          component={StatisticStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <Entypo
                name="adjust"
                size={size}
                color={focused ? Colors.orangePrimary : color}
              />
            ),
            tabBarActiveTintColor: Colors.orangePrimary,
          }}
        />
      </Tab.Navigator>
    )
  )
}

// Navigation container
function Navigation() {
  const authCtx = useContext(AuthContext)

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'be-vietnam': require('./assets/fonts/BeVietnamPro-Regular.ttf'),
    'be-vietnam-medium': require('./assets/fonts/BeVietnamPro-Medium.ttf'),
    'epilogue-700': require('./assets/fonts/Epilogue-SemiBold-700.ttf'),
    Pacifico: require('./assets/fonts/Pacifico-Regular.ttf'),
  })

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync()
    }
    if (fontsLoaded) {
      hideSplashScreen()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar style="auto" />
        <AuthContextProvider>
          <UserContextProvider>
            <Navigation />
          </UserContextProvider>
        </AuthContextProvider>
      </Provider>
    </SafeAreaProvider>
  )
}
