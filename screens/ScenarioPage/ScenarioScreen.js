import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultStyles } from '../../constants/defaultStyle'
import AddNewButton from '../../components/UI/AddNewButton'
import ScenarioList from '../../components/ScenarioList'

function ScenarioScreen({ navigation }) {
  function handleAddScenario() {
    navigation.navigate('New Scenario')
  }

  return (
    <SafeAreaView
      style={defaultStyles.container}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar style="auto" />
      <ScrollView>
        <ScenarioList />
        <AddNewButton
          onBtnPress={handleAddScenario}
          btnText="Add New Scenarios"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default ScenarioScreen
