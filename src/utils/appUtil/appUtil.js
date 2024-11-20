import { getRequest, postWithBody } from "../helper/apiHelper";
import store from "../../Reducer";
import { getHomeBanner, getTopCategory, updateCart } from "../../actions/thunkActions";
import { Alert } from "react-native/types";
export const isNullOrEmpty = s => {
  if (
    s === undefined ||
    s === null ||
    s === '' ||
    s === 'null' ||
    s === 'undefined' ||
    s == 0
  ) {
    return true;
  } else {
    return false;
  }
};
export const isNullOrEmptyNew = s => {
  if (
    s === undefined ||
    s === null ||
    s === '' ||
    s === 'null' ||
    s === 'undefined'
  ) {
    return true;
  } else {
    return false;
  }
};
export const getFullDate = date => {
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var formatted = new Date(date);
  var day = formatted.getDate();
  var year = formatted.getFullYear();
  var month = months[formatted.getMonth()];
  return month + ' ' + day + ', ' + year;
};
export const isListNullOrEmpty = list => {
  if (list === undefined || list === null || list.length === 0) {
    return true;
  }
  return false;
};
export const isPending = (status) => {
  if (status == 'delivered') { return 'delivered' }
  if (status == 'cancelled') { return 'cancelled' }
  return "pending"
}
export const getFinalPrice = product => {
  return product.userPrice;
};
export const getFinalDiscount = (product) => {
  return product.userDiscount;
}
export const getCount = (item) => {
  const state = store.getState()
  if (item == null || state.AuthReducer.cart == '') {
    return 0;
  }
  var count = 0;
  var array = state.AuthReducer.cart.products;
  if (array.filter(product => product.productId == item._id).length > 0) {
    return parseInt(array.filter(product => product.productId == item._id)[0]?.qty);
  }
  return count;
};

export const productCount = (item, e, isCart) => {
  let count = getCount(item)
  if (count >= item.quantity) { return }
  const state = store.getState()
  let variable = {
    "storeId": state.AuthReducer.storeData._id,
    "productId": item._id,
  }
  if (e == 'plus') {
    variable.qty = 1
  } else {
    variable.qty = count <= 0 ? 0 : - 1
  }
  if (state.AuthReducer.cart) {
    variable.cartId = state.AuthReducer.cart._id;
  }

  postWithBody('cart/addToCart', JSON.stringify(variable))
    .then(res => {
      console.log(res);
      if (!res.err && !isCart == true) {
        store.dispatch({ type: 'UPDATE_CART', payload: res.cart })
        if (state.AuthReducer.data && !res.cart.userId) {
          let body = {
            userId: state.AuthReducer.data._id,
            cartId: res.cart._id
          }
          store.dispatch(updateCart(JSON.stringify(body)))
        }
      } else {
        getRequest('cart/getCart/' + state.AuthReducer.cart._id)
          .then(res1 => {
            if (!res1.err) {
              store.dispatch({ type: 'UPDATE_CART', payload: res1.cart })
            } else {
              store.dispatch({ type: 'UPDATE_CART', payload: '' })
            }
          }).catch(error => {
            console.log(error, 'getCart');
            store.dispatch({ type: 'UPDATE_CART', payload: '' })
          })
      }
    }).catch(e => {
      console.log(e, 'ad to cart');
    })
}

export const getStore = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let storeData = await postWithBody('store/getAllStore', body);
      if (storeData?.products && storeData?.products[0]) {
        store.dispatch({ type: 'STORE_DATA', payload: storeData.products[0] })
        store.dispatch(getHomeBanner(storeData.products[0]._id))
        store.dispatch(getTopCategory(storeData.products[0]._id))
      } else {
        store.dispatch({ type: 'STORE_DATA', payload: "" })
      }
      resolve("ok")
    } catch (e) { reject(e) }
  })
}



export const checkStore = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let storeData = await getRequest('store/getById/'+ id);
      if (storeData?.store?.status === "open") {
        
      } else {
        alert("Store is closed");
      }
      resolve("ok")
    } catch (e) { reject(e) }
  })
}