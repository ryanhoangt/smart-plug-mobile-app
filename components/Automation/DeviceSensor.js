import React from 'react'
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native'
import SensorInputItem from './SensorInputItem'
import { Feather } from '@expo/vector-icons';


function DeviceSensor({sensorName}) {
  return (
    <View style = {styles.sensorWrapper}>
      <Text>{sensorName}</Text>
      <SensorInputItem
        sensorType={"digital"}
      ></SensorInputItem>
      <Pressable>
        <Feather name="trash-2" size={24} color="black" />
      </Pressable>
    </View>
    )
}

export default DeviceSensor

const styles = StyleSheet.create({
  sensorWrapper:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
    padding:10,
    backgroundColor: "aqua"
  }
})