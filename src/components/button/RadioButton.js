import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TouchableRipple } from 'react-native-paper'
import { PRIMARY_COLOR } from '../../utils/colors'

export default function RadioButton({ onPress, value, status }) {
    return (
        <TouchableOpacity onPress={onPress && onPress} style={{ width: 20, height: 20, borderWidth: 3, borderColor: PRIMARY_COLOR, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
            {status && <View style={{ width: 8, height: 8, backgroundColor: PRIMARY_COLOR, borderRadius: 10 }} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})