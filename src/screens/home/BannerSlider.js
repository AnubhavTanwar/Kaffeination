import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SCREEN_WIDTH } from '../../utils/constants';
import Swiper from 'react-native-swiper';
import { Font_Heebo_Bold } from '../../utils/typograpy';
import { PRIMARY_COLOR } from '../../utils/colors';
import { BANNER } from '../../utils/images';
import { useSelector } from 'react-redux';
const IMAGE_WIDTH = SCREEN_WIDTH

const IMAGE_CONTAINER_ASPECT_RATIO = 369 / 287;
const IMAGE_CONTAINER_HEIGHT = IMAGE_WIDTH / IMAGE_CONTAINER_ASPECT_RATIO;

export default function BannerSlider() {
    const banners=useSelector(state=>state.AuthReducer.homeBanners)
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
    return (
        <View style={styles.imageContainer}>
            <Swiper {...swiperConfig}>
                {banners.map((item, index) => <Image key={index.toString()} style={{ width: IMAGE_WIDTH, height: IMAGE_CONTAINER_HEIGHT }} source={{ uri: item.url }} />)}
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({

    imageContainer: {
        width: SCREEN_WIDTH
        ,
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
    }
})