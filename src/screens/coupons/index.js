import { Text, StyleSheet, View, TextInput, ImageBackground, Image, FlatList, Platform } from 'react-native'
import React, { Component } from 'react'
import Container from '../../components/layout/Container'
import Header from '../../components/header/Header'
import { TouchableRipple } from 'react-native-paper'
import Icon from '../../utils/icons'
import { COUPON_BG } from '../../utils/images'
import { SCREEN_WIDTH } from '../../utils/constants'
import { Font_Heebo_Bold, Font_Heebo_Regular, Font_Heebo_SemiBold, Font_Lato_Bold, Font_Poppins_Bold } from '../../utils/typograpy'
import { GRAY_COLOR, PLACEHOLDER_COLOR, PRIMARY_COLOR } from '../../utils/colors'
import { getRequest, postWithBody } from '../../utils/helper/apiHelper'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const IMAGE_WIDTH = (SCREEN_WIDTH - 25)
const IMAGE_CONTAINER_ASPECT_RATIO = 342 / 104;
const IMAGE_CONTAINER_HEIGHT = (IMAGE_WIDTH / IMAGE_CONTAINER_ASPECT_RATIO);

const COUPON_DATA = [
    {
        "id": "1",
        "code": "GOAT25",
        "valid": "03 October 2023",
        "description": "Get 25% discount",
        "condition": "Valid on orders with items worth $50 or more."
    },
    {
        "id": "2",
        "code": "GOAT50",
        "valid": "03 October 2023",
        "description": "Get 50% discount",
        "condition": "Valid on orders with items worth $100 or more."
    },
    {
        "id": "3",
        "code": "GOAT40",
        "valid": "03 October 2023",
        "description": "Get 40% discount",
        "condition": "Valid on orders with items worth $80 or more."
    },
    {
        "id": "4",
        "code": "GOAT30",
        "valid": "03 October 2023",
        "description": "Get 30% discount",
        "condition": "Valid on orders with items worth $60 or more."
    },
    {
        "id": "5",
        "code": "GOAT20",
        "valid": "03 October 2023",
        "description": "Get 20% discount",
        "condition": "Valid on orders with items worth $40 or more."
    },
    {
        "id": "6",
        "code": "GOAT10",
        "valid": "03 October 2023",
        "description": "Get 10% discount",
        "condition": "Valid on orders with items worth $20 or more."
    },
]

const CouponCard = ({ data }) => {
    const cart=useSelector(state=>state.AuthReducer.cart)
    const navigation=useNavigation()
    const dispatch=useDispatch()
    function applyCoupon(){
        let body=JSON.stringify({
            "cartId":cart._id,
            "name":data.name
        })
        postWithBody('coupon/apply',body)
        .then(res=>{
            if(!res.err){
                    getRequest('cart/getCart/' + cart._id)
                      .then(res => {
                        if (!res.err) {
                            dispatch({ type: 'UPDATE_CART', payload: res.cart })
                        } else {
                            dispatch({ type: 'UPDATE_CART', payload: '' })
                        }
                      }).catch(error => {
                        console.log(error, 'getCart');
                        dispatch({ type: 'UPDATE_CART', payload: '' })
                      })
                navigation.goBack()
            }else{
                alert(res.msg)
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    return (<View style={{ minHeight: 110, width: SCREEN_WIDTH, alignItems: 'center', justifyContent: 'center' }} resizeMode='cover'>
        <Image source={COUPON_BG} style={{ height: IMAGE_CONTAINER_HEIGHT, width: IMAGE_WIDTH, position: 'absolute' }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 110, paddingHorizontal: 30 }}>
            <View style={{ flex: 0.7, paddingRight: 15, paddingLeft: 9 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.couponCode}>{data?.name}</Text>
                    <Text style={styles.couponText} numberOfLines={1}>{data?.discription}</Text>
                    {data?.condition.map((item,index)=>(
                    <Text key={index} style={styles.couponText2} numberOfLines={2}>{item}</Text>))}
                </View>
                <Text style={[styles.couponText2, { color: "#0000004D" }]}>{data?.expireDate}</Text>
            </View>
            <View style={{ borderLeftWidth: 1, height: 90, borderStyle: 'solid', borderColor: "#585858", }} />
            <View style={{ flex: 0.3, }}>
                <TouchableRipple style={styles.applyButton} onPress={()=>applyCoupon()}>
                    <Text style={styles.applyButtonLabel}>Apply</Text>
                </TouchableRipple>
            </View>
        </View>
    </View>)
}

export default class Coupons extends Component {
    constructor(props){
        super(props)
        this.state={
            coupons:[]
        }
    }
    componentDidMount(){
        getRequest('coupon/getAll')
        .then(res=>{
            if(!res.err){
                this.setState({coupons:res.coupon})
            }else{
                alert(res.msg)
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    render() {
        return (
            <Container>
                <Header headerTitle='My Coupons' />
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 14 }}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder='Enter coupon code'
                            placeholderTextColor={PLACEHOLDER_COLOR}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.applyIconContainer}>
                        <Icon name='arrow-forward' style={styles.applyIcon} color='#fff' size={25} />
                    </View>
                    {/* <Icon name='arrow-forward' style={styles.applyIcon} color='#fff' size={25} /> */}
                </View>
                <FlatList
                    data={this.state.coupons}
                    renderItem={({ item, index }) => <CouponCard data={item} onPress={() => console.log("@working")} />}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingVertical: 14 }}
                    ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
                    showsVerticalScrollIndicator={false}
                />

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 14,
        backgroundColor: GRAY_COLOR,
        paddingHorizontal: 14,
        borderRadius: 10,
        flex: 1
    },
    textInput: {
        flex: 1,
        height: 45,
        fontSize: 16,
        paddingVertical: 0,
        fontFamily: Font_Heebo_SemiBold
    },
    applyIconContainer: {
        width: 45,
        height: 45,
        borderRadius: 10,
        overflow: 'hidden', // Ensure the child view respects the border radius
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        ...(Platform.OS === 'ios' && {
            // iOS-specific style overrides
            paddingTop: 15, // Adjust paddingTop for iOS
        }),
    }, 
    applyIcon: {
        width: 45,
        height: 45,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    couponCode: {
        fontSize: 20,
        fontFamily: Font_Lato_Bold,
        color: PRIMARY_COLOR,
        lineHeight: 30,
        textTransform: 'uppercase'
    },
    couponText: {
        fontSize: 12,
        fontFamily: Font_Heebo_Bold,
        color: "#000",
        textTransform: 'capitalize',
        lineHeight: 16,
        marginBottom: 2
    },
    couponText2: {
        fontSize: 11,
        fontFamily: Font_Heebo_Regular,
        color: "#000",
        textTransform: 'capitalize',
        lineHeight: 14,
        marginBottom: 8
    },
    couponText3: {
        fontSize: 10,
        fontFamily: Font_Heebo_Bold,
        color: "#5EB411",
        textTransform: 'capitalize',
        lineHeight: 14
    },
    applyButton: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // borderLeftWidth: 1,
        // borderStyle: 'dashed',
        color: "#585858",
    },
    applyButtonLabel: {
        fontSize: 16,
        fontFamily: Font_Poppins_Bold,
        color: "#000"
    },

})