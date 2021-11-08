import axios from "axios"; 
import {SEARCH_START, SEARCH_SUCCESS, SEARCH_FAILURE} from '../constants/searchUser.constant';

export const searchUser =(searchQuery)=> dispatch => {

    dispatch({
        type: SEARCH_START
    })

    const promise = axios.post('/users/search',{
        search: searchQuery
    })

    promise.then((response)=>{
        dispatch({
            type: SEARCH_SUCCESS,
            payload: response.data
        })
        return response
    })
    .catch((error)=>{
        dispatch({
            type: SEARCH_FAILURE,
            payload: error
        })

        return Promise.reject(error)
    })
}