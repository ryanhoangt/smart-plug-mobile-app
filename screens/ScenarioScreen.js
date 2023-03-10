import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import ScenarioButton from '../components/UI/ScenarioButton';
import Header from '../components/UI/Header';

export const ScenarioScreenOptions = {
  // title: 'My home',
  headerShown: false,
  headerStyle: {
    backgroundColor: Colors.background,
  },
  // headerTintColor: '#fff',
  // headerTitleStyle: {
  //   fontWeight: 'bold',
  // },
};

function ScenarioScreen() {
  function handleAddScenario() {
    console.log('Add scenario');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header title="Scenario" />
      <ScrollView style={styles.scenarioList}>
        <ScenarioButton text="Go out" />
        <ScenarioButton text="Morning" />
        <ScenarioButton text="Evening" />
        <View style={styles.addBtn}>
          <Button
            onPress={handleAddScenario}
            color={Colors.grayPrimary}
            title="+ Add new scenario"
            accessibilityLabel="Add new scenario"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  scenarioList: {
    marginTop: 12,
    // backgroundColor: "red",
    // flex: 1
  },
  addBtn: {
    marginTop: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: Colors.grayPrimary,
    borderRadius: 6,
  },
});

export default ScenarioScreen;
