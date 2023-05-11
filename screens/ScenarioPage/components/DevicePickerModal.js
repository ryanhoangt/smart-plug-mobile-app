import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DeviceItem from './DeviceItem'
import { Colors } from '../../../constants/colors'

function DevicePickerModal({
  devices,
  pickedDevices,
  setPickedDevices,
  onClose,
}) {
  const pushToList = (device) => {
    if (!pickedDevices.some((picked) => picked.id == device.id)) {
      setPickedDevices([...pickedDevices, device])
    }
  }

  const removeFromList = (device) => {
    setPickedDevices(pickedDevices.filter((picked) => picked.id != device.id))
  }

  const onScrollHandler = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y
    if (scrollY < -6) {
      onClose()
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={onScrollHandler}
        scrollEventThrottle={200}
        style={styles.deviceList}
      >
        {devices.map((device) => (
          <DeviceItem
            key={device.id}
            device={device}
            pushToList={pushToList}
            removeFromList={removeFromList}
          />
        ))}

        <View style={styles.btnContainer}>
          <Button title="Cancel" />
          <Button title="Save" />
        </View>
      </ScrollView>
    </View>
  )
}

export default DevicePickerModal

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 550,
    // padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    alignItems: 'center',
  },
  deviceList: {
    width: '100%',
  },
  line: {
    width: 100,
    height: 6,
    backgroundColor: Colors.grayPrimary,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
