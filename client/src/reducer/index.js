import {combineReducers} from 'redux';
import { searchUserList } from './searchUser.reducer';
import { getMyPost } from './getPosts.reducer';


const rootReducer = combineReducers({
    searchUser: searchUserList,
    myPosts: getMyPost
});

export  default rootReducer;