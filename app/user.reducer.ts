/**
 * User Reducer
 */
import { Reducer, Action } from 'redux';
import { AppState } from './app.state';
import { UserModel } from './item/user';


import {
  CREATE_USER,
  CLEAR_STATE,
  SetCurrentUserAction,
} from './user.actions';

const initialState: AppState = { user: {record_id: '',name: '', uuid:'', active:false, schedule:[]}};

// Create our reducer that will handle changes to the state
export const userReducer: Reducer<AppState> =
  (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {

    case CREATE_USER:
      const currentUser: UserModel = (<SetCurrentUserAction>action).user;
      //console.log("putting user into State: " + currentUser);
      return {user: currentUser};

    case CLEAR_STATE:
      return initialState;

    default:
      return state;
    }
  };