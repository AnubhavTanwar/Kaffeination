import { Text, StyleSheet, View, TextInput, Modal, Alert, ScrollView } from 'react-native';
import { Component } from 'react';
import Container from '../../components/layout/Container'
import Icon from '../../utils/icons';
import { Font_Heebo_Regular, Font_Heebo_SemiBold, Font_Lato_Bold } from '../../utils/typograpy';
import { CHARCOAL_COLOR, GRAY_COLOR, PLACEHOLDER_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import Button from '../../components/button/Button'
import { postWithBody, putRequestWithBody } from '../../utils/helper/apiHelper';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import jwt_decode from "jwt-decode";
import { connect } from 'react-redux';
import { getFloatingOrder, updateCart } from '../../actions/thunkActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOtpSend: false,
            isOtpVerify: false,
            isAuthorized: false,
            email: '',
            phone: '',
            LastName: '',
            FirstName: '',
            otp: '',
            userData: this.props.data,
            isLoading: false,
        }
    }

    updateProfile = () => {

        let body = JSON.stringify({
            "userId": this.state.userData._id,
            "email": this.state.email,
            "firstName": this.state.FirstName,
            "lastName": this.state.LastName
        })
        this.setState({ isLoading: true })
        putRequestWithBody('user/update', body).
            then(res => {
                this.setState({ isLoading: false })
                if (!res.err) {
                    this.props.login(res.user)
                    // this.props.getAddress()
                    if (this.props.cart._id) {
                        let body = {
                            userId: res.user._id,
                            cartId: this.props.cart._id
                        }
                        this.props.updateCart(JSON.stringify(body))
                    }
                    this.setState({ isOtpSend: false, isOtpVerify: false, isAuthorized: true })
                } else {
                    alert(res.msg)
                }
            }).catch(err => {
                console.log(err, 'update profile');
            })
    }
    onChangeText(val, key) {
        this.setState({ [key]: val })
    }
    handleSendOtp = () => {
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email || !pattern.test(this.state.email)) {
            alert('Please enter valid Email')
            return
        }
        this.setState({ isLoading: true })
        let body = JSON.stringify({ email: this.state.email.trim() })
        postWithBody('user/signInWithGmail', body)
            .then(res => {
                this.setState({ isLoading: false })
                if (!res.err) {
                    this.setState({ isOtpSend: true, isAuthorized: true })
                } else {
                    alert(res.msg)
                }
            }).catch(error => {
                console.log(error, 'handleSendOtp.')
            })
    }
    OTPvalidation = (OTP) => {
        if (!OTP || !this.state.email) { return }
        let body = JSON.stringify({
            email: this.state.email,
            OTP: OTP
        })
        this.setState({ isLoading: true })
        postWithBody('user/accountVerification', body)
            .then(res => {
                this.setState({ isLoading: false })
                if (!res.err) {
                    var decoded = jwt_decode(res.token);
                    console.log(decoded, "decoded");
                    if (decoded._id.firstName) {
                        this.props.login(decoded._id)
                        // this.props.getAddress()
                        if (this.props.cart._id) {
                            let body = {
                                userId: decoded._id._id,
                                cartId: this.props.cart._id
                            }
                            this.props.updateCart(JSON.stringify(body))
                        }
                        this.setState({ isOtpSend: false, isOtpVerify: false, isAuthorized: true })
                    } else {
                        this.setState({ isOtpSend: false, isOtpVerify: true, isAuthorized: true, userData: decoded._id })

                    }
                }
            }).catch(err => {
                console.log(err, 'update profile');
            })
    }

    render() {
        const { isOtpVerify, isOtpSend, isAuthorized, userData, isLoading } = this.state;
        const { isCheckout } = this.props
        const Wrapper = isCheckout ? View : ScrollView;
        return (
            <Wrapper style={{ flex: 1, backgroundColor: "#fff" }} keyboardDismissMode={'interactive'}
                keyboardShouldPersistTaps="handled" >
                <View style={styles.container} >
                    <View style={styles.actionCard} >
                        {this.props.data && isCheckout && <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
                            <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    backgroundColor: PRIMARY_LIGHT_COLOR,
                                    borderRadius: 17.5, // Half of the width and height
                                    justifyContent: 'center', // Center content vertically
                                    alignItems: 'center', // Center content horizontally
                                }}
                            >
                                <Icon
                                    name='check'
                                    type='feather'
                                    size={22}
                                    color='#000'
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 14 }}>
                                <Text style={styles.cardTitle}>{this.props.data.firstName} {this.props.data.lastName}</Text>
                                <View style={[styles.cardBody, { marginTop: 5 }]}>
                                    <View style={{ flex: 1, marginRight: 30 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name='email' type='materialCommunityIcons' color='#000' style={{ marginTop: 2 }} />
                                            <Text style={{ fontSize: 17, fontFamily: Font_Heebo_SemiBold, color: "#000", marginLeft: 5 }}>{this.props.data.email}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>}
                        {!this.props.data ? !isOtpSend && !isOtpVerify && <View style={{}}>
                            <Text style={styles.heading}>Enter Email Address</Text>
                            <Text style={styles.paragraph}>Your privacy is important to us, any information we collect is only done with the intent to enhance your experience with us. </Text>
                            <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, paddingHorizontal: 14, marginTop: 8, marginBottom: 14 }}>
                                <TextInput placeholder='ex: goatdelivery@mail.com' style={{ flex: 1, fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000", paddingVertical: 0, height: 50 }} placeholderTextColor={PLACEHOLDER_COLOR}
                                    onChangeText={(val) => this.onChangeText(val.toLowerCase(), 'email')} />
                            </View>
                            <Button title='Submit' onPress={this.handleSendOtp} isLoading={isLoading} />
                        </View> : null}
                        {isOtpSend && <View style={{}}>
                            <Text style={styles.heading}>Verify Email</Text>
                            <Text style={styles.paragraph}>Your privacy is important to us, any information we collect is only done with the intent to enhance your experience with us. </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: Font_Heebo_SemiBold, color: "#888" }}>{this.state.email}</Text>
                                <Text onPress={() => this.setState({ isOtpSend: false, isAuthorized: false })} style={{ color: PRIMARY_COLOR, fontFamily: Font_Heebo_SemiBold }}>Change Email</Text>
                            </View>
                            <View style={{ marginTop: 8, marginBottom: 14, width: '89%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <OTPInputView
                                    style={{ height: 50 }}
                                    pinCount={4}
                                    autoFocusOnLoad
                                    placeholderCharacter={'*'}
                                    placeholderTextColor={'gray'}
                                    codeInputFieldStyle={{ backgroundColor: GRAY_COLOR, color: '#000' }}
                                    codeInputHighlightStyle={styles.otpField}
                                    code={this.state.otp}
                                    onCodeChanged={code => { this.setState({ otp: code }) }}
                                    onCodeFilled={code => {
                                        this.setState({ isOTPFilled: true });
                                        this.OTPvalidation(code);
                                    }}
                                />
                            </View>
                            <Button title='Verify' onPress={() => this.OTPvalidation(this.state.otp)} isLoading={isLoading} />
                        </View>}
                        {isOtpVerify && <View style={{}}>
                            <Text style={styles.heading}>Enter Your Details</Text>
                            <Text style={styles.paragraph}>Your privacy is important to us, any information we collect is only done with the intent to enhance your experience with us. </Text>
                            <View style={{ marginTop: 8, marginBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '48%', paddingHorizontal: 14 }}>
                                    <TextInput placeholder='First Name' style={{ flex: 1, fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000", paddingVertical: 0, height: 50 }} placeholderTextColor={PLACEHOLDER_COLOR}
                                        onChangeText={(val) => this.onChangeText(val, 'FirstName')}
                                        value={this.state.FirstName} />
                                </View>
                                <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '48%', paddingHorizontal: 14 }}>
                                    <TextInput placeholder='Last Name' style={{ flex: 1, fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000", paddingVertical: 0, height: 50 }} placeholderTextColor={PLACEHOLDER_COLOR}
                                        onChangeText={(val) => this.onChangeText(val, 'LastName')}
                                        value={this.state.LastName} />
                                </View>
                            </View>
                            <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '100%', paddingHorizontal: 14, marginBottom: 14 }}>
                                <TextInput placeholder='Mobile number' style={{ flex: 1, fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000", paddingVertical: 0, height: 50 }} placeholderTextColor={PLACEHOLDER_COLOR}
                                    onChangeText={(val) => this.onChangeText(val, 'phone')}
                                    value={this.state.phone} />
                            </View>
                            <Button title='Submit' onPress={this.updateProfile} isLoading={isLoading} />
                        </View>}
                    </View>
                </View>
                {/* {!isAuthorized && <>
                    <Text style={styles.heading}>Enter Email Address</Text>
                    <Text style={styles.paragraph}>Your privacy is important to us, any information we collect is only done with the intent to enhance your experience with us. </Text>
                    <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, paddingHorizontal: 14, marginTop: 8, marginBottom: 14 }}>
                        <TextInput placeholder='ex: goatdelivery@mail.com' autoComplete='off' style={{ flex: 1, fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000", paddingVertical: 0, height: 50 }} placeholderTextColor={PLACEHOLDER_COLOR} />
                    </View>
                    <Button title='Submit' onPress={this.handleSendOtp} />
                </>} */}
                {/* {isOtpSend && <View style={{}}>
                    <Text style={styles.heading}>Verify Email</Text>
                    <Text style={styles.paragraph}>Your privacy is important to us, any information we collect is only done with the intent to enhance your experience with us. </Text>
                    <View style={{ marginTop: 8, marginBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '20%', }}>
                            <TextInput placeholder='*' style={styles.otpField} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '20%', }}>
                            <TextInput placeholder='*' style={styles.otpField} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '20%', }}>
                            <TextInput placeholder='*' style={styles.otpField} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '20%', }}>
                            <TextInput placeholder='*' style={styles.otpField} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                    </View>
                    <Button title='Verify' onPress={this.handleVerifyOtp} />
                </View>}
                {isOtpVerify && <View style={{}}>
                    <Text style={styles.heading}>Enter Your Details</Text>
                    <Text style={styles.paragraph}>Your privacy is important to us, any information we collect is only done with the intent to enhance your experience with us. </Text>
                    <View style={{ marginTop: 8, marginBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '48%', paddingHorizontal: 14 }}>
                            <TextInput placeholder='First Name' style={{ flex: 1, fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000", paddingVertical: 0, height: 50 }} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '48%', paddingHorizontal: 14 }}>
                            <TextInput placeholder='Last Name' style={{ flex: 1, fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000", paddingVertical: 0, height: 50 }} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                    </View>
                    <View style={{ backgroundColor: GRAY_COLOR, borderRadius: 8, width: '100%', paddingHorizontal: 14, marginBottom: 14 }}>
                        <TextInput placeholder='Mobile number' style={{ flex: 1, fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000", paddingVertical: 0, height: 50 }} placeholderTextColor={PLACEHOLDER_COLOR} />
                    </View>
                    <Button title='Submit' onPress={this.handleUpdateName} />
                </View>} */}
                {/* </View> */}
            </Wrapper>

        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.AuthReducer.data,
        cart: state.AuthReducer.cart,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: (data) => dispatch({ type: 'SIGNIN', payload: data }, dispatch(getFloatingOrder(data))),
        updateCart: (body) => dispatch(updateCart(body))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)
const styles = StyleSheet.create({

    actionCard: {
        // marginHorizontal: 14,
        marginVertical: 8,
        backgroundColor: "#fff",
        // elevation: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: Font_Lato_Bold,
        color: "#000",

    },
    cardBody: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 12
    },
    heading: {
        fontSize: 25,
        fontFamily: Font_Lato_Bold,
        color: PRIMARY_COLOR,
        lineHeight: 30,
        marginBottom: 10
    },
    paragraph: {
        fontSize: 14,
        fontFamily: Font_Heebo_Regular,
        color: CHARCOAL_COLOR,
        lineHeight: 19.45,
        marginBottom: 8

    },
    otpField: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: Font_Heebo_SemiBold,
        color: "#000",
        paddingVertical: 0,
        height: 50

    }
})