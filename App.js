import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import OnboardScreen from "./screens/OnboardScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import AutomationScreen from "./screens/AutomationScreen";
import ScenarioScreen from "./screens/ScenarioScreen";
import StatisticScreen from "./screens/StatisticScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={
        {
          //
        }
      }
    >
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Automation" component={AutomationScreen} />
      <Tab.Screen name="Scenario" component={ScenarioScreen} />
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
  return (
    <>
      <StatusBar style="auto" />

      <Navigation />
    </>
  );
}
