import { Text, StyleSheet, View, FlatList, SafeAreaView, ScrollView, Image, TouchableOpacity, Animated } from 'react-native'
import React, { Component } from 'react'
import Container from '../../components/layout/Container'
import { SCREEN_WIDTH } from '../../utils/constants'
import { BANNER, LOGO } from '../../utils/images'
import Icon from '../../utils/icons'
import { PRIMARY_COLOR } from '../../utils/colors'
import { Font_Heebo_Bold, Font_Heebo_Medium, Font_Heebo_SemiBold, Font_Lato_Bold, Font_Poppins_Bold } from '../../utils/typograpy'
import ProductCard from '../../components/products/ProductCard'
import Footer from '../../components/footer/Footer'
import { TouchableRipple } from 'react-native-paper'
import MainHeader from '../../components/header/MainHeader'
import Category from '../../components/category/Category'
import ProductHorizontalList from '../../components/products/ProductHorizontalList'
import TrackingWidget from '../tacking/TrackingWidget'
import BannerSlider from './BannerSlider'
import DeliveryLocationEmpty from '../../components/EmptyStates/DeliveryLocationEmpty'
import NoInternet from '../../components/EmptyStates/NoInterNet'
import StoreClosed from '../../components/EmptyStates/StrorClosed'
import Loader from '../../components/loader/Loader'
import { connect } from 'react-redux'

const LOGO_SIZE = SCREEN_WIDTH * 0.35
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollViewOffset: new Animated.Value(0),
    }
  }
  render() {
    const { scrollViewOffset } = this.state
    return (

      <Container >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          stickyHeaderIndices={[0]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollViewOffset } } }],
            { useNativeDriver: false }
          )}
        >


          <View>
            <MainHeader />
            <Category scrollOffset={scrollViewOffset} />
          </View>
          {!this.props.storeData ? <StoreClosed /> :
            <React.Fragment>
              <View style={styles.homeBanner}>
                <BannerSlider />
              </View>
              {this.props.homeLayout.map(function (item, i) {
                return <ProductHorizontalList key={i} item={item} />
              })}
              <Footer />
            </React.Fragment>}
        </ScrollView>
        {this.props.homeLayout.length < 1 ? <Loader /> : null}
        {this.props.storeData && <TrackingWidget />}
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    homeLayout: state.AuthReducer.homeLayout,
    storeData: state.AuthReducer.storeData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // setStoreData: (data) =>dispatch({type: 'STORE_DATA', payload: data}),
    // getHomeBanner: (storeId) =>dispatch(getHomeBanner(storeId),dispatch(getTopCategory(storeId)),dispatch(getHomeLayout(storeId))),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)
const styles = StyleSheet.create({
  homeBanner: {
    marginBottom: 20
  }
})