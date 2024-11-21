import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { PRIMARY_COLOR, TEXT_HEADING_COLOR } from '../../utils/colors'
import { Font_Heebo_Medium, Font_Lato_Bold } from '../../utils/typograpy'
import { TouchableRipple } from 'react-native-paper'
import ProductCard from './ProductCard'
import { useNavigation } from '@react-navigation/native'
import Icon from '../../utils/icons'
import { isListNullOrEmpty } from '../../utils/appUtil/appUtil'
/**
 * 
 * @param {{ 
 * hideListHeader:boolean,
 * hideViewMore:boolean, 
 * }} props Props for the component
 * 
 */
export default function ProductHorizontalList({ hideListHeader, hideViewMore,item }) {
    const navigation = useNavigation()

    return (
        isListNullOrEmpty(item.products)?null:
        <View style={styles.productList}>
            {!hideListHeader &&
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14 }}>
                    <Text style={styles.heading}>{item.name}</Text>
                    {!hideViewMore && <TouchableRipple style={{ backgroundColor: "#556B2F", padding: 5 }} onPress={() => navigation.navigate("plp",{data:item})}>
                        <Text style={styles.viewMoreButton}>View More <Icon name='chevron-forward' size={12} color='#fff' /></Text>
                    </TouchableRipple>}

                </View>}
            <FlatList
                horizontal
                ItemSeparatorComponent={() => <View style={{ width: 25 }} />}
                contentContainerStyle={{ paddingHorizontal: 14 }}
                data={item.products}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,i }) => <ProductCard key={i} product={item}/>}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    productList: {
        flex: 1,
        marginBottom: 30
    },
    heading: {
        fontSize: 20,
        fontFamily: Font_Lato_Bold,
        color: TEXT_HEADING_COLOR,
        fontWeight: "bold",
        paddingVertical: 14,
        textTransform: 'uppercase'
    },
    viewMoreButton: {
        fontSize: 11,
        color: "#fff",
        // backgroundColor: '#556B2F',
        // textDecorationColor: "#000",
        // textDecorationLine: 'underline',
        fontFamily: Font_Heebo_Medium,


    }
})