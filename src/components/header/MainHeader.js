import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Font_Heebo_SemiBold, Font_Poppins_Bold } from '../../utils/typograpy'
import Icon from '../../utils/icons'
import { PRIMARY_COLOR } from '../../utils/colors'
import LocationAutoDetect from '../../components/modals/locations/AutoDetect'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
export default function MainHeader() {
  const [locationModal, setLocationModal] = useState(false)
  const navigation=useNavigation()
  const location=useSelector(state=>state.AuthReducer.location)
  const handleLocationModal = () => {
    setLocationModal(false)
  }
  const handleLocationModalTrue = () => {
    setLocationModal(true)
  }
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Image
          source={require('../../assets/logo_new.png')}
          style={styles.logoImage} 
        />
      </View>
      <TouchableOpacity style={styles.location} onPress={handleLocationModalTrue}>
      <Icon
        name='location-sharp'
        size={30}
        color='#fff'
        style={[
          { width: 45, height: 35, textAlign: "center", textAlignVertical: 'center' },
          Platform.OS === 'ios' ? { marginTop: 2 } : null, // Adjust the marginTop for iOS
        ]}
      />
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ fontSize: 12, color: "#fff", fontFamily: Font_Heebo_SemiBold, }}>{location?.address1?location?.address1:'Your Location'}</Text>
          <Text style={{ fontSize: 13, color: "#fff", fontFamily: Font_Heebo_SemiBold, }} numberOfLines={1}>{location?.address2}</Text>
        </View>
        <Icon name='chevron-down' size={20} color='#fff' />
      </TouchableOpacity>
      <LocationAutoDetect isVisible={locationModal} onClose={handleLocationModal} />
    </View>
  )
}



const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    height: 60,
    zIndex: 1,
    elevation: 10,
  },
  logo: {
    marginHorizontal: 14,
    backgroundColor: "#fff",
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 60,
    width: 150,
    justifyContent: 'center',
    backgroundColor: '#430A5D',
  },
  logoImage: {
    width: 150,
    height: 55,
    resizeMode: 'contain',
    borderColor:"red",
    paddingBottom:4,
    borderLeftWidth: 2,
    borderLeftColor: 'red',
    borderRightWidth: 2,
    borderRightColor: 'red',
    // backgroundColor: '#430A5D', 
},
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 14,
    flex: 1
  },
})