import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import { Colors } from '../../constants/colors'
import { Easing } from 'react-native-reanimated'

function SensorSwitch({ onPress, isActive }) {


    return (
        <Pressable
            onPress={onPress}
        >
            <View style={styles.wrapper}>
                {/* track */}
                <MotiView
                    transition={transition}
                    from = {{
                        backgroundColor: isActive ? _trackColor.active : _trackColor.inActive
                    }}
                    animate = {{
                        backgroundColor: isActive ? _trackColor.inActive : _trackColor.active
                    }}
                    style={styles.track}
                />
                {/* // knob container */}
                <MotiView
                    style={styles.knobContainer}
                    from={{
                        translateX: isActive ? size.width/4.25 : -(size.width/4.25)
                    }}
                    animate={{
                        translateX: isActive ? -(size.width/4.25) : size.width/4.25 
                    }}
                    transition = {transition}
                >
                    {/* knob knobIndicator*/}
                    {/* <MotiView style = {styles.knobIndicator}/> */}

                </MotiView>

            </View>
        </Pressable>
    )
}

export default SensorSwitch

const transition = {
    type: "timing",
    duration: 300,
    easing: Easing.inOut(Easing.ease)
}

const _trackColor = {
    inActive: Colors.grayPrimary,
    active: Colors.orangePrimary
}

const size = {
    width: 120,
    height: 40
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 1
    },
    track: {
        width: size.width,
        height: size.height,
        borderRadius: 6,
        backgroundColor: _trackColor.active,
        // positon: "absolute",
        alignItems: "flex-end",
        justifyContent: "center",
        // borderWidth: 1
    },
    knobContainer: {
        width: size.width / 2,
        height: size.height - 4,
        borderRadius: 6,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        // marginRight: 5,
        
    },
    knobIndicator: {
        backgroundColor: "pink",
        height: "100%",
        width:"100%",

    }
})
