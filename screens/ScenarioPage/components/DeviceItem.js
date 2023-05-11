import { StyleSheet, Text, View, Pressable } from 'react-native'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../constants/colors'

function DeviceItem({ device, pushToList, removeFromList }) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (checked) {
      pushToList(device)
    } else {
      removeFromList(device)
    }
  }, [checked])

  const handleCheckboxPress = () => {
    setChecked((prev) => {
      return !prev
    })
  }
  return (
    <Pressable
      onPress={handleCheckboxPress}
      style={[
        styles.container,
        checked ? { backgroundColor: Colors.orangeLight } : {},
      ]}
    >
      <Text style={styles.text}>{device.name}</Text>
      <View style={styles.checkbox}>
        <AnimatedCheckbox
          checked={checked}
          highlightColor={Colors.orangePrimary}
          checkmarkColor="#ffffff"
          boxOutlineColor={Colors.orangePrimary}
        />
      </View>
    </Pressable>
  )
}

export default DeviceItem

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.grayPrimary,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
  },
})
