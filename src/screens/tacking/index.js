import { Animated, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Container from '../../components/layout/Container'
import { SCREEN_HEIGHT, SCREEN_WIDTH, googleKey } from '../../utils/constants'
import { Font_Heebo_Bold, Font_Heebo_Regular, Font_Heebo_SemiBold } from '../../utils/typograpy'
import { CHARCOAL_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, SECONDARY_COLOR } from '../../utils/colors'
import Icon from '../../utils/icons'
import { greenA400 } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors'
import { Font_Heebo_Medium } from '../../utils/typograpy'
import { useNavigation } from '@react-navigation/native'

import MapView, { Marker } from 'react-native-maps';
import useStatusBarHeight from '../../utils/constants/StatusBarHeight'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapViewDirections from 'react-native-maps-directions';
import ProgressStrip from '../../components/progress/ProgressStrip'

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };

export default function Tracking({ route }) {
    const [scrollOffsetAnim] = useState(new Animated.Value(0))
    const [freeHeight, setFreeHeight] = useState(0)
    const [order] = useState(route.params.order)
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    const statusBarHeight = useStatusBarHeight();
    const insets = useSafeAreaInsets()
    const initialScroll = () => {
        scrollViewRef.current?.scrollTo({ x: 0, y: SCREEN_HEIGHT * 0.42 })
    }
    useEffect(() => {
        initialScroll()

        return () => {

        }
    }, [scrollViewRef, freeHeight])

    const HEIGHT = SCREEN_HEIGHT * 0.7

    const HEADER_OPACITY = scrollOffsetAnim.interpolate({
        inputRange: [0, HEIGHT],
        outputRange: [0, 1],
    })
    const handleFreeSpace = (height) => {
        if (height < SCREEN_HEIGHT / 2) {
            setFreeHeight((SCREEN_HEIGHT - height) - (insets.bottom + insets.top) + Platform.select({ ios: insets.top, android: 17 }))
        }

    }
    return (
        <Container>
            <View style={styles.backButton}>
                <Animated.View style={[styles.cardHeader, { opacity: HEADER_OPACITY, backgroundColor: "#fff", position: 'absolute', padding: 14, paddingLeft: 55, borderBottomWidth: 0, zIndex: -1 }]}>
                    <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: CHARCOAL_COLOR }}>Shipper</Text>
                </Animated.View>
                <View style={styles.iconContainer}>
                    <Icon
                        name='arrow-back'
                        color='#fff'
                        size={25}
                        onPress={navigation.goBack}
                        style={styles.icon}
                    />
                </View>
                {/* <Icon onPress={navigation.goBack} name='arrow-back' style={styles.backButtonIcon} size={20} color='#fff' /> */}
            </View>
            <ScrollView
                ref={scrollViewRef}
                onScroll={(evt) => {
                    const { contentOffset } = evt.nativeEvent;
                    const { y } = contentOffset;
                    if (y > HEIGHT) {
                        scrollOffsetAnim.setValue(y);
                    } else {
                        scrollOffsetAnim.setValue(0);
                    }

                }}
                showsVerticalScrollIndicator={false}
                bounces={false}
                alwaysBounceVertical={false}
                style={{ zIndex: 99 }}
                contentContainerStyle={{ flexGrow: 1, }}
                stickyHeaderIndices={[0]} decelerationRate={'fast'} snapToStart scrollEventThrottle={18}
                snapToInterval={SCREEN_HEIGHT}
                snapToOffsets={[SCREEN_HEIGHT * 0.42, (SCREEN_HEIGHT / 1.1) + 45]}>
                <MapView
                    style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
                    initialRegion={{
                        latitude: 37.3318456,
                        longitude: -122.0296002,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                        title="Store"
                        description="Store Location"
                    />
                    {/* <MapViewDirections
                        origin={order.address?.location?.coordinates}
                        destination={destination}
                        apikey={googleKey}
                        strokeWidth={3}
                        strokeColor="red"
                    /> */}
                </MapView>
                <View style={[styles.shipperCard]} onLayout={(e) => handleFreeSpace(e.nativeEvent.layout.height)}>
                    <View style={styles.divider} />
                    <View style={styles.cardHeader}>
                        <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: CHARCOAL_COLOR }}>Order Status</Text>
                        <ProgressStrip status={order.status} />
                        <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: CHARCOAL_COLOR }}>Shipper</Text>
                    </View>
                    <View style={styles.shipperCardBody} >
                        <View style={[styles.flexRow, { marginBottom: 14 }]}>
                            <Image source={{ uri: "https://img.freepik.com/free-photo/delivery-concept-portrait-happy-african-american-delivery-man-pointing-hand-present-box-package-isolated-grey-studio-background-copy-space_1258-1263.jpg" }} style={{ width: 45, height: 45, borderRadius: 45 }} />
                            <View style={{ flex: 1, paddingLeft: 14 }}>
                                <Text style={{ fontSize: 16, fontFamily: Font_Heebo_SemiBold, color: "#000" }}>Tod Schmitt</Text>
                                <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Regular, color: CHARCOAL_COLOR }}>Delivery Boy</Text>
                            </View>
                            <Icon name='ios-call-sharp' style={styles.icon} color='#fff' size={22} onPress={() => console.log("@working")} />
                        </View>
                        <View>
                            <View style={{ marginBottom: 12 }}>
                                <Text style={{ fontSize: 16, color: "#000", fontFamily: Font_Heebo_Bold }}>Order Placed at 12:03 PM</Text>
                                <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Regular }}>{order.address?.address} {order.address?.address2} </Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.heading}>Order Number</Text>
                                <Text style={styles.label}>{order.orderNumber}</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.heading}>Estimate Time</Text>
                                <Text style={styles.label}>23 min</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.heading}>Total Amount</Text>
                                <Text style={styles.label}>${order.total}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: freeHeight, backgroundColor: "#fff", width: SCREEN_WIDTH }} />
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    shipperCard: {
        marginTop: Platform.select({ ios: -190, android: -100 }),
        backgroundColor: "#fff",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        zIndex: 99,
        position: 'relative',
        // transform: [{ translateY: SCREEN_HEIGHT / 2 }]
    },

    cardHeader: {
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(200,200,200,1)",
        padding: 14,
    },
    shipperCardBody: {
        padding: 14,

    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14
    },
    icon: {
        width: 40,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 40
    },
    heading: {
        fontSize: 14,
        color: "#A8A9AB",
        fontFamily: Font_Heebo_Medium
    },
    label: {
        fontSize: 14,
        color: "#000",
        fontFamily: Font_Heebo_Bold
    },
    divider: {
        width: 80,
        height: 5,
        backgroundColor: "#d1d1d1",
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        height: 45,
        top: 1
    },
    // backButtonIcon: {
    //     width: 35,
    //     height: 35,
    //     textAlign: 'center',
    //     textAlignVertical: 'center',
    //     backgroundColor: PRIMARY_COLOR,
    //     borderRadius: 40
    // },
    iconContainer: {
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: SECONDARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },
})