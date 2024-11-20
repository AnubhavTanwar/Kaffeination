import { Text, StyleSheet, View, ScrollView, TextInput } from 'react-native'
import React, { Component } from 'react'
import Container from '../../../components/layout/Container'
import { GRAY_COLOR, PLACEHOLDER_COLOR } from '../../../utils/colors'
import Header from '../../../components/header/Header'
import { Font_Heebo_Regular } from '../../../utils/typograpy'
import Button from '../../../components/button/Button'
import { connect } from 'react-redux'
import { putRequestWithBody } from '../../../utils/helper/apiHelper'

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            isLoading: false,
        }
    }
    updateProfile() {
        let body = JSON.stringify({
            "userId": this.props.data._id,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName
        })
        this.setState({ isLoading: true })
        putRequestWithBody('user/update', body).
            then(res => {
                this.setState({ isLoading: false })
                if (!res.err) {
                    this.props.updateProfile(res.user)
                    this.props.navigation.goBack()
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
    render() {
        const { isLoading } = this.state;
        return (
            <Container>
                <Header headerTitle='Edit Profile' />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Full Name' value={this.state.firstName}
                                style={styles.textInput} placeholderTextColor={PLACEHOLDER_COLOR}
                                onChangeText={(val) => this.onChangeText(val, 'firstName')} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Last Name' value={this.state.lastName}
                                style={styles.textInput} placeholderTextColor={PLACEHOLDER_COLOR}
                                onChangeText={(val) => this.onChangeText(val, 'lastName')} />
                        </View>
                    </View>
                </ScrollView>
                <View style={{ padding: 14 }}>
                    <Button
                        title='Save'
                        onPress={() => this.updateProfile()}
                        isLoading={isLoading}
                    />
                </View>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.AuthReducer.data,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (data) => dispatch({ type: 'SIGNIN', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    inputContainer: {
        backgroundColor: GRAY_COLOR,
        marginBottom: 14,
        borderRadius: 8,
        paddingHorizontal: 14
    },
    textInput: {
        fontFamily: Font_Heebo_Regular,
        color: "#000",
        fontSize: 14,
        height: 45
    }
})