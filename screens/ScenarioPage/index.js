import { Button, StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScenarioScreen from './ScenarioScreen';
import AddScenarioScreen from './AddScenarioScreen';
import { Colors } from '../../constants/colors';

const Stack = createNativeStackNavigator();

const ScenarioStackOptions = ({ navigation, back }) => ({
  headerTintColor: Colors.orangePrimary,
  headerTitleStyle: {
    color: '#000',
  },
});

const NewScenarioOptions = {
  headerRight: () => (
    <Button
      onPress={() => {
        console.log('Save scenario');
      }}
      color={Colors.orangePrimary}
      title="Done"
    />
  ),
};

export default function ScenarioStack() {
  return (
    <Stack.Navigator screenOptions={ScenarioStackOptions}>
      <Stack.Screen name="Scenario" component={ScenarioScreen} />
      <Stack.Screen
        options={NewScenarioOptions}
        name="New Scenario"
        component={AddScenarioScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
