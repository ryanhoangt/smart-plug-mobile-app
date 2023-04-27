import { StatusBar } from 'expo-status-bar'
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import { Colors } from '../../constants/colors'
import { useContext, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../store/auth-context'
import AddNewButton from '../../components/UI/AddNewButton'
import AddDeviceForm from '../../components/Home/AddDeviceForm'
import { getAllDevices } from '../../services/device.service'
import { getAllScenarios } from '../../services/scenario.service'
import useFetch from '../../hooks/useFetchData'
import { createInstance } from '../../services/axios.service'
import DeviceList from '../../components/DeviceList'
import ScenarioList from '../../components/ScenarioList'
import Header from './components/Header'
import { UserContext } from '../../store/userContext'

function HomeScreen() {
  // HANDLERS
  function addNewDeviceHandler() {
    sheetRef.current.snapTo(0)
  }

  // CONTEXTS, STATES, REFS
  const { token } = useContext(AuthContext)
  const { id } = useContext(UserContext)
  const sheetRef = useRef(null)

  const [data, loading, fetchFunction] = useFetch(() => {
    try {
      const instance = createInstance(token)
      return Promise.all([getAllDevices(instance), getAllScenarios(instance)])
    } catch (err) {
      return Alert.alert('Something wrong happens')
    }
  })

  function onFormCancel() {
    sheetRef.current.snapTo(2)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.homeContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchFunction} />
        }
      >
        <StatusBar style="auto" />
        <Header />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Scenarios</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ScenarioList scenarios={data && data[1]} />
          </ScrollView>
        </View>
        <View style={styles.devicesContainer}>
          <Text style={styles.sectionText}>Devices</Text>
          <Text style={styles.addDeviceInstructionText}>
            To add a new device, please manually connect it to the Microbit
            board provided first.
          </Text>
          <AddNewButton
            style={styles.addNewBtn}
            onBtnPress={addNewDeviceHandler}
            btnText="Add New Device"
          />
          <DeviceList devices={data && data[0]} />
        </View>
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[600, 500, -100]}
        borderRadius={20}
        renderContent={() => (
          <AddDeviceForm
            onCancel={onFormCancel}
            fetchDevicesAndScenarios={fetchFunction}
            token={token}
            userId={id}
          />
        )}
        initialSnap={2}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  devicesContainer: {
    // backgroundColor: "red",
    flexDirection: 'row',
    flexWrap: 1,
    justifyContent: 'space-between',
    gap: 12,
    rowGap: 12,
  },
  scenarioBtn: {
    backgroundColor: Colors.bluePrimary,
    margin: 8,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 4, // add shadow - android only
    shadowColor: 'black', // add shadow - ios only
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  sectionText: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    fontWeight: 800,
    color: 'rgba(30, 41, 51, 0.7)',
  },
  addDeviceInstructionText: {
    marginVertical: 10,
    color: 'rgba(30, 41, 51, 0.5)',
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 13,
  },
  welcomeText: {
    fontFamily: 'epilogue-700',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 5,
  },
  addNewBtn: {
    width: '100%',
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 20,
  },
})

export default HomeScreen
