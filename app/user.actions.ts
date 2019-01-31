import {
  Action,
  ActionCreator
} from 'redux';

import { UserModel } from './item/user';


export interface SetCurrentUserAction extends Action {
  user: UserModel;
}

export const CREATE_USER: string = 'CREATE_USER';
export const create_user: ActionCreator<SetCurrentUserAction>  = (currentuser) => ({
  type: CREATE_USER,
  user: currentuser
});

export const CLEAR_STATE: string = 'CLEAR_STATE';
export const clear_state: ActionCreator<SetCurrentUserAction>  = (currentuser) => ({
  type: CLEAR_STATE,
  user: currentuser
});