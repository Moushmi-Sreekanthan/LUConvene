import axios from "axios"; 
import {GET_MY_POST_START, GET_MY_POST_SUCCESS, GET_MY_POST_FAILURE} from '../constants/constant';

import {GET_TIMELINE_POST_START, GET_TIMELINE_POST_SUCCESS, GET_TIMELINE_POST_FAILURE} from '../constants/constant';

export const getMyPost =(params)=> dispatch => {

    dispatch({
        type: GET_MY_POST_START
    })

    const promise = axios.get(`/posts/profile'/${params}`)


    promise.then((response)=>{
        dispatch({
            type: GET_MY_POST_SUCCESS,
            payload: response.data
        })
        return response
    })
    .catch((error)=>{
        dispatch({
            type: GET_MY_POST_FAILURE,
            payload: error
        })

        return Promise.reject(error)
    })
}

export const getTimelinePost =(params)=> dispatch => {

    dispatch({
        type: GET_TIMELINE_POST_START
    })

    const promise = axios.get(`/posts/timeline/all/${params}`)

    promise.then((response)=>{
        dispatch({
            type: GET_TIMELINE_POST_SUCCESS,
            payload: response.data
        })
        return response
    })
    .catch((error)=>{
        dispatch({
            type: GET_TIMELINE_POST_FAILURE,
            payload: error
        })

        return Promise.reject(error)
    })
}