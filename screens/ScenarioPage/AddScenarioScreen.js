import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Pressable,
  Alert,
} from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { defaultStyles } from '../../constants/defaultStyle'
import CustomButton from '../../components/UI/CustomButton'
import DevicePickerModal from './components/DevicePickerModal'
import BottomSheet from 'reanimated-bottom-sheet'
import useFetch from '../../hooks/useFetchData'
import { getAllDevices } from '../../services/device.service'
import PickedDevice from './components/PickedDevice'
import { Colors } from '../../constants/colors'
import { AuthContext } from '../../store/auth-context'
import { createInstance } from '../../services/axios.service'
import { saveScenario } from '../../services/scenario.service'

export default function AddScenarioScreen({ navigation }) {
  const {token} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [pickedDevices, setPickedDevices] = useState([])
  const sheetRef = useRef(null)
  const [devices, loading] = useFetch((instance) => {
    return getAllDevices(instance)
  })

  const openDevicePicker = () => {
    sheetRef.current.snapTo(0)
  }

  const closeDevicePicker = () => {
    sheetRef.current.snapTo(2)
  }

  const onSaveBtnClick = () => {
    const instance = createInstance(token)
    const actions = pickedDevices.map(({ id, state }) => ({
      device: id,
      state,
    }))
    saveScenario(instance, name, actions)
      .then(() => {
        setTimeout(() => {
          navigation.navigate('All Scenarios')
        }, 2000)
        return Alert.alert("Add scenario successfully")
      })
      .catch((err) => console.error(err))
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TextInput
          onChangeText={setName}
          value={name}
          style={styles.nameInput}
          placeholder="Scenario name:"
        />
        <View style={styles.section}>
          <Text style={defaultStyles.sectionTitle}>Accessories</Text>
          <View style={styles.deviceList}>
            {pickedDevices.map((device) => (
              <PickedDevice key={device.id} device={device} />
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <CustomButton
            onPress={openDevicePicker}
            primary
            first
            title="Add devices"
          />
          <CustomButton primary title="Test this scenario" />
          <CustomButton
            onPress={onSaveBtnClick}
            last
            title="Save the scenario"
          />
        </View>
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[550, 300, 0]}
        borderRadius={10}
        renderContent={() => (
          <DevicePickerModal
            devices={devices}
            pickedDevices={pickedDevices}
            setPickedDevices={setPickedDevices}
            onClose={closeDevicePicker}
          />
        )}
        initialSnap={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  nameInput: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  section: {
    marginVertical: 24,
  },
  deviceList: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    columnGap: 12,
  },
  saveBtn: {
    width: 150,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: Colors.orangePrimary,
    borderRadius: 20,
  },
})
