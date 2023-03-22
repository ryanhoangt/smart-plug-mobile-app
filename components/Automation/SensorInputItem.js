import { useState } from "react"
import { View } from "react-native"
import SensorSwitch from "../UI/SensorSwitch"

function SensorInputItem({sensorType}) {
    const renderAnalogInput = () => {
        return(
            <SensorSwitch></SensorSwitch>            
        )
    }

    const renderDigitalInput = () => {
        return(
            <SensorSwitch></SensorSwitch>            
        )
    }
    
    if(sensorType == "analog"){
        return renderAnalogInput()
    }else{
        return renderDigitalInput()
    }
}   

export default SensorInputItem