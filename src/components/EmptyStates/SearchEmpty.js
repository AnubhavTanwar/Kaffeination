import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EMPTY_ADDRESS_LIST, EMPTY_CART_IMAGE, EMPTY_ORDER_LIST, EMPTY_SEARCH_LIST } from '../../utils/images'
import { SCREEN_WIDTH } from '../../utils/constants'
import Button from '../button/Button'
import { Font_Heebo_Regular, Font_Lato_Bold } from '../../utils/typograpy'

export default function SearchEmpty() {
    return (
        <View style={{ flexGrow: 1, }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={EMPTY_SEARCH_LIST} style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3, opacity: 0.3, marginBottom: 32 }} />
                <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000", marginBottom: 10, textAlign: 'center', paddingHorizontal: 55 }}>Search result was not found!</Text>
                <Text style={{ paddingHorizontal: 20, textAlign: 'center', fontSize: 16, fontFamily: Font_Heebo_Regular, color: "#000", }}>Try using different keywords or check categories to find what you have in mind.</Text>
            </View>
            <View style={{ padding: 14 }}>
                <Button
                    title='Explore Categories'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})