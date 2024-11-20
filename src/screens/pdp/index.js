import { Text, StyleSheet, View, ScrollView, Image, Animated } from 'react-native'
import React, { Component } from 'react'
import Container from '../../components/layout/Container'
import MainHeader from '../../components/header/MainHeader'
import Category from '../../components/category/Category'
import Icon from '../../utils/icons'
import { Font_Heebo_Bold, Font_Heebo_Light, Font_Heebo_Medium, Font_Lato_Bold, Font_Poppins_Bold } from '../../utils/typograpy'
import { DISCOUNT_BADGE_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import Swiper from 'react-native-swiper'
import { FaqData, SCREEN_WIDTH } from '../../utils/constants'
import { BestTag } from '../../components/tags/tags'
import ProductHorizontalList from '../../components/products/ProductHorizontalList'
import CollapsibleHeader from '../../components/faq/faq'
import Footer from '../../components/footer/Footer'
import { getRequest } from '../../utils/helper/apiHelper'
import { getFinalDiscount, getFinalPrice } from '../../utils/appUtil/appUtil'
import Loader from '../../components/loader/Loader'

const IMAGE_WIDTH = SCREEN_WIDTH - 30

const IMAGE_CONTAINER_ASPECT_RATIO = 294 / 308;
const IMAGE_CONTAINER_HEIGHT = IMAGE_WIDTH / IMAGE_CONTAINER_ASPECT_RATIO;

export default class ProductDescriptionPage extends Component {
    constructor(props){
        super(props)
        this.state={
            product:''
        }
    }
    componentDidMount(){
        this.getProductDetails(this.props.route.params.product._id)
    }
    getProductDetails(id){
        getRequest('product/getById/'+id)
        .then(res=>{
            console.log(res)
            if(!res.err){
               this.setState({product:res.product})
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render() {
        const swiperConfig = {
            autoplay: true,
            showsButtons: false,
            paginationStyle: styles.paginationStyle,
            activeDotColor: PRIMARY_COLOR,
            activeDotStyle: styles.activeDotStyle,
            dotColor: '#C2C2C2',
            dotStyle: styles.dotStyle,
            width: IMAGE_WIDTH,
            height: IMAGE_CONTAINER_HEIGHT,
            loop: true
        }
        const {product}=this.state
        return (
            <Container>
                <MainHeader />
                <Category />
                {product?
                <ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 14 }}>
                        <View style={styles.iconContainer}>
                            <Icon
                                name='arrow-back'
                                color='#fff'
                                size={22}
                                onPress={()=>this.props.navigation.goBack()}
                                style={styles.icon}
                            />
                        </View>
                        {/* <Icon name='arrow-back' size={22} style={styles.backButton} onPress={()=>this.props.navigation.goBack()}/> */}
                        <Text style={{ fontSize: 22, marginLeft: 5 ,fontFamily: Font_Lato_Bold, color: PRIMARY_COLOR }}>Category Name</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Swiper {...swiperConfig}>
                        {this.state.product.images.map((item, index) => (
                        <Image key={index} style={{ width: IMAGE_WIDTH, height: IMAGE_CONTAINER_HEIGHT }} source={{ uri: item.url }} />
                        ))}
                        </Swiper>
                    </View>
                    <View style={{ paddingHorizontal: 14 }}>
                        <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000", lineHeight: 30, marginBottom: 10 }}>{product.name}</Text>
                        <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000", lineHeight: 30, marginBottom: 10 }}>{product.description}</Text>
                        <BestTag />
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ fontSize: 22, fontFamily: Font_Heebo_Bold, color: "#000" }}>${getFinalPrice(product)}</Text>
                                {getFinalPrice(product)>=product.price?null:<Text style={styles.discountPrice}>${product.price}</Text>}
                                {getFinalPrice(product)>=product.price?null:<View style={{ backgroundColor: DISCOUNT_BADGE_COLOR, paddingHorizontal: 6, paddingVertical: 2 }}>
                                    <Text style={{ fontSize: 11, fontFamily: Font_Heebo_Light, color: "#000" }}>{getFinalDiscount(product)}% off</Text>
                                </View>}
                            </View>
                            <View>
                                <Text style={{ fontSize: 22, fontFamily: Font_Heebo_Bold, color: "#000" }}>{product.info}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                            <Icon name='three-bars' type='octicons' size={20} color='#000' style={{ width: 30, }} />
                            <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Medium, color: "#000", flex: 1 }}>Fashion Products</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                            <Icon name='list-unordered' type='octicons' size={20} color='#000' style={{ width: 30, }} />
                            <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Medium, color: "#000", flex: 1 }} numberOfLines={3}>Et quidem faciunt, ut summum bonum sit extremum et rationibus conquisitis de voluptate. Sed ut summum bonum sit id,</Text>
                        </View>

                    </View>
                    <View style={{ paddingHorizontal: 14, marginVertical: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000" }}>You can also check this items</Text>
                    </View>
                    {/* <ProductHorizontalList hideListHeader /> */}
                    <View style={{ paddingHorizontal: 14, marginVertical: 14 }}>
                        <Text style={{ fontSize: 30, fontFamily: Font_Lato_Bold, color: PRIMARY_COLOR, textTransform: 'capitalize' }}>frequently asked questions</Text>
                    </View>
                    <View style={{ paddingHorizontal: 14 }}>
                        <CollapsibleHeader data={FaqData} />
                    </View>
                    <Footer />
                </ScrollView>:<Loader />}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    // backButton: {
    //     width: 30,
    //     height: 30,
    //     backgroundColor: PRIMARY_LIGHT_COLOR,
    //     textAlign: 'center',
    //     textAlignVertical: 'center',
    //     borderRadius: 30,
    //     marginRight: 14
    // },
    imageContainer: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        marginBottom: 14
    },
    paginationStyle: {
        bottom: 8,
    },
    dotStyle: {
        width: 5,
        height: 5,

    },
    activeDotStyle: {
        width: 20,
        height: 5,

    },
    discountPrice: {
        fontSize: 17,
        fontFamily: Font_Heebo_Bold,
        color: "rgba(145, 145, 145, 1)",
        textDecorationColor: 'rgba(145,145,145,1)',
        textDecorationLine: 'line-through',
        marginHorizontal: 8
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: PRIMARY_LIGHT_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        textAlign: 'center',
        textAlignVertical: 'center',
      },
})