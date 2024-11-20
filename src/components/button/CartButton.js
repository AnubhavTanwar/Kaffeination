import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableRipple } from 'react-native-paper'

export default function CartButton() {
    return (
        <View>
            <TouchableRipple style={{ width: PRODUCT_WIDTH, height: 30, }} onPress={() => console.log("@working")}>
                <View style={{ borderWidth: 1, borderColor: PRIMARY_LIGHT_COLOR, height: 30, width: PRODUCT_WIDTH, justifyContent: 'center', alignItems: 'center', backgroundColor: 'PRIMARY_LIGHT_COLOR' }}>
                    <Text style={{ color: "#000", fontFamily: Font_Heebo_SemiBold }}>Add</Text>
                </View>
            </TouchableRipple>
            {/* <View style={{ width: PRODUCT_WIDTH, height: 30, flexDirection: 'row', alignItems: 'center', }}>
                <TouchableRipple style={styles.cartButton}>
                    <Icon name='plus' type='entypo' color='#fff' />
                </TouchableRipple>
                <View style={styles.cartNumber}>
                    <Text style={{fontSize:14, fontFamily:Font_Heebo_Bold, color:"#000"}}>1</Text>
                </View>
                <TouchableRipple style={styles.cartButton}>
                    <Icon name='minus' type='entypo' color='#fff' />
                </TouchableRipple>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({})