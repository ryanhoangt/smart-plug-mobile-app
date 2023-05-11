import { ScrollView, StyleSheet, Text } from 'react-native'
import AddNewButton from '../../components/UI/AddNewButton'
import SensorTable from '../../components/SensorTable'
import { useDispatch } from 'react-redux'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../store/auth-context'
import { fetchSensors } from '../../redux/features/sensorSlice'

function StatisticScreen({ navigation }) {
  const dispatch = useDispatch()
  const { token } = useContext(AuthContext)

  useEffect(() => {
    dispatch(fetchSensors(token))
  }, [dispatch, token])

  const onAddBtnClicked = () => navigation.navigate('New Sensor')

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.instructionText}>
        To add a new sensor, please manually connect it to the central server.
      </Text>

      <SensorTable />

      <AddNewButton
        onBtnPress={onAddBtnClicked}
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
