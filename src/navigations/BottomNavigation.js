import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, CartScreen, SearchScreen, ProfileScreen } from './routes'
import Icon from '../utils/icons'
import { BUTTON_COLOR, CHARCOAL_COLOR, ICON_ACTIVE_COLOR, INACTIVE_TIN_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, TEXT_HEADING_COLOR } from '../utils/colors'
import { Font_Heebo_Light, Font_Heebo_SemiBold } from '../utils/typograpy'
import { useSelector } from 'react-redux'

const { Navigator, Screen } = createBottomTabNavigator()

export default function BottomNavigation() {
    const cart=useSelector(state=>state.AuthReducer.cart)
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: BUTTON_COLOR,
                tabBarInactiveTintColor: TEXT_HEADING_COLOR,
                tabBarShowLabel: false,
                // tabBarHideOnKeyboard: true,
                unmountOnBlur: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor:'#FAF3E0',
                }
            }}>
            <Screen name='home' component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused, size }) => <Icon name='home' size={size} color={color} />,
                }}
            />
            <Screen name='search' component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, focused, size }) => <Icon name='search' size={size} color={color} />,
                }} />
            <Screen name='cart' component={CartScreen}
                options={{
                    tabBarIcon: ({ color, focused, size }) => <Icon name='cart' size={size} color={color} />,
                    tabBarBadge: cart?cart.products.length:0,
                    tabBarBadgeStyle: {
                        fontSize: 8,
                        fontFamily: Font_Heebo_SemiBold
                    }
                }} />
            <Screen name='profile' component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused, size }) => <Icon name='person' size={size} color={color} />,
                }} />
        </Navigator>
    )
}

