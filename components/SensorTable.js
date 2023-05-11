import { StyleSheet, View, Alert } from 'react-native'
import { Row, Rows, Table } from 'react-native-reanimated-table'
import { Colors } from '../constants/colors'
import { useSelector } from 'react-redux'
import LoadingOverlay from './UI/LoadingOverlay'
import { selectSensors } from '../redux/features/sensorSlice'
import { SensorFactory } from '../model/sensor'

function SensorTable() {
  const { sensors, loading, error } = useSelector(selectSensors)

  if (loading) return <LoadingOverlay />

  if (error) return Alert.alert(error)

  const sensorObjs = sensors.map((sensor) => SensorFactory.createSensor(sensor))
  const tableData = sensorObjs.map((sensor) => [
    sensor.name,
    sensor.type,
    sensor.value,
  ])
  const headers = ['NAME', 'TYPE', 'VALUE']

  return (
    <View style={styles.container}>
      <Table style={styles.table} borderStyle={{ borderWidth: 1 }}>
        <Row
          textStyle={styles.headerText}
          style={styles.header}
          data={headers}
        />
        <Rows data={tableData} textStyle={styles.cell} />
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginTop: 10, flex: 1 },
  table: {},
  header: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    color: 'rgba(30, 41, 51, 0.7)',
    alignContent: 'center',
    backgroundColor: Colors.greenPrimary,
    fontWeight: 'bold',
  },
  headerText: {
    paddingLeft: 10,
    textAlign: 'left',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  cell: {
    textAlign: 'left',
    paddingVertical: 10,
    paddingLeft: 10,
  },
})

export default SensorTable
