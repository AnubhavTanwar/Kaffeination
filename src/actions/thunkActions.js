import { getRequest, putRequestWithBody } from "../utils/helper/apiHelper";
import store from "../Reducer/index";
import { checkStore } from "../utils/appUtil/appUtil";
export const getHomeBanner = (storeId) => {
  return dispatch => {
    getRequest('banner/getAll')
      .then(response => {
        if (!response.err) {
          dispatch({ type: 'HOME_BANNER', payload: response.banner });
        } else {
          dispatch({ type: 'HOME_BANNER', payload: [] });
        }
      })
      .catch(error => {
        console.log(error, 'get home banner')
        dispatch({ type: 'HOME_BANNER', payload: [] });
      });
  };
};

export const getTopCategory = (storeId) => {
  return dispatch => {
    getRequest('category/getAllCategory')
      .then(response => {
        if (!response.err) {
          dispatch({ type: 'TOP_CATEGORY', payload: response.category });
        } else {
          dispatch({ type: 'TOP_CATEGORY', payload: [] });
        }
      })
      .catch(error => {
        console.log(error, 'get top category')
        dispatch({ type: 'TOP_CATEGORY', payload: [] });
      });
  };
};

export const getHomeLayout = (storeId) => {
  return dispatch => {
    getRequest('product/getCategoryWithProduct/' + storeId)
      .then(response => {
        if (!response.err) {
          dispatch({ type: 'HOME_LAYOUT', payload: response.category });
        } else {
          dispatch({ type: 'HOME_LAYOUT', payload: [] });
        }
      })
      .catch(error => {
        console.log(error, 'get Home Layout')
        dispatch({ type: 'HOME_LAYOUT', payload: [] });
      });
  };
};

export const getMasterCatData = () => {
  console.log("getMasterCat");
  return dispatch => {
    getRequest('masterCategory/withCategory')
      .then(response => {
        if (!response.err) {
          console.log("Master");
          dispatch({ type: 'MASTER_CATEGORY', payload: response.masterCategories });
        } else {
          console.log("Master");
          dispatch({ type: 'MASTER_CATEGORY', payload: [] });
        }
      })
      .catch(error => {
        console.log(error, 'get  master category')
        dispatch({ type: 'MASTER_CATEGORY', payload: [] });
      });
  };
};

export const updateCart = (body) => {
  return dispatch => {
    let tempStore = store.getState();
    let id = tempStore.AuthReducer.storeData._id;
    console.log(id, 'tempStore');
    putRequestWithBody('cart/update', body)
      .then(response => {
        if (!response.err) {
          console.log(response, "respost");
          dispatch({ type: 'UPDATE_CART', payload: response.cart });

          checkStore(id)
        } else {
          console.log(response, "error");
          dispatch({ type: 'UPDATE_CART', payload: '' });
        }
      })
      .catch(error => {
        console.log(error, 'updateCart')
        dispatch({ type: 'UPDATE_CART', payload: '' });
      });
  };
};

export const getFloatingOrder = (data) => {
  return dispatch => {
    getRequest('order/getRecentByUserId/' + data._id)
      .then(response => {
        if (!response.err) {
          dispatch({ type: 'FLOATING_ORDERS', payload: response.order });
        } else {
          dispatch({ type: 'FLOATING_ORDERS', payload: '' });
        }
      })
      .catch(error => {
        console.log(error, 'FLOATING_ORDERS')
        dispatch({ type: 'FLOATING_ORDERS', payload: '' });
      });
  };
};