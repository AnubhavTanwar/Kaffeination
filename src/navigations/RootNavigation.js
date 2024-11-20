import React, { Component } from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import BottomNavigation from './BottomNavigation';
import { AddAddress, CheckoutScreen, Coupons, MyAddress, OrderConfirm, OlderOrders, EditProfile, Tracking, ProductDescriptionPage, ProductListingPages } from './routes';
import { connect } from 'react-redux';
import { getHomeBanner, getHomeLayout, getMasterCatData, getTopCategory } from '../actions/thunkActions';
import { getAutoAddress, getRequest, postWithBody } from '../utils/helper/apiHelper'
import GetLocation from 'react-native-get-location'
import GoogleAutoCompelete from '../components/modals/locations/GoogleAutoCompelete';
const { Screen, Navigator } = createStackNavigator();



class RootNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    this.isLogin()
  }
  isLogin() {
    if (!this.props.location) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(async location => {
          let body = JSON.stringify({
            "longitude": location.longitude,
            "latitude": location.latitude
          })
          getAutoAddress(location.latitude, location.longitude)
            .then(address => {
              this.props.setLocation(address)
            }).catch(err => { console.log(err); })
          let storeData = await postWithBody('store/getAllStore', body);
          if (storeData?.products && storeData?.products[0]) {
            this.props.setStoreData(storeData.products[0])
            this.props.getHomeBanner(storeData.products[0]._id)
          } else {
            console.log(body, 'else.....')
            this.getStaticStore()
          }
        })
        .catch(error => {
          console.log(error, 'catch');
          this.getStaticStore()
        })
    }
    else {
      let location = this.props.location;
      let body = JSON.stringify({
        "longitude": location.long,
        "latitude": location.lat,
      })
      postWithBody('store/getAllStore', body)
        .then(storeData => {
          console.log(storeData, '...store data');
          if (storeData?.products && storeData?.products[0]) {
            this.props.setStoreData(storeData.products[0])
            this.props.getHomeBanner(storeData.products[0]._id)
          } else {
            console.log(body, 'else.....')
            this.getStaticStore()
          }
        })
        .catch(error => {
          console.log(error, 'catch');
        })
    }
  }

  getStaticStore = async () => {
    console.log("getStaticStore");
    let storeData = await getRequest("store/getStatic")
    this.props.setStoreData(storeData.store)
    this.props.getHomeBanner(storeData.store._id)
  }
  render() {
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='dashboard' component={BottomNavigation} />
        <Screen name='checkout' component={CheckoutScreen} />
        <Screen name='coupons' component={Coupons} />
        <Screen name='order-confirm' component={OrderConfirm} />
        <Screen name='my-address' component={MyAddress} />
        <Screen name='add-address' component={AddAddress} />
        <Screen name='my-orders' component={OlderOrders} />
        <Screen name='edit-profile' component={EditProfile} />
        <Screen name='order-tracking' component={Tracking} />
        <Screen name='place' component={GoogleAutoCompelete} />
        <Screen name='pdp' component={ProductDescriptionPage} />
        <Screen name='plp' component={ProductListingPages} />
      </Navigator>
    )
  }
}
const mapStateToProps = state => {
  return {
    location: state.AuthReducer.location,
  };

};
const mapDispatchToProps = dispatch => {
  return {
    setStoreData: (data) => dispatch({ type: 'STORE_DATA', payload: data }),
    setLocation: (address) => dispatch({ type: 'LOCATION', payload: address }),
    getHomeBanner: (storeId) => dispatch(getHomeBanner(storeId), dispatch(getTopCategory(storeId)), dispatch(getHomeLayout(storeId), dispatch(getMasterCatData(storeId)))),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation)
