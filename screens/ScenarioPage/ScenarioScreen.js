import { StatusBar } from 'expo-status-bar'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultStyles } from '../../constants/defaultStyle'
import AddNewButton from '../../components/UI/AddNewButton'
import { useContext } from 'react'
import { getAllScenarios } from '../../services/user-data.service'
import useFetch from '../../hooks/useFetchData'
import { createInstance } from '../../services/axios.service'
import { AuthContext } from '../../store/auth-context'
import ScenarioList from '../../components/ScenarioList'
import { useIsFocused } from '@react-navigation/native'

function ScenarioScreen({ navigation }) {
  function handleAddScenario() {
    navigation.navigate('New Scenario')
  }
  const { token } = useContext(AuthContext)
  const isFocused = useIsFocused()
  const [scenarios, loading, fetchFunction] = useFetch(() => {
    if (isFocused) {
      const instance = createInstance(token)
      return getAllScenarios(instance)
    }
  }, [isFocused])

  return (
    <SafeAreaView
      style={defaultStyles.container}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar style="auto" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchFunction} />
        }
      >
        <ScenarioList scenarios={scenarios} />
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
