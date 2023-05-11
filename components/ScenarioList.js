import { useSelector } from 'react-redux'
import ScenarioButton from './UI/ScenarioButton'
import { Alert, Text } from 'react-native'
import LoadingOverlay from './UI/LoadingOverlay'

function ScenarioList() {
  const { scenarios, loading, error } = useSelector((state) => state.scenarios)

  if (error) return Alert.alert('Error in fetching scenarios')

  return scenarios.map(({ _id, name }) => (
    <ScenarioButton key={_id} text={name} id={_id} />
  ))
}

export default ScenarioList
