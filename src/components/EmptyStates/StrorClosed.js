import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EMPTY_ADDRESS_LIST, EMPTY_CART_IMAGE, EMPTY_ORDER_LIST, STORE_CLOSED } from '../../utils/images'
import { SCREEN_WIDTH } from '../../utils/constants'
import Button from '../button/Button'
import { Font_Heebo_Regular, Font_Lato_Bold } from '../../utils/typograpy'

export default function StoreClosed() {
    return (
        <View style={{ flexGrow: 1, }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={STORE_CLOSED} style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3, opacity: 0.2, marginBottom: 32 }} />
                <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000", marginBottom: 10, textAlign: 'center', paddingHorizontal: 55 }}>We are preparing to serve you better!</Text>
                <Text style={{ paddingHorizontal: 45, textAlign: 'center', fontSize: 18, fontFamily: Font_Heebo_Regular, color: "#000", }}>We will let you know once we are back in action, meanwhile you can check our FAQ’s</Text>
            </View>
            {/* <View style={{ padding: 14 }}>
                <Button
                    title='Order Now'
                />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({})