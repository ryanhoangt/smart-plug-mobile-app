import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScenarioScreen from './ScenarioScreen';
import AddScenarioScreen from './AddScenarioScreen';
import { getHeaderTitle } from '@react-navigation/elements';
import Header from '../../components/UI/Header';
import BackButton from '../../components/UI/BackButton';
import { Colors } from '../../constants/colors';

const Stack = createNativeStackNavigator();

const ScenarioStackOptions = ({ navigation, back }) => ({
  headerTintColor: Colors.orangePrimary,
  headerTitleStyle: {
    color: '#000',
  },
  // headerRight: () => (
  //   <Button color={Colors.orangePrimary} title='Done' />
  // )
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
    // <SafeAreaView>
    <Stack.Navigator screenOptions={ScenarioStackOptions}>
      <Stack.Screen name="Scenario" component={ScenarioScreen} />
      <Stack.Screen
        options={NewScenarioOptions}
        name="New Scenario"
        component={AddScenarioScreen}
      />
    </Stack.Navigator>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
