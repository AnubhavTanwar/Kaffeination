import { initStripe, usePaymentSheet, useStripe } from '@stripe/stripe-react-native';
import { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { postWithBody } from '../../utils/helper/apiHelper';
export default initializePaymentSheet = ({order,paymentSuccess,paymentFailed}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  useEffect(() => {
    initializePaymentSheet1();
  }, []);
  initializePaymentSheet1 = async () => {
    let body = {
      "userId": order.userId,
      "orderId": order._id,
      "currency": "inr",
      "amount": parseInt(order.total)*100
    }
    const billingDetails = {
      name: 'Jane Doe',
      email: 'foo@bar.com',
      phone: '555-555-555',
      address: "address",
    };
    console.log(body);
    let { paymentIntent,
      ephemeralKey,
      customer,
      publishableKey, err, msg } = await postWithBody('payment/create/intent', JSON.stringify(body))
    if (!err) {
      const intentRes = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customFlow: true,
        merchantDisplayName: 'Goat Delivery PVT LTD',
        // defaultBillingDetails: billingDetails,
        customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      // setupIntentClientSecret: paymentIntent,
      style: 'automatic',
      googlePay: {
        merchantCountryCode: 'US',
        testEnv: true,
      },
      returnURL: 'stripe-example://stripe-redirect',
      });
      console.log(intentRes, 'res..');
      let {error,paymentOption} = await presentPaymentSheet({ clientSecret: paymentIntent });
      console.log(error,paymentOption);
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        paymentFailed()
      } else {
        paymentSuccess()
      }
    } else {
      alert(msg)
    }
  }
  // return (<View >
  // </View>)
};