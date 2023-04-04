import React from 'react'
import { useState } from 'react'
import { Button, Pressable, StyleSheet, View, Text } from 'react-native'
import Icon from "@expo/vector-icons/Ionicons"
import DeviceTiming from './DeviceTiming'
import DeviceSensor from './DeviceSensor'


function DeviceControl({ deviceName, onPress, label }) {
    const [visible, setVisible] = useState(false);
    const [chevronUp, setChevronUp] = useState(false);

    const toggleDropDown = () => {
        setVisible(!visible)
        setChevronUp(!chevronUp)
    };


    const renderDropDown = () => {
        if (visible) {
            return (
                <View style={styleDropDown.dropdown}>
                    <DeviceTiming styleTitle={styleDropDown}></DeviceTiming>
                    <View>

                        <Text style={[styleDropDown.title, styleDropDown.sensorTitle]}>Sensors</Text>

                        <DeviceSensor sensorName={"Light sensor 1"} sensorType = {"digital"}></DeviceSensor>
                        <DeviceSensor sensorName={"Distance sensor"} sensorType = {"analog"}></DeviceSensor>
                    </View>
                </View>
            )
        }
    }


    return (
        <View>
            <Pressable
                style={({ pressed }) => [pressed && styles.pressed]}
                onPress={toggleDropDown}
            >
                <View
                    style={styles.autoDeviceBtn}
                >
                    <Text style={styles.textItem}>{deviceName}</Text>
                    <Icon name={chevronUp ? 'chevron-down-outline' : 'chevron-up-outline'}
                        size={20}
                        style={styles.btnItem} />
                </View>

            </Pressable>
            {renderDropDown()}
        </View>

    )
}

export default DeviceControl


const styles = StyleSheet.create({
    autoDeviceBtn: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        padding: 12,
        marginTop: 15,

        color: "#000",
        textAlign: 'left',
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "black", // add shadow - ios only
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,

    },
    textItem: {
        fontSize: 16,
        fontFamily: "be-vietnam",
    },
    pressed: {
        backgroundColor: "#EEE",
    }
    ,


})

const styleDropDown = StyleSheet.create({
    dropdown: {
        display:"flex",
        flexDirection: "column",
        paddingHorizontal: 10,
        // marginHorizontal: 3,
        marginVertical:0,

        // backgroundColor: "blue"
    },


    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: "yellow",
    },
    settingBox: {
        display: "flex",
        flexDirection: "row",
        flex: 5,
        // backgroundColor: "gray"
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 900,
        fontFamily: "be-vietnam",
        // backgroundColor: "#fff",
        textAlign: "center",
        color: "#707070"
    },
    sensorTitle: {
        textAlign:"left",
        // backgroundColor: "orange"
        paddingHorizontal: 5,
    }
})
