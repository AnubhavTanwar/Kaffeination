import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { Component } from "react";
import Container from "../../components/layout/Container";
import Icon from "../../utils/icons";
import Button from "../../components/button/Button";
import { SCREEN_WIDTH } from "../../utils/constants";
import {
  GRAY_COLOR,
  PLACEHOLDER_COLOR,
  PRIMARY_COLOR,
  PRIMARY_LIGHT_COLOR,
} from "../../utils/colors";
import { TouchableRipple } from "react-native-paper";
import { Font_Heebo_Regular } from "../../utils/typograpy";
import { connect } from "react-redux";
import { getAutoAddress, postWithBody, putRequestWithBody } from "../../utils/helper/apiHelper";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { googleKey } from "../../utils/constants";

const { width, height } = Dimensions.get("window");

const DEFAULT_LATITUDE = 37.7749;
const DEFAULT_LONGITUDE = -122.4194;

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.googlePlacesAutocomplete = null;
    this.state = {
      focused: {
        area: false,
        address1: false,
        address2: false,
        firstName: false,
        lastName: false,
        mobileNumber: false,
        countryCode: false,
      },
      firstName: "",
      lastName: "",
      otherContact: "",
      location: "",
      postalCode: this.props.location?.addressDetails?.zipCode,
      city: this.props.location?.addressDetails?.city,
      state: this.props.location?.addressDetails?.state,
      country: this.props.location?.addressDetails?.country,
      tag: "Home",
      address: {},
      address1: this.props.location?.address1,
      address2: this.props.location?.address2,
      isLoading: false,
      region: {
        latitude: this.props.location.lat || DEFAULT_LATITUDE,
        longitude: this.props.location.long || DEFAULT_LONGITUDE,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      selection: { start: 0 },
    };
    this.focused = React.createRef();
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    try {
      let address = this.props.route.params?.address;
      console.log(address);
      this.setState({
        firstName: address?.firstName ? address?.firstName : "",
        lastName: address?.lastName ? address?.lastName : "",
        postalCode: address?.postalCode ? address?.postalCode : "",
        otherContact: address?.altPhone ? address?.altPhone : "",
        location: address?.landmark,
        tag: address?.tag,
        address: address ?? '',
        region: {
          latitude: address?.location?.coordinates[1] || DEFAULT_LATITUDE,
          longitude: address?.location?.coordinates[0] || DEFAULT_LONGITUDE,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
      if (this.googlePlacesAutocomplete !== null) {
        this.setDataToGooglePlacesAutocomplete(address?.address);
      }
    } catch (err) {
      console.log(err, 'error');
      const { addressDetails } = this.props.location
      this.setDataToGooglePlacesAutocomplete(addressDetails?.address)
    }
  }
  async setDataToGooglePlacesAutocomplete(address) {
    let array = address?.split(',')
    array = array?.reverse()
    if (array?.length > 4) { array.pop() }
    if (array?.length > 4) { array.pop() }
    if (array?.length > 4) { array.pop() }
    if (array?.length > 4) { array.pop() }
    if (array?.length > 4) { array.pop() }
    array?.reverse()
    await this.setState({ location: array?.join() });
    if (this.googlePlacesAutocomplete !== null) {
      this.googlePlacesAutocomplete.setAddressText(array?.join());
    }
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  saveLocation() {

    let { _id } = this.state?.address;

    if (_id) {
      this.updateAddress(_id);
    } else {
      console.log("add address");
      this.addAddress();
    }
  }

  updateAddress(id) {
    let input = JSON.stringify({
      addressId: id,
      userId: this.props.data._id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      postalCode: this.state.postalCode,
      phone: this.state.otherContact,
      altPhone: this.state.otherContact,
      landmark: this.state.location,
      tag: this.state.tag,
      longitude: this.props.location.long,
      latitude: this.props.location.lat,
    });
    this.setState({ isLoading: true });
    putRequestWithBody("address/update", input)
      .then((res) => {
        this.setState({ isLoading: false });
        console.log(res, "..");
        if (!res.err) {
          this.props.navigation.goBack();
        } else {
          alert(res.msg);
        }
      })
      .catch((error) => {
        console.log(error, "add address.");
      });
  }
  addAddress() {
    let input = JSON.stringify({
      userId: this.props.data._id,
      firstName: this.state.firstName ? this.state.firstName : this.props.data.firstName,
      lastName: this.state.lastName
        ? this.state.lastName
        : this.props.data.lastName,
      address: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      postalCode: this.state.postalCode,
      phone: this.state.otherContact,
      altPhone: this.state.otherContact,
      landmark: this.state.location,
      tag: this.state.tag,
      longitude: this.state.region.longitude,
      latitude: this.state.region.latitude,
    });
    console.log(input, '...');
    this.setState({ isLoading: true });
    postWithBody("address/add", input)
      .then((res) => {
        this.setState({ isLoading: false });
        console.log(res, "..");
        if (!res.err) {
          this.props.navigation.goBack();
        } else {
          alert(res.msg);
        }
      })
      .catch((error) => {
        console.log(error, "add address.");
      });
  }

  async handleSearch(data, details) {

    var lat = details?.geometry?.location?.lat;
    var long = details?.geometry?.location?.lng;
    var addressDict = {
      address: details?.formatted_address,
      latitude: lat,
      longitude: long,
    };
    this.onRegionChange(addressDict, undefined, details)
  }

  handleFocus(t) {
    this.setState({ selection: null });
    this.setState(state => ({
      focused: {
        ...this.state.focused,
        [t]: !this.state.focused[t],
      },
    }));
  }
  onBlur() {
    this.setState({ selection: { start: 0, end: 0 } });
  }

  async onRegionChange(region, isRegion, preAddress) {
    let region1 = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    if (isRegion == undefined) {
      region1.latitudeDelta = 0.005;
      region1.longitudeDelta = 0.005;
    }
    this.setState({ region: region1 });
    let address = await getAutoAddress(region.latitude, region.longitude, preAddress);
    if (this.googlePlacesAutocomplete !== null) {
      this.setDataToGooglePlacesAutocomplete(address?.addressDetails?.address);
    }
    console.log(address, "fsdfsdgsgsd");
    this.setState({
      address1: address.address1,
      address2: address.address2,
      area: address.addressDetails?.address,
      city: address.addressDetails?.city,
      state: address.addressDetails?.state,
      country: address.addressDetails?.country,
      postalCode: address?.addressDetails?.zipCode,
      region: {
        latitude: address?.addressDetails?.latitude,
        longitude: address?.addressDetails?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    });
  }
  render() {
    const { isLoading } = this.state;


    return (
      <Container>
        <Icon
          name="arrow-back"
          size={22}
          color="#000"
          onPress={() => this.props.navigation.goBack()}
          style={[styles.backButton, Platform.OS === "ios" && styles.circularIcon]}
        />
        <ScrollView
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handle"
          keyboardDismissMode="interactive"
        >
          <View style={styles.mapContainer}>
            <MapView
              // provider={"google"}
              style={{ width, height: 300 }}
              region={this.state.region}
              onPress={(e) => {
                if (e.nativeEvent.action !== "marker-press") {
                  this.onRegionChange(e?.nativeEvent?.coordinate);
                } else {
                  this.onRegionChange(e?.nativeEvent?.coordinate);
                }
              }}
            >
              <Marker
                coordinate={{
                  latitude: this.state?.region?.latitude,
                  longitude: this.state?.region?.longitude,
                }}
                draggable
                onDragEnd={e => this.onRegionChange(e?.nativeEvent?.coordinate)}
                onPress={e => this.onRegionChange(e?.nativeEvent?.coordinate)}
              />
            </MapView>
          </View>
          <View style={{ zIndex: 99, backgroundColor: "#fff" }}>
            <View style={[{ zIndex: 99 }]}>
              <GooglePlacesAutocomplete
                placeholder="Type Your City/Society/Colony"
                ref={ref => (this.googlePlacesAutocomplete = ref)}
                minLength={2}
                fetchDetails={true}
                onPress={(data, details) => this.handleSearch(data, details)}
                value={this.state.area}
                renderLeftButton={() => <Icon
                  name="search"
                  color="#000"
                  size={18}
                  style={{ marginRight: 8 }}
                />}
                textInputProps={{
                  // placeholderTextColor: PRIMARY_BLACK_COLOR,
                  returnKeyType: 'search',
                  onChangeText: val => this.onChangeText('area', val),
                  onFocus: () => this.handleFocus('area'),
                  onBlur: () => this.onBlur(),
                  selection: this.state.selection,
                  multiline: false,
                  editable: true,
                }}
                query={{
                  key: googleKey,
                  language: 'en', // language of the results
                  //components: 'country:in',
                }}
                styles={{
                  container: {
                    flex: 1,
                  },
                  textInputContainer: {
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    ...styles.inputContainer
                  },
                  textInput: {
                    fontSize: 15,
                    flex: 1,
                    backgroundColor: 'transparent',
                    fontFamily: Font_Heebo_Regular,
                  },
                  poweredContainer: {
                    display: 'none',
                  },
                  row: {
                    backgroundColor: GRAY_COLOR,
                  },
                  listView: {
                    position: 'absolute',
                    top: 50,
                    width: SCREEN_WIDTH - 28,
                    zIndex: 9,
                    marginLeft: 14
                  },
                  description: {
                    color: '#000',
                  },
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Postal Code"
                style={styles.textInput}
                placeholderTextColor={PLACEHOLDER_COLOR}
                value={this.state.postalCode}
                onChangeText={(val) => this.onChangeText("postalCode", val)}
                maxLength={6}
                keyboardType={"number-pad"}
              />
            </View>
            <View style={styles.tabsContainer}>
              <TouchableRipple
                style={styles.tabs}
                onPress={() => this.setState({ tag: "Home" })}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: this.state.tag == "Home" ? PRIMARY_COLOR : "#000",
                    fontFamily: Font_Heebo_Regular,
                  }}
                >
                  Home
                </Text>
              </TouchableRipple>
              <TouchableRipple
                style={styles.tabs}
                onPress={() => this.setState({ tag: "Office" })}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: this.state.tag == "Office" ? PRIMARY_COLOR : "#000",
                    fontFamily: Font_Heebo_Regular,
                  }}
                >
                  Office
                </Text>
              </TouchableRipple>
              <TouchableRipple
                style={styles.tabs}
                onPress={() => this.setState({ tag: "Other" })}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: this.state.tag == "Other" ? PRIMARY_COLOR : "#000",
                    fontFamily: Font_Heebo_Regular,
                  }}
                >
                  Other
                </Text>
              </TouchableRipple>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <TextInput
                  placeholder="First Name"
                  style={[styles.textInput, { marginRight: 14 }]}
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  onChangeText={(val) => this.onChangeText("firstName", val)}
                  value={this.state.firstName}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <TextInput
                  placeholder="Last Name"
                  style={[styles.textInput, { marginLeft: 14 }]}
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  onChangeText={(val) => this.onChangeText("lastName", val)}
                  value={this.state.lastName}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Contact Number if any"
                style={styles.textInput}
                placeholderTextColor={PLACEHOLDER_COLOR}
                onChangeText={(val) => this.onChangeText("otherContact", val)}
                value={this.state.otherContact}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ paddingVertical: 14, paddingHorizontal: 14 }}>
          <Button
            title="Save This Location"
            onPress={() => this.saveLocation()}
            isLoading={isLoading}
          />
        </View>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.AuthReducer.data,
    location: state.AuthReducer.location,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => dispatch({ type: "SIGNIN", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 11,
    width: 40,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#fff",
    elevation: 10,
    borderRadius: 40,
  },
  
  circularIcon: {
    overflow: "hidden",
    borderRadius: 20, 
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 40,
  },
  mapImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH + 30,
  },
  inputContainer: {
    margin: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GRAY_COLOR,
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  textInput: {
    fontFamily: Font_Heebo_Regular,
    color: "#000",
    fontSize: 15,
    flex: 1,
    paddingVertical: 0,
    height: 45,
  },
  tabs: {
    backgroundColor: GRAY_COLOR,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minWidth: SCREEN_WIDTH / 3 - 20,
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginVertical: 10,
  },
  mapContainer: {
    width: SCREEN_WIDTH,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
});
