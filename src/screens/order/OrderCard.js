import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Font_Heebo_Bold, Font_Heebo_Medium, Font_Heebo_Regular } from '../../utils/typograpy';
import { PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import { ProductCard } from './Confirm'
import Icon from '../../utils/icons'
import ProgressStrip from '../../components/progress/ProgressStrip'
import { useNavigation } from '@react-navigation/native';
import { TouchableRipple } from 'react-native-paper';
import { getFullDate, isPending } from '../../utils/appUtil/appUtil';

const InProgressBadge = () => {
    return <View style={{ backgroundColor: "rgba(253, 183, 20, 1)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100, }}>
        <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: "#fff" }}>In Progress</Text>
    </View>
}
const DeliveredBadge = () => {
    return <View style={{ backgroundColor: "rgba(94, 180, 17, 1)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100, }}>
        <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: "#fff" }}>Delivered</Text>
    </View>
}
const CancelledBadge = () => {
    return <View style={{ backgroundColor: "rgba(253, 1, 1, 1)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100, }}>
        <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: "#fff" }}>cancelled</Text>
    </View>
}

/**
 * 
 * @param {{ 
 * order.status: "delivered" | "cancelled" | "pending",
 * }} props Props for the component
 * 
 */

export default function OrderCard({order }) {
    const [isItemView, setIsItemView] = useState(false)
    const [orderNumber, setOrderNumber] = useState('')
    const handleShowItems = (orderNumber) => {
        setIsItemView(!isItemView)
        setOrderNumber(orderNumber)
    }
    console.log(order,"order details");
    const navigation = useNavigation()
    const backgroundColor = isPending(order.status) === 'delivered' ? "rgba(94, 180, 17, 0.1)" : isPending(order.status) === 'cancelled' ? "rgba(253, 1, 1, 0.1)" : isPending(order.status) === 'pending' ? "rgba(253, 183, 20, 0.1)" : null
    const ORDER_STATUS = isPending(order.status) === 'delivered' ? <DeliveredBadge /> : isPending(order.status) === 'cancelled' ? <CancelledBadge /> : isPending(order.status) === 'pending' ? <InProgressBadge /> : null
    return (
        <View style={styles.card}>
            <View style={[styles.cardHeader, { backgroundColor }]}>
                <View style={styles.flexRow}>
                    <Text style={styles.text}>Order ID: <Text style={{ fontFamily: Font_Heebo_Bold }}>{order.orderNumber}</Text></Text>
                    {ORDER_STATUS}
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.text}>Delivery Date: <Text style={{ fontFamily: Font_Heebo_Bold }}>{getFullDate(order.deliveryDate)}</Text></Text>
                    <Text style={styles.text}>Total Amount: <Text style={{ fontFamily: Font_Heebo_Bold }}>₹{order.total.toFixed(2)}</Text></Text>
                </View>
                <View>
                    <Text style={styles.text}>Delivery Time: <Text style={{ fontFamily: Font_Heebo_Bold }}>10:00 AM to 12:30 PM</Text></Text>
                </View>
            </View>
            <View style={{ padding: 14 }}>
                {isPending(order.status) === 'pending' && <ProgressStrip status={order.status}/>}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.text}>Order Date:</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.text}>{getFullDate(order.createdAt)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.text}>Shipping Address:</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.text, { fontSize: 16 }]}>{order?.address?.firstName} {order?.address?.lastName}</Text>
                        <Text style={styles.text}>{order?.address?.address} {order?.address?.address2}</Text>
                    </View>
                </View>
                {isPending(order.status) === 'pending' && <TouchableRipple style={styles.trackLiveButton} onPress={() => navigation.navigate("order-tracking",{order:order})}>
                    <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Medium, color: "#000" }}>Track Live</Text>
                </TouchableRipple>}

            </View>
            <View style={{ padding: 14, borderTopColor: "rgba(200,200,200,1)", borderTopWidth: 0.5 }}>
                {!isItemView && <TouchableOpacity onPress={()=>handleShowItems(order.orderNumber)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {order.products.map((item)=>(
                        <Image key={item._id} style={{ width: 40, height: 40, marginRight: 8 }} source={{ uri: item.product.images[0].url }} />
                        ))}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Medium, }} numberOfLines={1} adjustsFontSizeToFit>View Items</Text>
                        <Icon name='chevron-down' />
                    </View>
                </TouchableOpacity>}
                {isItemView &&orderNumber==order.orderNumber && <View>
                    <TouchableOpacity onPress={()=>handleShowItems(order.orderNumber)} style={{ flexDirection: 'row', alignItems: 'center', height: 40, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                            <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Medium, }}>Poultry</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Medium, }} >View Items</Text>
                            <Icon name='chevron-up' />
                        </View>
                    </TouchableOpacity>
                    {order?.products?.map((item,index)=>(<ProductCard key={index} product={item}/>))}
                </View>}


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 14,

        borderWidth: 0.5,
        borderColor: "rgba(200,200,200,1)"
    },
    cardHeader: {
        padding: 14,
        backgroundColor: PRIMARY_LIGHT_COLOR,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14
    },
    text: {
        fontSize: 13,
        fontFamily: Font_Heebo_Regular,
        color: "#000"
    },
    trackLiveButton: {
        borderWidth: 1,
        alignItems: 'center',
        padding: 10

    },
})