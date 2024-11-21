import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Component } from 'react';
import Container from '../../components/layout/Container'
import ProductCard from '../../components/products/ProductCard'
import MainHeader from '../../components/header/MainHeader'
import Category from '../../components/category/Category'
import { Font_Heebo_Bold, Font_Heebo_SemiBold, Font_Lato_Bold } from '../../utils/typograpy';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../utils/colors'
import Icon from '../../utils/icons'
import { SCREEN_WIDTH } from '../../utils/constants'
import Filter from '../../components/filter/Filter'
import { getRequest } from '../../utils/helper/apiHelper';
import Loader from '../../components/loader/Loader';
import StoreClosed from '../../components/EmptyStates/StrorClosed';
import { connect } from 'react-redux';

class ProductListingPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilterVisible: false,
            isLoader: false,
            products: [],
            tempProducts: [],
        }
    }
    componentDidMount() {
        this.getCategoryProducts(this.props.route.params.data._id)
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.props.route.params.data._id !== nextProps.route.params.data._id) {
            this.getCategoryProducts(nextProps.route.params.data._id)
        }
    }
    getCategoryProducts(Id) {
        this.setState({ isLoader: true })
        getRequest('product/getByCategoryId/' + Id)
            .then(res => {
                if (!res.err) {
                    console.log("products: ", res.products);
                    this.setState({ products: res.products, tempProducts: res.products })
                } else {
                    alert(res.msg)
                }
                this.setState({ isLoader: false })
            })
            .catch(e => {
                this.setState({ isLoader: false })
                console.log(e, 'get category error')
            })
    }
    handleFilterModal = () => {
        this.setState({ isFilterVisible: !this.state.isFilterVisible })
    }

    filterProducts = (products) => {
        this.setState({ products })
    }
    render() {
        const { isFilterVisible, isLoader, products, tempProducts } = this.state
        return (
            <Container>
                <View>
                    <MainHeader />
                    <Category />
                </View>
                {!this.props.storeData ? <StoreClosed />:
                <View style={{flex:1}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => <View style={{ paddingHorizontal: 14, paddingVertical: 14, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, fontFamily: Font_Lato_Bold, color: SECONDARY_COLOR }}>{this.props.route.params.data.name}</Text>
                        <Icon />
                    </View>}
                    numColumns={2}
                    data={this.state.products}
                    renderItem={({ item, index }) => <View style={[styles.productCard, { alignItems: index % 2 ? 'flex-start' : 'flex-end', paddingLeft: index % 2 ? 10 : 0, paddingRight: index % 2 ? 0 : 10 }]}>
                        <ProductCard key={index} cardWidth={(SCREEN_WIDTH / 2) - 25} product={item} />
                    </View>}
                    keyExtractor={(item) => item._id}
                />
                <View style={{ position: 'absolute', bottom: 15, right: 15 }}>
                    <View style={styles.badge}>
                        <Text style={{ fontSize: 8, fontFamily: Font_Heebo_Bold, color: "#000",borderColor:'#000' }}>1</Text>
                    </View>
                    <TouchableOpacity style={styles.filterIcon} onPress={this.handleFilterModal}>
                        <Icon name='filter' size={26} type='fontAwesome' color="#fff" />
                    </TouchableOpacity>
                </View>
                {isLoader ? <Loader /> : null}
                <Filter isVisible={isFilterVisible} onClose={this.handleFilterModal} products={tempProducts} filterProducts={(product) => this.filterProducts(product)} />
                </View>}
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
      storeData:state.AuthReducer.storeData,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      // setStoreData: (data) =>dispatch({type: 'STORE_DATA', payload: data}),
      };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPages)
const styles = StyleSheet.create({
    productCard: {
        width: SCREEN_WIDTH / 2,
        marginBottom: 20,

    },
    filterIcon: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: SECONDARY_COLOR,
        // overflow: 'hidden'
    },
    badge: {
        backgroundColor: "#fff",
        borderColor:'#000',
        borderRadius: 100,
        position: 'absolute',
        right: 5,
        top: 3,
        zIndex: 999,
        paddingHorizontal: 4.6
    },
})