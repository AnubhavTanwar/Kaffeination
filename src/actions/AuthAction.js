
import * as Actions from './ActionTypes';
export function portfoloiSuccess(dataObj) {
    return {
      type: Actions.SIGNIN,
      payload: dataObj,
    };
}
  
  export const signin = (data) => async (dispatch, getState) => {    
    dispatch({type: Actions.SIGNIN, payload: 'response' })
}