import { SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILURE } from "../constants/constant";

const initialState = {
    isInitialized: false,
    isFetching: false,
    isError: false,
    data : []
}

export const  searchUserList = (state = initialState, action)=>{
    switch(action.type){
        case SEARCH_START:  
            return {...state, isInitialized: true, isFetching: true }
        case SEARCH_SUCCESS:
            return {...state, isFetching: false, data: action.payload}
        case SEARCH_FAILURE:
            return{ ...state, isError: true}
        default:
            return {...initialState}
        }
}