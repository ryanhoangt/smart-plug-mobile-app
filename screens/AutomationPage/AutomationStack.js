import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AutomationScreen from './AutomationScreen';
import AddAutomationScreen from './AddAutomationScreen';
import DetailAutomationScreen from './DetailAutomationScreen';
import { StyleSheet } from "react-native";
import { Colors } from '../../constants/colors';

const Stack = createNativeStackNavigator();

export const AutomationScreenOptions = {
    headerShown: false,
    headerStyle: {
        backgroundColor: Colors.background,
    },
};

const AutomationStackOption = ({ navigation, back }) => ({
    headerTintColor: Colors.orangePrimary,
    headerTitleStyle: {
        color: '#000',
    },
})

function AutomationStack() {
    return (
        <Stack.Navigator screenOptions={AutomationStackOption}>
            <Stack.Screen
                name="Automation" component={AutomationScreen}
            />
            <Stack.Screen
                name="New Automation" component={AddAutomationScreen}
            />
            <Stack.Screen
                name="Detail Automation" component={DetailAutomationScreen}
            />
        </Stack.Navigator>
    )
}

export default AutomationStack

const styles = StyleSheet.create({})
