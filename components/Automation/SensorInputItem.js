import { useState } from "react"
import { TextInput, View } from "react-native"
import SensorSwitch from "../UI/SensorSwitch"

function SensorInputItem({ sensorType }) {
    let [isActive, setIsActive] = useState(false);


    const renderAnalogInput = () => {
        return (
            // <SensorSwitch
            //     onPress={() => {
            //         setIsActive(!isActive)
            //     }}
            //     isActive = {isActive}
            // ></SensorSwitch>
            <View>
                <TextInput placeholder=">"></TextInput>
                <TextInput placeholder="0"></TextInput>
            </View>
        )
    }

    const renderDigitalInput = () => {
        return (
            <SensorSwitch
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