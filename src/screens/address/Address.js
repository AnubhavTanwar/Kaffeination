import { Text, StyleSheet, View, FlatList, Pressable, Platform } from 'react-native'
import React, { Component } from 'react'
import Container from '../../components/layout/Container'
import Header from '../../components/header/Header'
import { TouchableRipple } from 'react-native-paper'
import Icon from '../../utils/icons'
import { Font_Heebo_Bold, Font_Heebo_Regular } from '../../utils/typograpy'
import { CHARCOAL_COLOR } from '../../utils/colors'
import Button from '../../components/button/Button'
import ConfirmModal from '../../components/modals/alerts/Confirm'
import AddressEmpty from '../../components/EmptyStates/AddressEmpty'
import { deleteRequest, getRequest } from '../../utils/helper/apiHelper'
import { connect } from 'react-redux'


const ListItem = ({ onPressDelete, onPressEdit, address }) => {
    return <View style={styles.listItemContainer}>
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontFamily: Font_Heebo_Bold, color: "#000" }}>{address.tag}</Text>
            <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Regular, color: CHARCOAL_COLOR }}>{address.address}, {address.address2}</Text>
            <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Regular, color: CHARCOAL_COLOR }}>{address.country}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <TouchableRipple onPress={onPressEdit && onPressEdit} style={[styles.icon, { backgroundColor: "rgba(255, 85, 82, 1)" }]}>
                <Icon name='edit' type='materialIcons' color='#fff' size={22} />
            </TouchableRipple>
            <TouchableRipple onPress={onPressDelete && onPressDelete} style={[styles.icon, { backgroundColor: "rgba(243, 122, 32, 1)" }]}>
                <Icon name='trash' type='ionicons' color='#fff' size={22} />
            </TouchableRipple>
        </View>
    </View>
}

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDelete: false,
            isAddressEmpty: false,
            deleteAddress: '',
        }
    }
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getAddress()
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    getAddress() {
        getRequest('address/getByUserId/' + this.props.data._id)
            .then(res => {
                if (!res.err) {
                    this.props.setAddress(res.address)
                } else {
                    alert(res.msg);
                }
            }).catch(error => {
                console.log(error);
            })
    }
    handleConfirmModal = (address) => {
        if (address) {
            this.setState({ deleteAddress: address })
        }
        this.setState({ isDelete: !this.state.isDelete })
    }
    deleteAddress = () => {
        if (!this.state.deleteAddress) { return }
        deleteRequest('address/delete/' + this.state.deleteAddress._id)
            .then(res => {
                if (!res.err) {
                    this.handleConfirmModal()
                    this.getAddress()
                } else {
                    alert(res.msg);
                }
            }).catch(error => {
                console.log(error);
            })
    }
    render() {
        const { isDelete } = this.state
        const address = this.props.userAddress
        return (
            <Container>
                <Header headerTitle='My Address' />
                {address.length < 1 ? <AddressEmpty /> : <FlatList
                    data={address}
                    renderItem={({ item, index }) => <ListItem address={item} onPressDelete={() => this.handleConfirmModal(item)} onPressEdit={() => this.props.navigation.navigate("add-address", { address: item })} />}
                    keyExtractor={item => item._id}
                />}
                <View style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
                    <Button
                        title='Add New Address'
                        onPress={() => this.props.navigation.navigate("add-address")}
                    />
                </View>
                <ConfirmModal visible={isDelete} buttonTitle={"Delete it"} heading={"Delete Address"} content={"Are you sure delete this address \n this action cannot be undo."}
                    onPress={this.deleteAddress}
                    onPressCancel={this.handleConfirmModal}
                />
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.AuthReducer.data,
        userAddress: state.AuthReducer.userAddress
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setAddress: (data) => dispatch({ type: 'USER_ADDRESS', payload: data }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Address)
const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        paddingVertical: 18,
        borderBottomWidth: 0.5,
        borderColor: "rgba(244,244,244,1)"
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 10,
        ...(Platform.OS === 'ios' && {
            // iOS-specific style overrides
            paddingTop: 9, // Adjust paddingTop for iOS
        }),
    }
})