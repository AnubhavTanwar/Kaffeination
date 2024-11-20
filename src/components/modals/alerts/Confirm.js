import { Animated, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Modal } from 'react-native'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/constants'
import Icon from '../../../utils/icons'
import { Font_Heebo_Bold, Font_Heebo_Regular, Font_Heebo_SemiBold } from '../../../utils/typograpy'

export default function ConfirmModal({ visible = false, onPress, onPressCancel, heading, content, buttonTitle }) {
    const [popup] = useState(new Animated.Value(0))
    useLayoutEffect(() => {
        Animated.spring(popup, {
            toValue: 1,
            bounciness: 15,
            useNativeDriver: true
        }).start()

        return () => {
            popup.setValue(0)
        };
    }, [visible])
    return (
        <Modal visible={visible} transparent animationType='fade' onRequestClose={onPressCancel && onPressCancel}>
            <View style={styles.container} pointerEvents='box-none'>
                <TouchableWithoutFeedback style={StyleSheet.absoluteFill} onPress={onPressCancel && onPressCancel}>
                    <View style={styles.absolute} />
                </TouchableWithoutFeedback>
                <Animated.View style={[styles.section, { transform: [{ scale: popup }] }]}>
                    <Icon size={18} name={"alert-triangle"} type='feather' style={styles.icon} />
                    <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Bold, textAlign: 'center', color: "#000", marginBottom: 5, marginTop: 5 }}>{heading}</Text>
                    <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Regular, textAlign: 'center', color: "rgba(0,0,0,0.5)", marginBottom: 20 }}>{content}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 0 }}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "#C2C2C2", }]} onPress={onPressCancel && onPressCancel}>
                            <Text style={{ fontSize: 13, color: "#000", fontFamily: Font_Heebo_SemiBold }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "#FF2511", }]} onPress={onPress && onPress}>
                            <Text style={{ fontSize: 13, color: "#fff", fontFamily: Font_Heebo_SemiBold }}>{buttonTitle}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    absolute: {
        ...StyleSheet.absoluteFillObject,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    section: {
        backgroundColor: "#fff",
        width: '70%',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 14,
        alignItems: 'center'
    },

    button: {
        marginHorizontal: 5,
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 8,
        paddingBottom: 9,
        width: '47%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        backgroundColor: "#FEE2E2",
        color: "#FE3166",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
})