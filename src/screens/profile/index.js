import { Text, StyleSheet, View, ScrollView, Linking } from 'react-native'
import React, { Component } from 'react'
import Container from '../../components/layout/Container'
import { Font_Heebo_Bold, Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold, Font_Poppins_Bold, Font_Poppins_Regular } from '../../utils/typograpy'
import { CHARCOAL_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR, SECONDARY_COLOR, SECONDARY_LIGHT_COLOR } from '../../utils/colors'
import { TouchableRipple } from 'react-native-paper'
import Icon from '../../utils/icons'
import ConfirmModal from '../../components/modals/alerts/Confirm'
import Login from '../auth/Login'
import { connect } from 'react-redux'

const ListItem = ({ iconName, iconColor, title, onPress }) => {
  return (<TouchableRipple onPress={onPress && onPress} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderBottomWidth: 1, borderBottomColor: "rgba(244,244,244,1)", paddingVertical: 22, paddingHorizontal: 18 }}>
    <>
      <Icon name={iconName} color={iconColor} size={20} />
      <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Regular, color: "#000", marginLeft: 21 }}>{title}</Text>
    </>
  </TouchableRipple>)
}

// const ListItem = ({ iconSource, title, onPress }) => {
//   return (
//     <TouchableRipple onPress={onPress && onPress} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderBottomWidth: 1, borderBottomColor: "rgba(244,244,244,1)", paddingVertical: 22, paddingHorizontal: 18 }}>
//       <>
//         <Image source={iconSource} style={styles.icon} />
//         <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Regular, color: "#000", marginLeft: 21 }}>{title}</Text>
//       </>
//     </TouchableRipple>
//   );
// };

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
      phoneNumber:'9898989898'
    }
  }
  handleLogoutConfirm = () => {
    this.setState({ isLogout: !this.state.isLogout })
  }
  handleLogout = () => {
    this.props.logOut()
    this.handleLogoutConfirm()
  }
  render() {
    const { isLogout,phoneNumber } = this.state
    return (
      <Container>
        <View style={styles.header}>
          <Text style={{ fontSize: 25, fontFamily: Font_Lato_Bold, color: "#000", }}>{this.props.data ? "My Profile" : "Login First"}</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardDismissMode='interactive' keyboardShouldPersistTaps='handled'>
          {this.props.data ? <React.Fragment>
            <View style={styles.profileContainer}>
              <View>
                <Text style={{ fontSize: 20, fontFamily: Font_Heebo_Bold, color: "#fff" }}>{this.props.data.firstName} {this.props.data.lastName}</Text>
                <Text style={{ fontSize: 17, fontFamily: Font_Heebo_Medium, color: SECONDARY_COLOR }}>{this.props.data.email}</Text>
                <Text style={{ fontSize: 16, fontFamily: Font_Heebo_Medium, color: "#FFD700", marginTop: 8 }}>Wallet Balance: ₹{this.props.data.walletBalance.toFixed(2)}</Text>
              </View>
            </View>
            <View>
              <ListItem title={"Edit Profile"} iconName={"pencil-sharp"} iconColor={"#236CD9"} onPress={() => this.props.navigation.navigate("edit-profile")} />
              <ListItem title={"My Address"} iconName={"map"} iconColor={"rgba(94, 196, 1, 1)"} onPress={() => this.props.navigation.navigate("my-address")} />
              <ListItem title={"My Orders"} iconName={"briefcase"} iconColor={"rgba(55, 71, 79, 1)"} onPress={() => this.props.navigation.navigate("my-orders")} />
              <ListItem title={"Talk to our Support"} iconName={"call-sharp"} iconColor={"rgba(243, 122, 32, 1)"} onPress={()=>Linking.openURL(`tel:${phoneNumber}`)}/>
              <ListItem title={"Log out"} iconName={"log-out"} iconColor={"rgba(255, 85, 82, 1)"} onPress={this.handleLogoutConfirm} />
            </View>
            {/* <View>
                <ListItem
                  title="Edit Profile"
                  iconSource={require("../../assets/profile/user.png")} // Path to your PNG
                  onPress={() => navigation.navigate("edit-profile")}
                />
                <ListItem
                  title="My Address"
                  iconSource={require("../../assets/profile/user.png")} // Path to your PNG
                  onPress={() => navigation.navigate("my-address")}
                />
                <ListItem
                  title="My Orders"
                  iconSource={require("../../assets/profile/user.png")} // Path to your PNG
                  onPress={() => navigation.navigate("my-orders")}
                />
                <ListItem
                  title="Talk to our Support"
                  iconSource={require("../../assets/profile/user.png")} // Path to your PNG
                  onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                />
                <ListItem
                  title="Log out"
                  iconSource={require("../../assets/profile/user.png")} // Path to your PNG
                  onPress={handleLogoutConfirm}
                />
              </View> */}

          </React.Fragment> : <Login />}
        </ScrollView>
        <ConfirmModal visible={isLogout} onPressCancel={this.handleLogoutConfirm} onPress={this.handleLogout} content={"Are you sure you want to logout"} heading={"Logging Out"} buttonTitle="Logout" />
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
    logOut: () => dispatch({ type: 'LOGOUT' }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14
  },
  profileContainer: {
    paddingHorizontal: 14,
    backgroundColor: "rgba(244,244,244,1)",
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 20,
    marginBottom: 10

  },
  listItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR,
    marginHorizontal: 14,
    paddingVertical: 14,
  },
  icon: {
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 40,
    backgroundColor: PRIMARY_LIGHT_COLOR,
    marginRight: 14
  },
  listItem: {

    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  }
})