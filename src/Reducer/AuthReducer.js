import * as Actions from '../actions/ActionTypes';
const user = {
    data:'',
    homeBanners:[],
    topCategory:[],
    storeData:'',
    homeLayout:[],
    cart:'',
    masterCategory:[],
    floatingOrders:[],
    isVisibleFloatingOrders:true,
    location:'',
    userAddress:[],
    searchData:[],
    searchKeys:[],
}
const AuthReducer = (state = user, action) => {
    console.log(action);
    switch (action.type) {
        case Actions.SIGNIN:
            return { ...state, data: action.payload };
        case Actions.SIGNUP:
            return { ...state, data: action.payload };
        case Actions.UPDATE_DATA:
            return { ...state, data: {...action.payload.data, walletBalance: action.payload.walletBalance}};
        case Actions.LOGOUT:
            return { ...state, data: '',cart:'',floatingOrders:[],userAddress:[]};
        case Actions.HOME_BANNER:
            return { ...state, homeBanners: action.payload };
        case Actions.TOP_CATEGORY:
            return { ...state, topCategory: action.payload };
        case Actions.STORE_DATA:
            return { ...state, storeData: action.payload };
        case Actions.HOME_LAYOUT:
            return {...state, homeLayout:action.payload};
        case Actions.UPDATE_CART:
            return {...state, cart:action.payload};
        case Actions.SEARCH_KEYS:
            return {...state, searchKeys:action.payload};
        case Actions.SEARCH_DATA:
                return {...state, searchData:action.payload};
        case Actions.MASTER_CATEGORY:
            return {...state, masterCategory:action.payload};
        case Actions.FLOATING_ORDERS:
            return {...state, floatingOrders:action.payload};
        case Actions.SET_FLOATING_ORDERS:
            return {...state, isVisibleFloatingOrders:false};
        case Actions.LOCATION:
            return {...state, location:action.payload};
        case Actions.USER_ADDRESS:
            return {...state, userAddress:action.payload};
        default:
            return state;
    }
}
export default AuthReducer;