import React from 'react'
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native'
import SensorInputItem from './SensorInputItem'
import { Feather } from '@expo/vector-icons';
import Icon from "@expo/vector-icons/Ionicons"


function DeviceSensor({sensorName, sensorType}) {
  return (
    <View style = {styles.sensorWrapper}>
      {/* name field */}
      <View style = {styles.sensorNameWrapper}>
        <Text style = {styles.sensorName}>{sensorName}</Text>
        <Icon name = "chevron-up-outline" style = {{flex: 1, color: "#72777A", fontSize: 14}}/>
      </View>

      {/* Sensor Input field */}
      <SensorInputItem sensorType={sensorType}/>

      {/* Delete button */}
      <Pressable style = {styles.deleteWrapper}>
        <Feather name="trash-2" size={24} color="#72777A" />
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

    height: 40,
    margin:5,
    padding:0,
    // backgroundColor: "aqua"
  }, 

  sensorNameWrapper:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    height: "100%",
    width: 156,

    borderRadius: 6,
    shadowColor: "black", // add shadow - ios only
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,
  },
  
  sensorName:{
    fontFamily: "be-vietnam",
    marginLeft: 5,
    flex: 7,
    color: "#72777A"
  },

  deleteWrapper: {
    height: "100%",
    width: 40,
    backgroundColor: "#C5C5C5",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,

    shadowColor: "black", // add shadow - ios only
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,
  }
})
