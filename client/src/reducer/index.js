import {combineReducers} from 'redux';
import { searchUserList } from './searchUser.reducer';

const rootReducer = combineReducers({
    searchUser: searchUserList
});

export  default rootReducer;