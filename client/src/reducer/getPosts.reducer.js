import { GET_MY_POST_START, GET_MY_POST_SUCCESS, GET_MY_POST_FAILURE } from "../constants/constant";

const initialState = {
    isInitialized: false,
    isFetching: false,
    isError: false,
    data : []
}

export const  getMyPost = (state = initialState, action)=>{
    switch(action.type){
        case GET_MY_POST_START:  
            return {...state, isInitialized: true, isFetching: true }
        case GET_MY_POST_SUCCESS:
            return {...state, isFetching: false, data: action.payload}
        case GET_MY_POST_FAILURE:
            return{ ...state, isError: true}
        default:
            return {...initialState}
        }
}