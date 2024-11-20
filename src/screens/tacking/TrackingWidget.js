import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '../../utils/icons'

import { Font_Heebo_Bold, Font_Heebo_Regular, Font_Heebo_SemiBold } from '../../utils/typograpy'
import { CHARCOAL_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import { TouchableRipple } from 'react-native-paper'
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
export default function TrackingWidget() {
    const navigation = useNavigation()
    const dispatch=useDispatch()
    const isVisibleFloatingOrders=useSelector(state=>state.AuthReducer.isVisibleFloatingOrders)
    const floatingOrders=useSelector(state=>state.AuthReducer.floatingOrders)
    return (
        isVisibleFloatingOrders && floatingOrders.length?<View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 14, backgroundColor: "#fff",
            elevation: 14
        }}>
            <Swiper style={styles.wrapper} showsButtons={false} height={65}
                activeDotStyle={styles.activeDotStyle}
                autoplay={true}
                dotStyle={styles.dotStyle}
                paginationStyle={styles.paginationStyle}
                activeDotColor={PRIMARY_COLOR}
                dotColor={PRIMARY_LIGHT_COLOR}
            >
                {floatingOrders.slice(0,4).map((item, index) => (<View style={styles.container} key={item._id}>
                    <View>
                        <Image source={{ uri: "https://listonic.com/wp-content/uploads/2018/12/grocery-bag-1-3.png" }} style={{ width: 40, height: 40, borderRadius: 40, borderWidth: 0.5, borderColor: CHARCOAL_COLOR }} />
                    </View>
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Bold, color: "#000" }} numberOfLines={1}>{item.products.length} Items {item.status}</Text>
                        <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Regular, color: CHARCOAL_COLOR }} numberOfLines={1}>{item.orderNumber}</Text>
                    </View>
                    <View style={{}}>
                        <TouchableRipple style={{ backgroundColor: PRIMARY_LIGHT_COLOR, paddingHorizontal: 20, paddingVertical: 5 }} 
                        onPress={() => navigation.navigate("order-tracking",{order:item})}>
                            <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000" }}>Track</Text>
                        </TouchableRipple>
                    </View>
                </View>))}
            </Swiper>

            <View style={{}}>
                <Icon name='close' size={20} onPress={()=>dispatch({type:'SET_FLOATING_ORDERS'})} />
            </View>
        </View>:null
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        padding: 14,
    },
    box: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: "",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#F3840C"
    },
    activeDotStyle: {
        width: 20,
        height: 5
    },
    dotStyle: {
        width: 5,
        height: 5
    },
    paginationStyle: {
        bottom: 4,
        justifyContent: 'flex-start',
        paddingLeft: 60
    }
})