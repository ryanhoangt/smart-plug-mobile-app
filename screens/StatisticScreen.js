import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import { Colors } from '../constants/colors';
import { SENSORS } from '../data/sensors-data';

function StatisticScreen() {
  const headData = ['Name', 'Type', 'Value'];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(
      SENSORS.map((sensor) => [
        <Text style={styles.nameCell}>{sensor.name}</Text>,
        <Text style={styles.typeCell}>{sensor.type}</Text>,
        <Text
          style={sensor.isOnline ? styles.valueCellOnl : styles.valueCellOff}
        >
          {sensor.isOnline ? sensor.value : 'Offline'}
        </Text>,
      ])
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.addSensorInstructionText}>
        To add a new sensor, please manually connect it to the central server.
      </Text>
      <View style={styles.tableContainer}>
        <Table
          borderStyle={{ borderWidth: 1, borderColor: 'rgba(30, 41, 51, 0.5)' }}
        >
          <Row
            style={styles.headerStyle}
            data={headData.map((headTxt) => (
              <Text style={styles.headText}>{headTxt}</Text>
            ))}
          />
          <Rows data={tableData} />
        </Table>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  addSensorInstructionText: {
    color: 'rgba(30, 41, 51, 0.5)',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 10,
  },
  tableContainer: {
    marginTop: 10,
  },
  tableText: { margin: 10 },
  headerStyle: {
    height: 40,
    alignContent: 'center',
    backgroundColor: Colors.greenPrimary,
  },
  headText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: 'rgba(30, 41, 51, 0.7)',
    padding: 8,
  },
  nameCell: { fontStyle: 'italic', padding: 10 },
  typeCell: { fontWeight: 'bold', padding: 10 },
  valueCellOnl: {
    fontWeight: '800',
    padding: 10,
    color: Colors.bluePrimary,
  },
  valueCellOff: {
    fontWeight: '800',
    padding: 10,
    color: Colors.orangePrimary,
  },
});

export default StatisticScreen;
