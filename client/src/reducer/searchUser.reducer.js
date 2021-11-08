import { SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILURE } from "../constants/searchUser.constant";

const initialState = {
    isInitialized: false,
    isFeatching: false,
    isError: false,
    data : []
}

export const  searchUserList = (state = initialState, action)=>{
    switch(action.type){
        case SEARCH_START:  
            return {...state, isInitialized: true, isFeatching: true }
        case SEARCH_SUCCESS:
            return {...state, isFeatching: false, data: action.payload}
        case SEARCH_FAILURE:
            return{ ...state, isError: true}
        default:
            return {...initialState}
        }
}