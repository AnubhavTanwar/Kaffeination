import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Icon from '../../utils/icons'
import { Font_Heebo_Regular } from '../../utils/typograpy'
import { BACKGROUND_COLOR, ICON_INACTIVE_COLOR, SECONDARY_COLOR } from '../../utils/colors'
import { Link } from '@react-navigation/native'

export default function BottomLinks() {
    const handleOpenUrl = async (url) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: 14, backgroundColor: BACKGROUND_COLOR, paddingVertical: 14, borderTopWidth:1 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{flex:1}}>
                    <Text style={styles.labels}>About Kaffeination</Text>
                    <Text style={styles.labels}>FAQs</Text>
                    <Text style={styles.labels}>Terms & Conditions</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.labels}>Contact Us</Text>
                    <Text style={styles.labels}>Privacy Policy</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <Icon name='logo-instagram' color={SECONDARY_COLOR} size={20} onPress={() => handleOpenUrl("https://m.instagram.com")} />
                <Icon name='logo-facebook' color={SECONDARY_COLOR} size={20} onPress={() => handleOpenUrl("https://m.facebook.com")} />
                <Icon name='logo-twitter' color={SECONDARY_COLOR} size={20} onPress={() => handleOpenUrl("https://m.twitter.com")} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    labels: {
        color: SECONDARY_COLOR,
        fontFamily: Font_Heebo_Regular,
        fontSize: 14,
        marginVertical: 7.5
    }
})