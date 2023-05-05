import { Button } from "react-native";
import AddSensorScreen from "./AddSensorScreen";
import StatisticScreen from "./StatisticScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from "../../constants/colors";

const Stack = createNativeStackNavigator()

function StatisticStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Statistics" component={StatisticScreen} />
      <Stack.Screen
        options={AddScrenarioOption}
        name="New Sensor"
        component={AddSensorScreen}
      />
    </Stack.Navigator>
  )
}

const AddScrenarioOption = {
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

export default StatisticStack
