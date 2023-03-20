import React from 'react'
import { Button, Pressable, StyleSheet, View, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

function DeviceControl({ deviceName, onPress }) {
    return (
        <Pressable
            style = {[styles.autoDeviceBtn, styles.elevation]}
            onPress={onPress}
        >
            <View>
                <Text>{deviceName}</Text>
            </View>
        </Pressable>
    )
}

export default DeviceControl


const styles = StyleSheet.create({
    autoDeviceBtn: {
        padding: 12,
        fontSize: 30,
        fontFamily: "be-vietnam",
        color: "#000",
        textAlign: 'left',
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10, 
    },elevation: {
        elevation: 20,
        shadowColor: '#52006A',
      },
})
