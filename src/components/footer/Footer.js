import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Font_Heebo_Bold, Font_Heebo_Regular, Font_Heebo_SemiBold, Font_Lato_Bold, Font_Poppins_Bold } from '../../utils/typograpy'
import { PRIMARY_COLOR } from '../../utils/colors'
import BottomLinks from './BottomLinks'
import { useSelector } from 'react-redux'
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer'
import { useNavigation } from '@react-navigation/native'
import { SCREEN_WIDTH } from '../../utils/constants'

export default function Footer() {
    const masterCat = useSelector(state => state.AuthReducer.masterCategory)
    const navigation = useNavigation()
    console.log(masterCat, 'cat data');
    return (
        masterCat ? <View style={{ backgroundColor: "#fff", paddingTop: 20, }}>
            <Text style={styles.title}>All Categories</Text>
            <View style={styles.category_container}>
                {masterCat.map((item, index) => (
                    <View style={styles.footer_content} key={index}>
                        <View style={styles.headingContainer}>
                            <View style={[styles.borderTop, { top: 0 }]} />
                            <Text style={styles.subHeading}>{item.name}</Text>
                            <View style={[styles.borderTop, { bottom: 0 }]} />
                        </View>
                        <View style={{ marginBottom: 10, marginTop: 10 }}>
                            <View style={styles.content_list}>
                                {item.categories.map((item, index) => (<Text onPress={() => navigation.navigate('plp', { data: item })} key={index} style={styles.labels}>{item.name}</Text>))}
                            </View>
                        </View>
                    </View>
                ))}
            </View>
            <BottomLinks />
        </View> : null
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        color: "#000",
        fontFamily: Font_Lato_Bold,
        textTransform: 'uppercase',
        paddingHorizontal: 20,
        marginBottom: 20
    },
    category_container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    footer_content: {
        // paddingHorizontal: 12,
        width: SCREEN_WIDTH / 2,
    },
    subHeading: {
        fontSize: 17,
        color: "#000",
        fontFamily: Font_Heebo_Bold,
        paddingHorizontal: 20
    },
    labels: {
        fontSize: 14,
        color: "#000",
        fontFamily: Font_Heebo_Regular,
        marginVertical: 7
    },
    headingContainer: {
        height: 55,
        justifyContent: 'center',
    },
    borderTop: {
        borderTopWidth: 1,
        borderColor: PRIMARY_COLOR,
        position: 'absolute',
        width: SCREEN_WIDTH ,
        left: 0,
    },
    content_list: {
        paddingHorizontal: 20
    },
})

