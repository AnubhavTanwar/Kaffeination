import { Text, StyleSheet, View, Image, TouchableOpacity, } from 'react-native'
import React, { Component, useState } from 'react'
import { Font_Heebo_Bold, Font_Heebo_Light, Font_Heebo_Medium, Font_Heebo_Regular, Font_Heebo_SemiBold } from '../../utils/typograpy';
import { BUTTON_COLOR, CHARCOAL_COLOR, DISCOUNT_BADGE_COLOR, OLIVE_GREEN, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, TEXT_BODY_COLOR } from '../../utils/colors';
import { SCREEN_WIDTH } from '../../utils/constants';
import { TouchableRipple } from 'react-native-paper';
import Icon from '../../utils/icons';
import { useNavigation } from '@react-navigation/native';
import { getCount, getFinalDiscount, getFinalPrice, productCount } from '../../utils/appUtil/appUtil';
import { useSelector } from 'react-redux';
import { isNullOrEmpty } from '../../utils/appUtil/appUtil'
const PRODUCT_WIDTH = SCREEN_WIDTH * 0.5;
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
        <View style={[styles.card, { width: CARD_WIDTH, backgroundColor:'#fff',paddingBottom:10, borderRadius:10,borderWidth:1,borderColor:OLIVE_GREEN }]}>
            {isNullOrEmpty(product.quantity) ? <TouchableOpacity style={styles.oosGray}>
                <Text style={[styles.outOfText_]}>OUT OF STOCK</Text>
            </TouchableOpacity> : null}
            <BestTag product={product} />
            <TouchableRipple borderless onPress={() => navigation.navigate("pdp", { product: product })} style={[{ marginBottom: 8, width: CARD_WIDTH, height: PRODUCT_HEIGHT,borderTopLeftRadius:10, borderBottomWidth:2 ,borderColor:OLIVE_GREEN  }]}>
                <Image style={{ width: CARD_WIDTH, height: PRODUCT_HEIGHT, backgroundColor: "#f1f1f1", }} source={{ uri: product.images[0].url }} />
            </TouchableRipple>
            <View style={styles.contentInfo}>
                <View style={{ minHeight: 40, marginBottom: 0, }}>
                    <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Regular, color: TEXT_BODY_COLOR, fontWeight:700 , lineHeight: 18.45 }}>{product.name}</Text>
                </View>
                <View style={{ minHeight: 16, marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: "#4E545C", lineHeight: 15.45 }}>{product.info}</Text>
                </View>
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: Font_Heebo_Bold, color: "#28282B", lineHeight: 20.45, marginRight: 5 }}>₹{getFinalPrice(product)}</Text>
                        {getFinalPrice(product) >= product.price ? null : <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR, lineHeight: 14.45, textDecorationColor: CHARCOAL_COLOR, textDecorationLine: 'line-through' }}>${product.price}</Text>}
                    </View>
                    {getFinalPrice(product) >= product.price ? null : <View style={{ backgroundColor: DISCOUNT_BADGE_COLOR, paddingHorizontal: 8, paddingVertical: 2, borderRadius:9 }}>
                        <Text style={{ fontSize: 11, fontFamily: Font_Heebo_Light, color: "#fff" }}>{getFinalDiscount(product)}% off</Text>
                    </View>}
                </View>
            </View>
            {getCount(product) == 0 ? 
                <TouchableRipple style={{ width: CARD_WIDTH, height: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => productCount(product, 'plus')}>
                    <View style={{ borderWidth: 1, borderColor: BUTTON_COLOR, height: 30, width: CARD_WIDTH - 20, justifyContent: 'center', alignItems: 'center', backgroundColor: BUTTON_COLOR, borderRadius: 20 }}>
                        <Text style={{ color: "#fff", fontFamily: Font_Heebo_SemiBold }}>Add</Text>
                    </View>
                </TouchableRipple> 
                :
                <View 
                    style={{ 
                        width: CARD_WIDTH - 20, // Ensure this matches the reduced width of the Add button
                        height: 30, 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center',  // Centering horizontally
                        alignSelf: 'center'  // Center the container itself horizontally
                    }}
                >
                    <TouchableRipple 
                        style={[styles.cartButton, { 
                            width: (CARD_WIDTH - 20) / 3, // Divide the width evenly
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20 
                        }]} 
                        onPress={() => productCount(product, 'plus')}
                    >
                        <Icon name='plus' type='entypo' color='#fff' />
                    </TouchableRipple>
                    <View 
                        style={[styles.cartNumber, { 
                            width: (CARD_WIDTH - 20) / 3 // Divide the width evenly
                        }]}
                    >
                        <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Bold, color: "#000" }}>
                            {getCount(product)}
                        </Text>
                    </View>
                    <TouchableRipple 
                        style={[styles.cartButton, { 
                            width: (CARD_WIDTH - 20) / 3, // Divide the width evenly
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20 
                        }]} 
                        onPress={() => productCount(product, 'minus')}
                    >
                        <Icon name='minus' type='entypo' color='#fff' />
                    </TouchableRipple>
                </View>}
        </View>
    )
}



const styles = StyleSheet.create({
    card: {
        overflow: 'hidden',
        width: PRODUCT_WIDTH,
        backgroundColor:'red',
    },
    contentInfo: {
        flex: 1,
        minHeight: 75,
        marginBottom: 10,
        color: TEXT_BODY_COLOR,
        paddingLeft:7,
        paddingRight:6 
    },
    cartButton: {
        alignItems: 'center',
        backgroundColor: BUTTON_COLOR,
        height: 31,
        justifyContent: 'center'
    },
    cartNumber: {
        alignItems: 'center',
        height: 30,
        borderWidth: 1,
        borderColor: BUTTON_COLOR,
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