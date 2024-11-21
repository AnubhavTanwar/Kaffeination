import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Poppins_Bold } from '../../../utils/typograpy';
import { GRAY_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, SECONDARY_COLOR } from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../../utils/icons';
import { useDispatch } from 'react-redux';
import { getAutoAddress } from '../../../utils/helper/apiHelper';
import { googleKey } from '../../../utils/constants';
import { getStore } from '../../../utils/appUtil/appUtil';
import Loader from '../../loader/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GoogleAutoCompelete() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isLoading, setLoader] = useState(false)
    const onSelectAddress = async (details) => {
        setLoader(true)
        var lat = details?.geometry?.location?.lat;
        var long = details?.geometry?.location?.lng;
        let body = JSON.stringify({
            "longitude": long,
            "latitude": lat
        })
        let address = await getAutoAddress(lat, long, details)
        dispatch({ type: 'LOCATION', payload: address })
        getStore(body)
            .then(res => {
                navigation.goBack()
                setLoader(false)
            })
            .catch(e => { setLoader(false), console.log(e); })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingTop: 14 }}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Icon
                            name='arrow-back'
                            color='#fff'
                            size={25}
                            onPress={navigation.goBack}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={{ fontSize: 20, fontFamily: Font_Poppins_Bold, color: "#000", lineHeight: 28.45, marginLeft: 14 }}>Search Address</Text>
                </View>
                <GooglePlacesAutocomplete
                    fetchDetails={true}
                    minLength={2}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        onSelectAddress(details)
                    }}
                    listViewDisplayed={'auto'}
                    keyboardShouldPersistTaps='handled'
                    // keepResultsAfterBlur={true}        
                    listUnderlayColor='#400'

                    // renderRow={({ description }) => <Pressable style={{ backgroundColor: "#f00", zIndex: 99999 }} onPress={() => console.log(description)}><Text >{description}</Text></Pressable>}
                    debounce={1000}
                    query={{
                        key: googleKey,
                        language: 'en',
                    }}
                    styles={{
                        textInput: styles.textInput,
                        textInputContainer: styles.textInputContainer,
                    }}
                    textInputProps={{
                        placeholderTextColor: "#888"
                    }}
                />
                {isLoading ? <Loader /> : null}
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 14,
        // flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 14,
        marginBottom: 20
    },
    textInputContainer: {
        backgroundColor: GRAY_COLOR,
        marginHorizontal: 14,
        borderRadius: 14,
        paddingHorizontal: 14,
    },
    textInput: {
        height: 45,
        fontFamily: Font_Heebo_Medium,
        color: "#000",
        fontSize: 14,
        backgroundColor: 'transparent'
    },
    cardBody: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 12,
        borderBottomWidth: 1,
        borderColor: "rgba(222,222,222,1)",
        paddingBottom: 18

    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    cardContextText: {
        fontSize: 14,
        fontFamily: Font_Heebo_Regular,
        color: "#A7ACBC",
        marginLeft: 10,
        flex: 1
    },
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
    color:{
        backgroundColor:'red',
    }
})