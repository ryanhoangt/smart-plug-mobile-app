import { ScrollView, StyleSheet, Text } from 'react-native'
import AddNewButton from '../../components/UI/AddNewButton'
import SensorTable from '../../components/SensorTable'

function StatisticScreen({ navigation }) {
  function gotoAddSensorScreen() {
    navigation.navigate('New Sensor')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.instructionText}>
        To add a new sensor, please manually connect it to the central server.
      </Text>

      <SensorTable />

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
