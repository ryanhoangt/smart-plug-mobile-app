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
        width: 120,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    conditionBox:{
        backgroundColor: "#fff",
        padding:12,
        borderRadius: 6,
        shadowColor: "black", // add shadow - ios only
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,
    },
    conditionValueBox:{
        backgroundColor: "#fff",
        paddingVertical:12,
        paddingHorizontal:30,
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
