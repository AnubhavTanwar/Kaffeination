import { Text, StyleSheet, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import Container from '../../components/layout/Container'
import { Font_Heebo_Bold, Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold, Font_Poppins_Bold, Font_Poppins_Regular } from '../../utils/typograpy'
import ProductHorizontalCard from '../../components/products/ProductHorizontalCard'
import { TouchableRipple } from 'react-native-paper'
import { CHARCOAL_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, WHITE } from '../../utils/colors'
import Icon from '../../utils/icons'
import ChangeAddress from '../../components/modals/locations/AutoDetect'
import ClearCart from '../../components/modals/alerts/Confirm'
import CartEmpty from '../../components/EmptyStates/CartEmpty'
import { getRequest } from '../../utils/helper/apiHelper'
import { connect } from 'react-redux'
import { isNullOrEmpty } from '../../utils/appUtil/appUtil'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddressChange: false,
      isCartClear: false,
    }
  }
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getCart()
    })
  }
  componentWillUnmount() {
    this.props.navigation.removeListener();
  }
  getCart() {
    if (!this.props.cart._id) { return }
    getRequest('cart/getCart/' + this.props.cart._id)
      .then(res => {
        console.log(res.cart, 'cart ..')
        if (!res.err) {
          this.props.updateCart(res.cart)
        } else {
          this.props.updateCart('')
        }
      }).catch(error => {
        console.log(error, 'getCart');
        this.props.updateCart('')
      })
  }
  handleChangeAddress = () => {
    this.setState({ isAddressChange: !this.state.isAddressChange })
  }
  handleClearCart = () => {
    this.setState({ isCartClear: !this.state.isCartClear })
  }
  clearMyCart = () => {
    getRequest('cart/clearCart/' + this.props.cart._id)
      .then(res => {
        if (!res.err) {

          this.setState({ isCartClear: false })
          this.props.updateCart('')
        } else {
          alert(res.msg)
        }
      })
  }
  render() {
    const { isAddressChange, isCartClear } = this.state
    return (
      <Container>
        <View style={styles.header}>
          <Text style={{ fontSize: 25, fontFamily: Font_Lato_Bold, color: "#000", }}>My Cart</Text>
        </View>
        {!this.props.cart ? <CartEmpty /> : <React.Fragment>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingHorizontal: 14 }}>
            <Text style={{ fontFamily: Font_Lato_Bold, color: CHARCOAL_COLOR, fontSize: 16, }}>Products</Text>
            <Text onPress={this.handleClearCart} style={{ fontFamily: Font_Lato_Bold, color: CHARCOAL_COLOR, fontSize: 16, textTransform: 'uppercase' }}>Clear Cart</Text>
          </View>
          <FlatList
            ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
            contentContainerStyle={{}}
            data={this.props.cart.products}
            renderItem={({ item, index }) => <ProductHorizontalCard product={item.product} isCart={true} style={{ paddingHorizontal: 14 }} />}
            ListFooterComponent={
              <>
                <TouchableRipple style={{ backgroundColor: PRIMARY_COLOR, marginHorizontal: 14, paddingVertical: 14, alignItems: 'center', borderRadius: 10 }}
                  onPress={() => this.props.navigation.navigate('home')}>
                  <Text style={{ fontSize: 16, fontFamily: Font_Heebo_Medium, color: "#fff", textTransform: 'capitalize' }}>Add more product</Text>
                </TouchableRipple>
                {/* <View style={styles.deliveryAddressContainer}>
                  <View style={styles.deliveryAddressContainerHeader}>
                    <Text style={{ fontSize: 16, fontFamily: Font_Lato_Bold, color: "#000" }}>Delivery Location</Text>
                    <Text onPress={this.handleChangeAddress} style={{
                      fontSize: 16, fontFamily: Font_Lato_Bold, color: PRIMARY_COLOR, textTransform: 'uppercase'
                    }}>Change</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal:
                      14,
                  }}>
                    <Icon name='location-sharp' size={25} color='#000' style={{
                      backgroundColor: PRIMARY_LIGHT_COLOR, width: 40,
                      height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 40
                    }} />
                    <Text style={{
                      fontSize: 14, fontFamily: Font_Heebo_Regular, color: "#000", lineHeight: 21, flex: 1,
                      paddingLeft: 14
                    }}>Floor 4, Wakil Tower, Ta 131 Gulshan Badda Link Road</Text>
                  </View>
                </View> */}
                <View style={styles.invoiceContainer}>
                  <View style={styles.invoiceItem}>
                    <Text style={styles.invoiceItemLabel}>Total Cart Price</Text>
                    <Text style={styles.invoiceItemPrice}>₹{this.props.cart?.grandTotal ? this.props.cart?.grandTotal : 0}</Text>
                  </View>
                  {isNullOrEmpty(this.props.cart?.discount)?null:<View style={styles.invoiceItem}>
                    <Text style={[styles.invoiceItemLabel, { color: "rgba(94, 196, 1, 1)" }]}>Discount</Text>
                    <Text style={[styles.invoiceItemPrice, { color: "rgba(94, 196, 1, 1)" }]}>-₹{this.props.cart?.discount}</Text>
                  </View>}
                  {isNullOrEmpty(this.props.cart?.deliveryCharge)?null:<View style={styles.invoiceItem}>
                    <Text style={styles.invoiceItemLabel}>Delivery Charge</Text>
                    <Text style={styles.invoiceItemPrice}>{this.props.cart?.deliveryCharge}</Text>
                  </View>}
                  <View style={[styles.invoiceItem, { borderTopWidth: 0.5, paddingTop: 10, borderColor: "rgba(240, 240, 240, 1)" }]}>
                    <Text style={[styles.invoiceItemLabel, { color: "#000", fontFamily: Font_Heebo_Bold }]}>Total</Text>
                    <Text style={[styles.invoiceItemPrice, { color: "#000", fontFamily: Font_Heebo_Bold }]}>₹{this.props.cart?.total ? this.props.cart?.total : 0}</Text>
                  </View>
                </View>
              </>
            }
            keyExtractor={(item) => item.productId}
            ListFooterComponentStyle={{ marginTop: 28 }}
          />
          <View>
            <TouchableRipple onPress={() => this.props.navigation.navigate("checkout")} style={{ backgroundColor: "#1e1e1e", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 14 }}>
              <React.Fragment>
                <Text style={{ fontSize: 14, color: "#fff", fontFamily: Font_Heebo_Medium, marginRight: 14 }}>Proceed to checkout</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 15, color: "#fff", fontFamily: Font_Heebo_Medium, marginRight: 14 }}>Total ₹{this.props.cart?.total ? this.props.cart?.total : 0}</Text>
                  <Icon name='arrow-forward' color='#fff' size={20} />
                </View>
              </React.Fragment>
            </TouchableRipple>
          </View>
        </React.Fragment>}
        <ChangeAddress isVisible={isAddressChange} onClose={this.handleChangeAddress} />
        <ClearCart visible={isCartClear} onPress={this.clearMyCart} onPressCancel={this.handleClearCart} heading={"Clear Cart"} content={"Are you sure ou want to clear your cart. this action cannot be undo."} buttonTitle={"Clear It"} />
      </Container>
    )
  }
} const mapStateToProps = state => {
  return {
    cart: state.AuthReducer.cart,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateCart: (cart) => dispatch({ type: 'UPDATE_CART', payload: cart }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart)

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 33
  },

  deliveryAddressContainer: {
    marginTop: 30,
    marginBottom: 20
  },
  deliveryAddressContainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 21
  },
  invoiceContainer: {
    marginHorizontal: 14,
    marginVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: PRIMARY_COLOR
  },
  invoiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17
  },
  invoiceItemLabel: {
    fontSize: 20,
    fontFamily: Font_Lato_Bold,
    color: PRIMARY_COLOR
  },
  invoiceItemPrice: {
    fontSize: 20,
    fontFamily: Font_Lato_Bold,
    color: "#000"
  }
})