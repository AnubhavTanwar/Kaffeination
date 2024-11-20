import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EMPTY_ADDRESS_LIST, EMPTY_CART_IMAGE, EMPTY_ORDER_LIST } from '../../utils/images'
import { SCREEN_WIDTH } from '../../utils/constants'
import Button from '../button/Button'
import { Font_Heebo_Regular, Font_Lato_Bold } from '../../utils/typograpy'

export default function OrderEmpty() {
    return (
        <View style={{ flexGrow: 1, }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={EMPTY_ORDER_LIST} style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3, opacity: 0.4, marginBottom: 32 }} />
                <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000", marginBottom: 10, textAlign: 'center', paddingHorizontal: 55 }}>Your order list empty</Text>
                <Text style={{ paddingHorizontal: 45, textAlign: 'center', fontSize: 18, fontFamily: Font_Heebo_Regular, color: "#000", }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            </View>
            <View style={{ padding: 14 }}>
                <Button
                    title='Order Now'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})