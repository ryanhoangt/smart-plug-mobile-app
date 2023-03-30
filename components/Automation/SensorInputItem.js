import { useState } from "react"
import { KeyboardAvoidingViewBase } from "react-native";
import { TextInput, View, StyleSheet } from "react-native"
import SensorSwitch from "../UI/SensorSwitch"

function SensorInputItem({ sensorType }) {
    let [isActive, setIsActive] = useState(false);


    const renderAnalogInput = () => {
        return (
            <View style = {styles.inputWrapper}>
                <TextInput placeholder=">" style = {styles.conditionBox}></TextInput>
                <TextInput placeholder="0" style = {styles.conditionValueBox}></TextInput>
            </View>
        )
    }

    const renderDigitalInput = () => {
        return (
            <SensorSwitch
                style = {styles.inputWrapper}
                onPress={() => {
                    setIsActive(!isActive)
                }}
                isActive = {isActive}
            ></SensorSwitch>
        )
    }

    if (sensorType == "analog") {
        return renderAnalogInput()
    } else {
        return renderDigitalInput()
    }
}

export default SensorInputItem

const styles = StyleSheet.create({
    inputWrapper:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "black", // add shadow - ios only
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,
    },

    conditionBox:{
        backgroundColor: "gray"
    },
    conditionValueBox:{
        backgroundColor: "gray"
    }
})