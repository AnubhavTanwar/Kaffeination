import { Text, StyleSheet, View, TextInput, Platform } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './src/navigations/RootNavigation'
import { store, persistor } from './src/Reducer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { initialize } from 'react-native-clarity';
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      // Initialize Clarity.
      initialize("h8ad6ictmq");
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 200);
  }
  render() {
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
    return (
      <Provider store={store}>
        <PersistGate
          //  loading={<Text>Loading...</Text>} 
          persistor={persistor}>
          <StripeProvider
            publishableKey='pk_test_51MzBEESJOg923wawKuxLrbgIRfYMfcKuvi0136trfVcIARAJeJWnZ1GH5EetK7e0qJu84oF1ZIGOTgYGqKxHtl5d00HjJgTPj1'>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </StripeProvider>
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({})