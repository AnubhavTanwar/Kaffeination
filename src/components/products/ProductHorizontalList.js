import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { PRIMARY_COLOR } from '../../utils/colors'
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14 }}>
                    <Text style={styles.heading}>{item.name}</Text>
                    {!hideViewMore && <TouchableRipple style={{ backgroundColor: "#f1f1f1", padding: 5 }} onPress={() => navigation.navigate("plp",{data:item})}>
                        <Text style={styles.viewMoreButton}>View More <Icon name='chevron-forward' size={12} color='#000' /></Text>
                    </TouchableRipple>}

                </View>}
            <FlatList
                horizontal
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
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
        color: PRIMARY_COLOR,
        paddingVertical: 14,
        textTransform: 'uppercase'
    },
    viewMoreButton: {
        fontSize: 11,
        color: "#000",
        // textDecorationColor: "#000",
        // textDecorationLine: 'underline',
        fontFamily: Font_Heebo_Medium,
        backgroundColor:PRIMARY_COLOR,



    }
})