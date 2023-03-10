import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import ScenarioButton from '../../components/UI/ScenarioButton';
import Header from '../../components/UI/Header';
import { defaultStyles } from '../../constants/defaultStyle';

export const ScenarioScreenOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: Colors.background,
  },
};

function ScenarioScreen({navigation}) {
  function handleAddScenario() {
    navigation.navigate("New Scenario")
  }

  return (
    <SafeAreaView style={defaultStyles.container} edges={["bottom", "left", "right"]}>
      <StatusBar style="auto" />
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
  scenarioList: {
    // marginTop: 12,
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
