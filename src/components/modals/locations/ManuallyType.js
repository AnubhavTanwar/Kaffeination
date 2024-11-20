import { FlatList, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from '../../../utils/icons'
import { CHARCOAL_COLOR, GRAY_COLOR, PLACEHOLDER_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../../utils/colors'
import Container from '../../layout/Container'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold, Font_Poppins_Bold } from '../../../utils/typograpy'
import { TouchableRipple } from 'react-native-paper'
import RadioButton from '../../button/RadioButton'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { googleKey } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { getStore } from '../../../utils/appUtil/appUtil'
import { getAutoAddress } from '../../../utils/helper/apiHelper'
import Loader from '../../loader/Loader'
/**
 * 
 * @param {{ 
 * isVisible:boolean,
 * onClose:Function, 
 * }} props Props for the component
 * 
 */

const RenderAddress = ({ data, onPress, addressSelect }) => {
  return (
    <TouchableRipple style={styles.cardBody} onPress={onPress && onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 16, fontFamily: Font_Poppins_Bold, color: CHARCOAL_COLOR }}>{data?.type}</Text>
          <View style={styles.cardRow}>
            <Icon name='shipping-fast' type='fontAwesome5' color='#A7ACBC' style={{ marginTop: 2 }} />
            <Text style={styles.cardContextText}>{data?.landmark}</Text>
          </View>
          {data?.postalCode ? <Text style={[styles.cardContextText, { marginLeft: 0 }]}>Postal Code:{data?.postalCode}</Text> : null}
        </View>
        {/* <RadioButton status={data?.id === addressSelect} /> */}
      </View>
    </TouchableRipple>
  )
}

export default function ManuallyType({ isVisible = false, onClose, handleSearch }) {
  const address = useSelector(state => state.AuthReducer.userAddress)
  const [loading, setLoader] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch()

  handleNavigation = () => {
    navigation.navigate("place");
    onClose && onClose()
  }
  const onSelectAddress = async (details) => {
    setLoader(true)
    console.log(details);
    var lat = details?.location?.coordinates[1];
    var long = details?.location?.coordinates[0];
    let body = JSON.stringify({
      "longitude": long,
      "latitude": lat
    })
    let address = await getAutoAddress(lat, long)
    dispatch({ type: 'LOCATION', payload: address })
    getStore(body)
      .then(res => { setLoader(false), onClose && onClose() })
      .catch(e => { setLoader(false), console.log(e); })
  }
  useEffect(() => {
    return () => {
      StatusBar.setTranslucent(false)
    }
  }, [])
  return (
    <Modal visible={isVisible} onRequestClose={onClose && onClose}  >
      <Container>
        <View style={styles.container} pointerEvents='auto'>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Icon
                name='arrow-back'
                color='#fff'
                size={25}
                onPress={onClose && onClose}
                style={styles.icon}
              />
            </View>
            <Text style={{ fontSize: 20, fontFamily: Font_Poppins_Bold, color: "#000", lineHeight: 28.45, marginLeft: 14 }}>Search Address</Text>
          </View>
          <TouchableOpacity
            style={styles.textInputContainer}
            onPress={handleNavigation}
            activeOpacity={0.8}
          >
            <View style={{ height: 45, justifyContent: 'center' }}>
              <Text style={styles.textInput}>Type Address</Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 65, }}>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 15 }}
              ListHeaderComponent={() => address.length > 0 ? <View><Text style={{ fontSize: 16, fontFamily: Font_Lato_Bold, color: "#000" }}>Saved Address</Text></View> : null}
              data={address}
              renderItem={({ item, index }) => <RenderAddress data={item} onPress={() => onSelectAddress(item)} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
      </Container>
      {loading ? <Loader /> : null}
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    flex: 1
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
    paddingHorizontal: 14
  },
  textInput: {

    fontFamily: Font_Heebo_Medium,
    color: "#000",
    fontSize: 14
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
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})