import { useContext } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native'
import { getAllSensors } from '../../services/sensor.service'
import useFetch from '../../hooks/useFetchData'
import { AuthContext } from '../../store/auth-context'
import { createInstance } from '../../services/axios.service'
import SensorList from '../../components/SensorList'
import AddNewButton from '../../components/UI/AddNewButton'

function StatisticScreen({ navigation }) {
  const fields = ['name', 'type', 'value']

  const { token } = useContext(AuthContext)
  const [data, loading, fetchFunction] = useFetch(async () => {
    const instance = createInstance(token)
    const sensors = await getAllSensors(instance)
    return sensors
  })

  function gotoAddSensorScreen() {
    navigation.navigate('New Sensor')
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchFunction} />
      }
    >
      <Text style={styles.instructionText}>
        To add a new sensor, please manually connect it to the central server.
      </Text>

      <SensorList sensors={data} fields={fields} />
      <AddNewButton
        onBtnPress={gotoAddSensorScreen}
        style={styles.addNewBtn}
        btnText="Add new sensor"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  instructionText: {
    color: 'rgba(30, 41, 51, 0.5)',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 10,
  },
  addNewBtn: {
    width: '100%',
    marginHorizontal: 0,
    marginTop: 20,
    marginBottom: 20,
  },
})

export default StatisticScreen
