import { BASE_URL, googleKey } from "../constants";

export const postWithBody = (subURL, body) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"this is catch postWithBody", error);
      });
  })
}

export const postRequest = (subURL) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"this is catch postRequest", error);
      });
  })
}

export const getRequest = (subURL) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"this is catch getRequest", error);
      });
  })
}

export const deleteRequest = (subURL) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"this is catch deleteRequest", error);
      });
  })
}


export const putRequestWithBody = (subURL,body) => {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + subURL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log(subURL,"putRequestWithBody", error);
      });
  })
}

export const getAddressObject  = async(address) => {
  let obj={};
  let elemen=address
  var lat = elemen.geometry.location.lat
  var long = elemen.geometry.location.lng
  var addressDict = { "address": elemen.formatted_address, "latitude": lat, "longitude": long }
  console.log(elemen,'address array.....');
  await elemen.address_components.forEach(element => {
    if (element.types.indexOf("locality") > -1) {
      addressDict["city"] = element.long_name
    }
    if (element.types.indexOf("administrative_area_level_1") > -1) {
      addressDict["state"] = element.long_name
    }
    if (element.types.indexOf("sublocality_level_1") > -1) {
      addressDict["addressline1"] = element.long_name
    }
    if (element.types.indexOf("sublocality_level_2") > -1) {
      addressDict["addressline1Level2"] = element.long_name
    }
    if (element.types.indexOf("sublocality_level_3") > -1) {
      addressDict["addressline1Level3"] = element.long_name
    }
    if (element.types.indexOf("locality") > -1) {
      addressDict["addressline2"] = element.long_name
    }
    if (element.types.indexOf("country") > -1) {
      addressDict["country"] = element.long_name
    }
    if (element.types.indexOf("postal_code") > -1) {
      addressDict["zipCode"] = element.long_name
    }
  });
  if (!addressDict.addressline1 || !addressDict.addressline2) {
    if (!addressDict.addressline1 && addressDict.addressline1Level2) {
      addressDict['addressline1'] = addressDict.addressline1Level2;
    }
    else if (!addressDict.addressline1 && addressDict.addressline1Level3) {
      addressDict['addressline1'] = addressDict.addressline1Level3;
    }
    else if (!addressDict.addressline1 && !addressDict.addressline2 && addressDict.city) {
      addressDict['addressline1'] = addressDict.city;
      addressDict['addressline2'] = addressDict.city;
    } else if (!addressDict.addressline1 && !addressDict.addressline2 && addressDict.state) {
      addressDict['addressline1'] = addressDict.state;
      addressDict['addressline2'] = addressDict.state;
    }
    else if (!addressDict.addressline1 && addressDict.addressline2) {
      addressDict['addressline1'] = addressDict.addressline2;
    }
    else if (addressDict.addressline1 && !addressDict.addressline2) {
      addressDict['addressline2'] = addressDict.addressline1;
    }
  }
  console.log(addressDict,'get auto address')
  obj = {
    address1: addressDict.addressline1,
    address2: addressDict.addressline2,
    addressDetails: addressDict,
    lat: lat,
    long: long
  }

return obj;
}
export const getAutoAddress = (lat, long,preAddress) => {
  return new Promise(async(resolve, reject) => {
  let obj
  let elemen=preAddress
  let isFullAddress=false
  await elemen?.address_components?.forEach(element => {
      if (element.types.indexOf("postal_code") > -1) {
        isFullAddress=true
      }
    })
  if(!isFullAddress){
    console.log(googleKey,"geocode api called.",`https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=` + lat + `,` + long + `&key=` + googleKey)
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=` + lat + `,` + long + `&key=` + googleKey)
      .then((response) => response.json())
      .then(async(res) => {
        let details = res.results
      elemen = details[0]
      obj =await getAddressObject(elemen)
      })
      .catch((error) => {
        reject({err:true,msg:'Something want wrong'})
        console.log("this is catch getAddressObject", error);
      });
    }else{
      obj =await getAddressObject(elemen)
    }
    if(preAddress){
      obj.addressDetails.address=preAddress.formatted_address
    }
    resolve(obj);
})
}