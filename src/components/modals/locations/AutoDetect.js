import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Icon from '../../../utils/icons'
import { TouchableRipple } from 'react-native-paper'
import { Font_Heebo_Medium, Font_Heebo_SemiBold, Font_Lato_Bold } from '../../../utils/typograpy'
import { CHARCOAL_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, SECONDARY_LIGHT_COLOR } from '../../../utils/colors'
import LocationManuallyType from './ManuallyType'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/constants'
import GetLocation from 'react-native-get-location'
import { getAutoAddress, getRequest, postWithBody } from '../../../utils/helper/apiHelper'
import { useDispatch } from 'react-redux'
import { getHomeBanner, getTopCategory } from '../../../actions/thunkActions'
import { getStore } from '../../../utils/appUtil/appUtil'
import Loader from '../../loader/Loader'
/**
 * 
 * @param {{ 
 * isVisible:boolean,
 * onClose:Function, 
 * }} props Props for the component
 * 
 */
export default function Autodetect({ isVisible, onClose }) {
  const [isTypeManually, setIsTypeManually] = useState(false)
  const [isLoading,setLoader]=useState(false)
  const dispatch=useDispatch()
  const handleTypeManually = () => {
    setIsTypeManually(!isTypeManually)
    onClose()
  }
  const handleAutoDetect = () => {
    if(isLoading){return}
    setLoader(true)
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(async location => {
      let body=JSON.stringify({
        "longitude":location.longitude,
        "latitude":location.latitude
        })
        getAutoAddress(location.latitude,location.longitude)
        .then(address=>{
          setLoader(false)
          dispatch({type: 'LOCATION', payload: address})
        }).catch(err=>{setLoader(false), console.log(err)})
        getStore(body)
        .then(res => { onClose(),setLoader(false)})
        .catch(e => { console.log(e),setLoader(false) })
    })
    .catch( error => {
      setLoader(false)
      console.log("hjsfhasjh");
        alert(JSON.stringify(error))
    })
   }
   const handleSearch=(data,details)=>{
    console.log(data,details);
   }
  return (
    <>
      <Modal visible={isVisible} transparent onRequestClose={onClose && onClose} animationType='slide'>
        <View style={styles.container} pointerEvents='box-none'>
          <TouchableWithoutFeedback style={StyleSheet.absoluteFillObject} onPressOut={onClose && onClose}>
            <View style={styles.absolute} />
          </TouchableWithoutFeedback>
          <View style={styles.wrapper} >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={styles.iconContainer}>
              <Icon
                name='location-sharp'
                size={25}
                color={'#fff'}
                style={styles.icon}
              />
            </View>
              <Text style={{ fontSize: 25, fontFamily: Font_Lato_Bold, color: "#000", marginLeft: 10 }}>Select Location</Text>
            </View>
            <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR, marginBottom: 16, marginLeft: 5 }}>Please provide your delivery location for the best experience</Text>
            <View style={styles.buttonWrapper}>
              <TouchableRipple style={styles.button} onPress={handleTypeManually}>
                <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000" }}>Type Manually</Text>
              </TouchableRipple>
              <TouchableRipple style={[styles.button, { backgroundColor: PRIMARY_COLOR }]} onPress={handleAutoDetect}>
                <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#fff" }}>Auto Detect</Text>
              </TouchableRipple>
            </View>
          </View>
          {isLoading?<Loader/>:null}
        </View>
      </Modal>
      <LocationManuallyType isVisible={isTypeManually} onClose={handleTypeManually} handleSearch={(data, details)=>handleSearch(data,details)}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  wrapper: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 8
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: SECONDARY_LIGHT_COLOR,
    width: "48%",
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  absolute: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...StyleSheet.absoluteFill,

  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    overflow: 'hidden', // Ensure the icon stays within the circular boundary
  },
  icon: {
    width: 25,
    height: 25,
  }
})