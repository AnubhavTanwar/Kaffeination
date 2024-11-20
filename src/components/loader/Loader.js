import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PRIMARY_COLOR } from '../../utils/colors'

export default function Loader() {
    return (
        <View style={styles.absolute}>
            <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff", borderRadius: 10, elevation: 5, }}>
                <ActivityIndicator size={'large'} color={PRIMARY_COLOR} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    absolute: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backgroundColor: "rgba(0,0,0,0.3)",
        ...StyleSheet.absoluteFill,
    }
})