import { Text, StyleSheet, View, Image, TouchableOpacity, } from 'react-native'
import React, { Component, useState } from 'react'
import { Font_Heebo_Bold, Font_Heebo_Light, Font_Heebo_Medium, Font_Heebo_Regular, Font_Heebo_SemiBold } from '../../utils/typograpy';
import { CHARCOAL_COLOR, DISCOUNT_BADGE_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors';
import { SCREEN_WIDTH } from '../../utils/constants';
import { TouchableRipple } from 'react-native-paper';
import Icon from '../../utils/icons';
import { useNavigation } from '@react-navigation/native';
import { getCount, getFinalDiscount, getFinalPrice, productCount } from '../../utils/appUtil/appUtil';
import { useSelector } from 'react-redux';
import { isNullOrEmpty } from '../../utils/appUtil/appUtil'
const PRODUCT_WIDTH = SCREEN_WIDTH * 0.4;
const PRODUCT_HEIGHT = PRODUCT_WIDTH + 15;
const BestTag = ({ product }) => {
    return product.tags ? <View style={{ position: 'absolute', top: 0, zIndex: 1, backgroundColor: "#FF6400", paddingHorizontal: 4, paddingVertical: 2, }}>
        <Text style={{ fontSize: 11, color: "#fff", fontFamily: Font_Heebo_Medium, textTransform: 'capitalize' }}>{product.tags}</Text>
    </View> : null
}
export default function ProductCard({ cardWidth, product }) {
    const navigation = useNavigation()
    const reduxData = useSelector(state => state.AuthReducer.cart)
    const CARD_WIDTH = cardWidth ? cardWidth : PRODUCT_WIDTH
    return (
        <View style={[styles.card, { width: CARD_WIDTH }]}>
            {isNullOrEmpty(product.quantity) ? <TouchableOpacity style={styles.oosGray}>
                <Text style={[styles.outOfText_]}>OUT OF STOCK</Text>
            </TouchableOpacity> : null}
            <BestTag product={product} />
            <TouchableRipple borderless onPress={() => navigation.navigate("pdp", { product: product })} style={[{ marginBottom: 8, width: CARD_WIDTH, height: PRODUCT_HEIGHT, }]}>
                <Image style={{ width: CARD_WIDTH, height: PRODUCT_HEIGHT, backgroundColor: "#f1f1f1", }} source={{ uri: product.images[0].url }} />
            </TouchableRipple>
            <View style={styles.contentInfo}>
                <View style={{ minHeight: 40, marginBottom: 0, }}>
                    <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Regular, color: "#000", lineHeight: 18.45 }}>{product.name}</Text>
                </View>
                <View style={{ minHeight: 16, marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: "#4E545C", lineHeight: 15.45 }}>{product.info}</Text>
                </View>
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: Font_Heebo_Bold, color: "#28282B", lineHeight: 20.45, marginRight: 5 }}>${getFinalPrice(product)}</Text>
                        {getFinalPrice(product) >= product.price ? null : <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR, lineHeight: 14.45, textDecorationColor: CHARCOAL_COLOR, textDecorationLine: 'line-through' }}>${product.price}</Text>}
                    </View>
                    {getFinalPrice(product) >= product.price ? null : <View style={{ backgroundColor: DISCOUNT_BADGE_COLOR, paddingHorizontal: 6, paddingVertical: 2 }}>
                        <Text style={{ fontSize: 11, fontFamily: Font_Heebo_Light, color: "#000" }}>{getFinalDiscount(product)}% off</Text>
                    </View>}
                </View>
            </View>
            {getCount(product) == 0 ?
                <TouchableRipple style={{ width: CARD_WIDTH, height: 30, }} onPress={() => productCount(product, 'plus')}>
                    <View style={{ borderWidth: 1, borderColor: PRIMARY_LIGHT_COLOR, height: 30, width: CARD_WIDTH, justifyContent: 'center', alignItems: 'center', backgroundColor: PRIMARY_LIGHT_COLOR }}>
                        <Text style={{ color: "#000", fontFamily: Font_Heebo_SemiBold }}>Add</Text>
                    </View>
                </TouchableRipple> :
                <View style={{ width: CARD_WIDTH, height: 30, flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableRipple style={[styles.cartButton, { width: CARD_WIDTH / 3 }]} onPress={() => productCount(product, 'plus')}>
                        <Icon name='plus' type='entypo' color='#fff' />
                    </TouchableRipple>
                    <View style={[styles.cartNumber, { width: CARD_WIDTH / 3 }]}>
                        <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Bold, color: "#000" }}>{getCount(product)}</Text>
                    </View>
                    <TouchableRipple style={[styles.cartButton, { width: CARD_WIDTH / 3 }]} onPress={() => productCount(product, 'minus')}>
                        <Icon name='minus' type='entypo' color='#fff' />
                    </TouchableRipple>
                </View>}
        </View>
    )
}



const styles = StyleSheet.create({
    card: {
        overflow: 'hidden',
        width: PRODUCT_WIDTH
    },
    contentInfo: {
        flex: 1,
        minHeight: 75,
        marginBottom: 10,
    },
    cartButton: {
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        height: 30,
        justifyContent: 'center'
    },
    cartNumber: {
        alignItems: 'center',
        height: 30,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        justifyContent: 'center',
    },
    oosGray: {
        backgroundColor: 'rgba(220, 220, 220, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: 200,
        zIndex: 1,
        width: '100%',
        minWidth: 170
    },
    outOfText_: {
        color: '#000',
        textAlign: 'center',
        marginBottom: 10
    }
})