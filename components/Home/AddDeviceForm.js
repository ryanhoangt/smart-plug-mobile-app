import React, { Component, useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Colors } from '../../constants/colors'
import { Alert, StyleSheet, View, Text, TextInput } from 'react-native'
import FlatButton from '../UI/FlatButton'

import {
  createNewDevice,
  createNewSensor,
} from '../../services/user-data.service'

import { Picker } from '@react-native-picker/picker'
import { AuthContext } from '../../store/auth-context'
import { createSensor } from '../../redux/features/sensorSlice'
import { createDevice } from '../../redux/features/deviceSlice'

export default function AddDeviceForm({ onCancel }) {
  const dispatch = useDispatch()
  const { token } = useContext(AuthContext)
  const [deviceName, setDeviceName] = useState('')
  const [topic, setTopic] = useState('')
  const [deviceType, setDeviceType] = useState('')

  const deviceTypeOptions = [
    { label: 'Light Sensor', value: 'light' },
    { label: 'Temperature Sensor', value: 'temperature' },
    { label: 'Humidity Sensor', value: 'humidity' },
    { label: 'Sound Sensor', value: 'sound' },
    { label: 'Movement Sensor', value: 'movement' },
    { label: 'Unknown Sensor', value: 'unknown' },
    { label: 'Non-sensor Devices', value: 'non_ss' },
  ]

  const onCreateClicked = async () => {
    let res = null
    if (deviceType == 'non_ss') {
      const device = { name: deviceName, topic }
      res = await dispatch(createDevice({ token, device }))
    } else {
      const sensorData = { name: deviceName, topic, type_sensor: deviceType }
      res = await dispatch(createSensor({ token, sensor: sensorData }))
    }

    const status = res.meta.requestStatus
    setTimeout(onCancel, 1000)
    if (status == 'rejected') {
      // setError('There is an error in creating sensor')
      return Alert.alert('There is an error in creating')
    } else if (status == 'fulfilled') {
      setTopic('')
      setDeviceName('')
      setDeviceType('')
      return Alert.alert('Creating successfully')
    }
    console.log(deviceName, deviceType, topic)
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Device's name:</Text>
        <TextInput
          value={deviceName}
          onChangeText={setDeviceName}
          style={styles.textInput}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Device's topic:</Text>
        <TextInput
          value={topic}
          onChangeText={setTopic}
          style={styles.textInput}
        />
      </View>

      <View style={[styles.flex, styles.inputGroup]}>
        <Text style={[styles.label, { flex: 0.4 }]}>Device Type:</Text>
        <Picker
          style={styles.picker}
          selectedValue={deviceType}
          onValueChange={setDeviceType}
        >
          {deviceTypeOptions.map(({ label, value }) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttons}>
        <FlatButton style={[styles.button, styles.flat]} onPress={onCancel}>
          Cancel
        </FlatButton>
        <FlatButton style={styles.button} onPress={onCreateClicked}>
          Create
        </FlatButton>
      </View>
    </View>
  )
}

function DeviceTypePicker() {}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greenPrimary,
    padding: 16,
    height: 450,
    margin: 10,
    borderRadius: 40,
    borderWidth: 4,
    borderStyle: 'dashed',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
  },
  label: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    color: 'black',
  },
  inputGroup: {
    padding: 16,
    // marginTop: 16,
  },
  picker: {
    height: 40,
    flex: 0.6,
    marginTop: -85,
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  buttons: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  flat: {
    backgroundColor: 'transparent',
  },
  textInput: {
    margin: 4,
    padding: 8,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: 'white',
  },
})
