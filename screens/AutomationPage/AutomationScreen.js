import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import ScenarioButton from '../../components/UI/ScenarioButton';
import Header from '../../components/UI/Header';
import { defaultStyles } from '../../constants/defaultStyle';
import { useState } from 'react';


function AutomationScreen({ navigation }) {
  // var [count, setCount] = useState(0);

  function handleAddAutomation() {
    navigation.navigate("New Automation")
  }

  function onPress() {
    // setCount(count+1)
    navigation.navigate("Detail Automation")
  }

  return (
    <SafeAreaView style={defaultStyles.container} edges={["bottom", "left", "right"]}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scenarioList}>
        <ScenarioButton
          onPress={onPress}
          text="Living Room" />
        <ScenarioButton
          onPress={onPress}
          text="Automation 1" />
        <ScenarioButton
          onPress={onPress}
          text="Automation 2" />
        <View style={styles.addBtn}>
          <Button
            onPress={handleAddAutomation}
            color={Colors.grayPrimary}
            title="+ Add new Automation"
            accessibilityLabel="Add new Automation"
          />
        </View>
        {/* <Text>Count: {count}</Text> */}
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

export default AutomationScreen;
