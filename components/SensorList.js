import { StyleSheet, View, Text, DeviceEventEmitter } from 'react-native'
import { Row, Table } from 'react-native-table-component'
import { Colors } from '../constants/colors'
import { useEffect, useState } from 'react'

function SensorList({ sensors, fields }) {
  if (!sensors) sensors = []
  return (
    <View style={styles.container}>
      <Table style={styles.table} borderStyle={{ borderWidth: 1 }}>
        <TableHeader fields={fields} />
        {sensors.map((sensor) => (
          <SensorRow key={sensor.id} sensor={sensor} fields={fields} />
        ))}
      </Table>
    </View>
  )
}

function TableHeader({ fields }) {
  const headerData = fields.map((field) => field.toUpperCase())
  return (
    <Row style={styles.header} data={headerData} />
  )
}

function SensorRow({ sensor, fields }) {
  const [data, setData] = useState(fields.map((field) => sensor[field] ?? ''))

  useEffect(() => {
    sensor.mount()
    let s = DeviceEventEmitter.addListener(sensor.topic, (message) => {
      sensor.setValue(message)
      setData(fields.map((field) => sensor[field] ?? ''))
    })

    return () => {
      sensor.unmount()
      s.remove()
    }
  }, [sensor])

  return <Row textStyle={styles.cell} data={data}></Row>
}

const styles = StyleSheet.create({
  container: { marginTop: 10, flex: 1 },
  table: {
    borderWidth: 1,
    borderColor: 'rgba(30, 41, 51, 0.5)',
  },
  header: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    color: 'rgba(30, 41, 51, 0.7)',
    padding: 10,
    alignContent: 'center',
    backgroundColor: Colors.greenPrimary,
    fontWeight: 'bold',
  },
  cell: {
    textAlign: 'left',
    paddingVertical: 10,
    paddingLeft: 10,
  },
})

export default SensorList
