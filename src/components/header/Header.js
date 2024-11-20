import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CHARCOAL_COLOR, GRAY_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import Icon from '../../utils/icons'
import { Font_Lato_Bold } from '../../utils/typograpy'
import { TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
/**
 * 
 * @param {{ 
 * rightSide:JSX,
 * headerTitle:string, 
 * goHome:boolean
 * }} props Props for the component
 * 
 */
export default function Header({ rightSide, headerTitle, goHome }) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
              <Icon
                name='arrow-back'
                color='#fff'
                size={25}
                onPress={() => goHome ? navigation.navigate("home") : navigation.goBack()}
                style={styles.icon}
              />
            </View>
            <View>
                <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000", marginLeft: 14, lineHeight: 23 }}>{headerTitle}</Text>
            </View>
            <View>
                {rightSide && rightSide}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 0.5,
        borderColor: "rgba(244,244,244,1)"
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