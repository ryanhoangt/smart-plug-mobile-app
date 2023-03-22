import React from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'

function DeviceTiming({styleTitle}) {
    return (
        <View style = {[styleTitle.container, styles.settingItem]}>
            <Text style = {styleTitle.title}>Time</Text>
            <View  style = {[styleTitle.settingBox, styleTitle.container]}>
                <TextInput 
                    placeholder='Start time'
                    style = {styles.inputPlace}
                ></TextInput>
                <Text style = {styleTitle.title}>:</Text>
                <TextInput 
                    placeholder='End time'
                    style = {styles.inputPlace}
                ></TextInput>
            </View>
        </View>
    )
}

export default DeviceTiming

const styles = StyleSheet.create({
    settingItem:{
         padding: 0,
         margin: 0,
    },
    
    
    inputPlace:{
        flex: 6,
        padding: 14,
        margin: 12,
        backgroundColor: "#fff",
        borderRadius: 8,


        shadowColor: "black", // add shadow - ios only
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,
    }
}
)