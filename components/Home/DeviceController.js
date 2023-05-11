import { useEffect, useState } from 'react'
import {
  DeviceEventEmitter,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'

import { Colors } from '../../constants/colors'
import { useDispatch } from 'react-redux'
import { setState } from '../../redux/features/deviceSlice'

function DeviceController({ device }) {
  const dispatch = useDispatch()
  const { _id, name, state, topic } = device

  const toggleSwitch = () => {
    dispatch(setState({ deviceId: _id, value: !state }))
  }

  return (
    <View style={styles.deviceContainer}>
      <Text numberOfLines={1} style={styles.deviceNameText}>
        {name}
      </Text>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>{state ? 'On' : 'Off'}</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={state}
          trackColor={{ true: Colors.orangePrimary }}
        />
      </View>
    </View>
  )
}

export default DeviceController

const styles = StyleSheet.create({
  deviceContainer: {
    backgroundColor: 'white',
    width: '48%',
    borderRadius: 12,
    padding: 8,
    elevation: 4, // add shadow - android only
    shadowColor: 'black', // add shadow - ios only
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    marginBottom: 18,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  deviceNameText: {
    fontFamily: 'be-vietnam-medium',
    color: 'rgba(30, 41, 51, 1)',
    fontSize: 16,
  },
  toggleText: {
    color: '#798794',
  },
})
