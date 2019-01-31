/* commented out aspects of redux do to incompatibility with nativescript */

import { InjectionToken } from '@angular/core';

/*
import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';
*/

import {
  createStore,
  Store
} from 'redux';


import { AppState } from './app.state';

import {
  userReducer as reducer
} from './user.reducer';

export const AppStore = new InjectionToken('App.store');

/*
const devtools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;


export function createAppStore(): Store<AppState> {
  return createStore<AppState>(
    reducer,
    compose(devtools)
  );
}
*/

export function createAppStore(): Store<AppState> {
  return createStore<AppState>(
    reducer
  );
}

export const appStoreProviders = [
   { provide: AppStore, useFactory: createAppStore }
];
