import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EMPTY_ADDRESS_LIST, EMPTY_CART_IMAGE } from '../../utils/images'
import { SCREEN_WIDTH } from '../../utils/constants'
import Button from '../button/Button'
import { Font_Heebo_Regular, Font_Lato_Bold } from '../../utils/typograpy'

export default function AddressEmpty() {
    return (
        <View style={{ flexGrow: 1, }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={EMPTY_ADDRESS_LIST} style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3, opacity: 0.2, marginBottom: 32 }} />
                <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000", marginBottom: 10, textAlign: 'center', paddingHorizontal: 55 }}>Your address list empty</Text>
                <Text style={{ paddingHorizontal: 45, textAlign: 'center', fontSize: 18, fontFamily: Font_Heebo_Regular, color: "#000", }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})