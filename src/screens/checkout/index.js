import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { Component, useEffect } from 'react'
import Container from '../../components/layout/Container'
import Header from '../../components/header/Header'
import Icon, { OfferIcon } from '../../utils/icons'
import { TouchableRipple } from 'react-native-paper'
import { Font_Heebo_Bold, Font_Heebo_Medium, Font_Heebo_Regular, Font_Heebo_SemiBold, Font_Lato_Bold, Font_Poppins_Bold } from '../../utils/typograpy'
import { CHARCOAL_COLOR, GRAY_COLOR, PLACEHOLDER_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import Button from '../../components/button/Button'
import RadioButton from '../../components/button/RadioButton'
import Login from '../auth/Login'
import { connect } from 'react-redux'
import { getRequest, postWithBody, putRequestWithBody } from '../../utils/helper/apiHelper'
import { updateCart } from '../../actions/thunkActions'
import InitializePaymentSheet from './initializePaymentSheet'
import { getCurrentSessionId } from 'react-native-clarity'
import Loader from '../../components/loader/Loader'

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOtpSend: false,
      isOtpVerify: false,
      isUserAuthorized: false,
      addressSelect: null,
      isShippingAddressOpen: false,
      address: [],
      isPaymentInit: false,
      order: '',
      loading:false
    }
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', (e) => {
      if (this.props.data) {
        this.getAddress()
      }
    });
    if (Platform.OS === 'android') {
      // Initialize Clarity.
      getCurrentSessionId().then((id) => {console.log(id,'clarity session id')})
    }
    
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  handleAddress = (value) => {
    this.setState({
      addressSelect: value
      // ,isShippingAddressOpen:false
    })
    let body = {
      addressId: value._id,
      cartId: this.props.cart._id
    }
    this.props.updateCart(JSON.stringify(body))
  }
  handleShippingAddressTab = () => {
    this.setState({ isShippingAddressOpen: !this.state.isShippingAddressOpen })
  }
  getAddress() {
    getRequest('address/getByUserId/' + this.props.data._id)
      .then(res => {
        if (!res.err) {
          this.setState({ address: res.address, isShippingAddressOpen: true })
        } else {
          alert(res.msg);
        }
      }).catch(error => {
        console.log(error, 'address/getByUserId/');
      })
  }
  placeOrder = () => {
    this.setState({loading:true})
    let body = {
      cartId: this.props.cart._id
    }
    postWithBody('order/placed', JSON.stringify(body))
      .then(res => {
        console.log(res, 'place order');
        if (!res.err) {
          this.setState({ order: res.created, isPaymentInit: true })
        } else {
          alert(res.msg)
          this.setState({loading:false})
        }
      }).catch(err => {
        this.setState({loading:false})
        console.log(err, 'placeOrder');
      })
  }
  clearCart = () => {
    console.log('clear cart');
    getRequest('cart/clearCart/' + this.props.cart._id)
      .then(res => {
        console.log(res, 'clear ');
        if (!res.err) {
          this.props.clearCart('')
        }
      }).catch(e => {
        console.log(e);
      })
  }
  paymentFailed() {
    this.setState({ isPaymentInit: false,loading:false })
  }
  paymentSuccess = () => {
    this.setState({ isPaymentInit: false ,loading:false})
    this.props.navigation.navigate("order-confirm")
    this.props.clearCart('')
  }
  render() {
    const { isPaymentInit, order, loading, isUserAuthorized, addressSelect, isShippingAddressOpen } = this.state
    return (
      <Container >
        {isPaymentInit ? <InitializePaymentSheet order={order} paymentSuccess={()=>this.paymentSuccess()} paymentFailed={() => this.paymentFailed()} /> : null}
        <Header headerTitle='Checkout' />
        <ScrollView style={{ backgroundColor: "rgba(245, 245, 245, 1)" }}
          keyboardShouldPersistTaps="handle"
          keyboardDismissMode="interactive">
          <Login isCheckout getAddress={() => this.getAddress()} />
          {/* shipping address start */}
          <View style={styles.actionCard}>
            <TouchableOpacity style={{}} onPress={this.handleShippingAddressTab}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.cardTitle}>Shipping</Text>
                <Icon name={isShippingAddressOpen ? 'chevron-up' : 'chevron-down'} size={20} color='#000' />
              </View>
              <View style={styles.cardBody}>
                <View style={{ flex: 1, marginRight: 30 }}>
                  <View style={styles.cardRow}>
                    <Icon name='shipping-fast' type='fontAwesome5' color='#A7ACBC' style={{ marginTop: 2 }} />
                    <Text style={styles.cardContextText}>{addressSelect ? addressSelect.landmark + "\nPostal Code:" + addressSelect.postalCode : "Add shipping address"}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {isShippingAddressOpen &&
              <React.Fragment>
                {this.state.address.map((item, index) => (<View key={index} style={styles.cardBody}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1, }}>
                      <Text style={{ fontSize: 16, fontFamily: Font_Poppins_Bold, color: CHARCOAL_COLOR }}>{item.type}</Text>
                      <View style={styles.cardRow}>
                        <Icon name='shipping-fast' type='fontAwesome5' color='#A7ACBC' style={{ marginTop: 2 }} />
                        <Text style={styles.cardContextText}>{item.address}, {item.landmark}</Text>
                      </View>
                      {item.postalCode?<Text style={[styles.cardContextText, { marginLeft: 0 }]}>Postal Code:{item.postalCode}</Text>:null}
                    </View>
                    <RadioButton status={item._id == addressSelect?._id} onPress={() => this.handleAddress(item)} />
                  </View>
                </View>))}
                <View style={{ marginTop: 14 }}>
                  <Button title='Add New' onPress={() => this.props.navigation.navigate('add-address')} />
                </View>
              </React.Fragment>}
          </View>
          {/* shipping address end */}

          {/* Payment start */}
          <View style={styles.actionCard}>
            <TouchableOpacity style={{}} onPress={() => this.props.cart.coupon ?
              this.props.navigation.navigate("coupons") : this.props.navigation.navigate("coupons")}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.cardTitle}>Offers</Text>
                {this.props.cart.coupon ? <Icon name={'close'} size={20} color='#000' /> :
                  <Icon name={'chevron-forward'} size={20} color='#000' />}
              </View>
              <View style={styles.cardBody}>
                <View style={{ flex: 1, marginRight: 30 }}>
                  <View style={styles.cardRow}>
                    <OfferIcon width={17} height={17} fill={"#A7ACBC"} />
                    {this.props.cart.coupon?.name ? <Text style={[styles.cardContextText, { color: "rgba(94, 196, 1, 1)" }]}>{this.props.cart.coupon.name}</Text> :
                      <Text style={styles.cardContextText}>{'Choose your Offers coupon'}</Text>}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* Payment end */}
          <View style={styles.invoiceContainer}>
            <View style={styles.invoiceItem}>
              <Text style={styles.invoiceItemLabel}>Total Cart Price</Text>
              <Text style={styles.invoiceItemPrice}>{this.props.cart.total}</Text>
            </View>
            {this.props.cart.coupon ? <View style={{ marginBottom: 17 }}>
              <View style={[styles.invoiceItem, { marginBottom: 0 }]}>
                <Text style={[styles.invoiceItemLabel, { color: "rgba(94, 196, 1, 1)" }]}>Discount ({this.props.cart.coupon.name})</Text>
                <Text style={[styles.invoiceItemPrice, { color: "rgba(94, 196, 1, 1)" }]}>applied</Text>
              </View>
              <Text style={{ flex: 1, fontSize: 13, color: "rgba(94, 196, 1, 1)", fontFamily: Font_Heebo_Regular }}>( ${this.props.cart.discount} will be credited in wallet after delivery.)</Text></View> : null}
            <View style={styles.invoiceItem}>
              <Text style={styles.invoiceItemLabel}>Delivery Charge</Text>
              <Text style={styles.invoiceItemPrice}>{this.props.cart.deliveryCharge ? "- " + this.props.cart.deliveryCharge : "0"}</Text>
            </View>
            <View style={[styles.invoiceItem, { borderTopWidth: 0.5, paddingTop: 10, borderColor: "rgba(240, 240, 240, 1)" }]}>
              <Text style={{ flex: 1, fontSize: 13, color: CHARCOAL_COLOR, fontFamily: Font_Heebo_Regular }}>{this.props.cart.products?.length} item</Text>
              <Text style={[styles.invoiceItemLabel, { color: "#000", fontFamily: Font_Heebo_Bold, marginRight: 8 }]}>Total</Text>
              <Text style={[styles.invoiceItemPrice, { color: "#000", fontFamily: Font_Heebo_Bold }]}>${this.props.cart.paymentTotal}</Text>
            </View>
          </View>
          <View style={[{ borderTopWidth: 0.5, paddingTop: 10, borderColor: PRIMARY_COLOR, backgroundColor: "#fff", paddingHorizontal: 14, paddingBottom: 14 }]}>
            <Text style={[{ color: CHARCOAL_COLOR, fontFamily: Font_Heebo_Regular, fontSize: 12 }]}>The final amount is dynamic and subject to change depending on your delivery address and your delivery slot</Text>
          </View>
        </ScrollView>
        <TouchableRipple disabled={!addressSelect}
          onPress={() => this.placeOrder()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "#5469d4" }}>
            <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Medium, color: "#fff" }}>Place order</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Medium, color: "#fff", lineHeight: 25, marginRight: 8 }}>Pay with stripe</Text>
              <Icon name='arrow-forward' size={20} color='#fff' />
            </View>
          </View>
        </TouchableRipple>
        {loading?<Loader/>:null}
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    data: state.AuthReducer.data,
    cart: state.AuthReducer.cart,

  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch({ type: 'UPDATE_CART', payload: '' }),
    updateCart: (body) => dispatch(updateCart(body))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
const styles = StyleSheet.create({

  actionCard: {
    // marginHorizontal: 14,
    marginVertical: 8,
    backgroundColor: "#fff",
    // elevation: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Font_Lato_Bold,
    color: "#000",

  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 12
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  cardContextText: {
    fontSize: 14,
    fontFamily: Font_Heebo_Regular,
    color: "#A7ACBC",
    marginLeft: 10,
    flex: 1
  },
  cardButton: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center'
  },
  payButton: {
    backgroundColor: "#5469d4",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  invoiceContainer: {
    backgroundColor: "#fff",
    padding: 14,
    paddingTop: 25
  },
  invoiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17
  },
  invoiceItemLabel: {
    fontSize: 14,
    fontFamily: Font_Lato_Bold,
    color: "#000"
  },
  invoiceItemPrice: {
    fontSize: 16,
    fontFamily: Font_Lato_Bold,
    color: "#000"
  }
})