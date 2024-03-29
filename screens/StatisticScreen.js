import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import { Colors } from '../constants/colors';
import { UserDataContext } from '../store/user-data-context';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { getAllSensors } from '../services/user-data.service';

function StatisticScreen() {
  const fetchSensorsAndInitialize = async () => {
    setIsLoading(true);

    try {
      const sensorsArr = await getAllSensors(userDataCtx.id);
      userDataCtx.updateAllSensors(sensorsArr);

      setTableData(
        userDataCtx.allSensors.map((sensorObj) => [
          <Text style={styles.nameCell}>{sensorObj.name}</Text>,
          <Text style={styles.typeCell}>{sensorObj.type_sensor}</Text>,
          <Text
            style={
              sensorObj.isOnline ? styles.valueCellOnl : styles.valueCellOff
            }
          >
            {sensorObj.isOnline ? sensorObj.value : 'Offline'}
          </Text>,
        ])
      );
    } catch (err) {
      // TODO: error handling, retry...
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  function onScrollHandler(event) {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY < -12) {
      fetchSensorsAndInitialize();
    }
  }

  const userDataCtx = useContext(UserDataContext);
  const headData = ['Name', 'Type', 'Value'];
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSensorsAndInitialize();
  }, []);

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <ScrollView
      style={styles.container}
      onScroll={onScrollHandler}
      scrollEventThrottle={500}
    >
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
