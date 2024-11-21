import { Text, StyleSheet, View, ScrollView, Image, BackHandler } from 'react-native'
import React, { Component } from 'react'
import Container from '../../components/layout/Container'
import Header from '../../components/header/Header'
import Icon from '../../utils/icons'
import { CHARCOAL_COLOR, PRIMARY_COLOR } from '../../utils/colors'
import { SCREEN_WIDTH } from '../../utils/constants'
import { Font_Heebo_Bold, Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold } from '../../utils/typograpy'
import { PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import Button from '../../components/button/Button'
import { connect } from 'react-redux'
import { getRequest } from '../../utils/helper/apiHelper'
import { getFullDate } from '../../utils/appUtil/appUtil'
import { getFloatingOrder } from '../../actions/thunkActions'

export const ProductCard = ({ key, product }) => {
    return (<View key={key} style={styles.smallProduct}>
        <Image style={{ width: 42, height: 42, borderRadius: 4 }} source={{ uri: product.product.images[0].url }} />
        <View style={{ flex: 1, paddingHorizontal: 14 }}>
            <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Medium }}>{product.product.name}</Text>
            <Text style={{ fontSize: 12, color: CHARCOAL_COLOR, fontFamily: Font_Heebo_Regular }}>{product.product.info}</Text>
        </View>
        <View>
            <Text style={{ fontSize: 16, color: "#000", fontFamily: Font_Heebo_Regular }}>₹{product.amount.toFixed(2)}</Text>
        </View>
    </View>)
}

class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: "",
        }
    }
    componentDidMount() {
        this.getOrder()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.props.updateFloatingOrder(this.props.data)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        this.clearCartAndNavigateToHome();
        return true;
    };
    clearCartAndNavigateToHome = () => {
        this.props.navigation.navigate('home');
    };
    getOrder = () => {
        getRequest('order/getByUserId/' + this.props.data._id)
            .then(res => {
                if (!res.err) {

                    console.log(res.order.products, '.');
                    this.setState({ order: res.order })
                } else {
                    alert(res.msg)
                }
            }).catch(err => {
                console.log(err, 'get order confirm');
            })
    }
    render() {
        let { order } = this.state
        return (
            <Container>
                <Header goHome headerTitle='Order Confirm' />
                <ScrollView>
                    <View style={{ alignItems: 'center', paddingHorizontal: SCREEN_WIDTH * 0.09, paddingBottom: 20 }}>
                        <Icon name='checkmark-circle-outline' color={PRIMARY_COLOR} size={SCREEN_WIDTH * 0.35} />
                        <Text style={{ fontSize: 16, fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR, marginTop: 10 }}>Hey {this.props.data.firstName + " " + this.props.data.lastName}</Text>
                        <Text style={{ fontSize: 26, textAlign: 'center', fontFamily: Font_Lato_Bold, color: "#000", marginTop: 14 }}>Your Order is Confirmed!</Text>
                        <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Medium, color: "#000", textAlign: 'center', marginTop: 14 }}>We will send you a shipping confirmation{'\n'}email  as soon as your orderer ships</Text>
                        <Text style={{ fontSize: 16, fontFamily: Font_Heebo_Bold, color: "#000", textAlign: 'center', marginTop: 14 }}>Amount Paid - ₹{order.total}</Text>
                    </View>
                    <View style={{ borderTopWidth: 10, borderColor: "rgba(245, 245, 245, 1)", paddingHorizontal: 14, paddingVertical: 20 }}>
                        <Text style={{ fontSize: 20, fontFamily: Font_Lato_Bold, color: "#000", marginBottom: 14 }}>Order Details</Text>
                        <Text style={{ fontSize: 15, fontFamily: Font_Lato_Bold, color: "#000", marginBottom: 10 }}>Shipping Address</Text>
                        <Text style={{ fontSize: 13, fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR, marginBottom: 18 }}>{order?.address?.address} {order?.address?.address2}</Text>
                        <Text style={{ fontSize: 13, fontFamily: Font_Lato_Bold, color: "#5EC401" }}>Jan 02, 2022 | Between 10:00 AM - 12:30 PM</Text>
                    </View>
                    <View style={{ paddingHorizontal: 14, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR }}>Order Number - <Text style={{ fontFamily: Font_Heebo_Bold }}>{order.orderNumber}</Text></Text>
                        <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR }}>Order Date - <Text style={{ fontFamily: Font_Heebo_Bold }}>{getFullDate(order.createdAt)}</Text></Text>
                    </View>
                    <View style={{ paddingHorizontal: 14 }}>
                        {order?.products?.map((item, index) => (<ProductCard key={index} product={item} />))}
                        <View style={styles.cancelButtonContainer}>
                            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: PRIMARY_LIGHT_COLOR, borderRadius: 40 }} >
                                <Icon name='closecircleo' type='antDesign' size={20} />
                            </View>
                            <View style={{ marginLeft: 14, }}>
                                <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR, }}>Cancel your order for free within{'\n'}5 min of placing it.</Text>
                                <Text style={styles.cancelButton}>Cancel</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
                        <Text style={{ fontSize: 20, fontFamily: Font_Lato_Bold, color: "#000", marginBottom: 14 }}>What’s next?</Text>
                        <Text style={{ fontSize: 13, fontFamily: Font_Heebo_Regular, color: "#000", marginBottom: 14 }}>Check your phone for order confirmation. We will also let you know when your order is ready for delivery.{'\n'}{'\n'}If you have any questions regarding your order, visit{'\n'}<Text style={{ fontFamily: Font_Heebo_Bold, textDecorationColor: "#000", textDecorationLine: "underline" }}>help center</Text> to learn more.</Text>
                    </View>
                </ScrollView>
                <View style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
                    <Button
                        title='Track Order' onPress={() => this.props.navigation.navigate("order-tracking", { order })}
                    />
                </View>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.AuthReducer.data,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateFloatingOrder: (data) => dispatch(getFloatingOrder(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
const styles = StyleSheet.create({
    smallProduct: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "rgba(245, 245, 245, 1)",
        paddingBottom: 10,
        marginBottom: 10
    },
    cancelButtonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 10,
        borderColor: PRIMARY_COLOR
    },
    cancelButton: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: "#000",
        textDecorationColor: "#000",
        textDecorationLine: 'underline',
        fontFamily: Font_Heebo_Bold,
        marginTop: 10
    }
})