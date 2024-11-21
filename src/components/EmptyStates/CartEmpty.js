import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EMPTY_CART_IMAGE } from '../../utils/images'
import { SCREEN_WIDTH } from '../../utils/constants'
import Button from '../button/Button'
import { Font_Heebo_Regular, Font_Lato_Bold } from '../../utils/typograpy'
import { useNavigation } from '@react-navigation/native'
import { SECONDARY_COLOR } from '../../utils/colors'

export default function CartEmpty() {
    const navigation = useNavigation();
    return (
        <View style={{ flexGrow: 1, }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={EMPTY_CART_IMAGE} style={{ width: SCREEN_WIDTH * 0.5, height: SCREEN_WIDTH * 0.5, opacity: 0.5, marginBottom: 32 }} />
                <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: SECONDARY_COLOR, marginBottom: 10, textAlign: 'center', paddingHorizontal: 55 }}>Your cart is empty</Text>
                <Text style={{ paddingHorizontal: 45, textAlign: 'center', fontSize: 18, fontFamily: Font_Heebo_Regular, color: "#000", }}>Check our variety of categories to find the right product for you.</Text>

            </View>
            <View style={{ padding: 14 }}>
                <Button
                    title='Start Shopping'
                    onPress={()=>navigation.navigate('home')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})