"use strict";
/* commented out aspects of redux do to incompatibility with nativescript */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/*
import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';
*/
var redux_1 = require("redux");
var user_reducer_1 = require("./user.reducer");
exports.AppStore = new core_1.InjectionToken('App.store');
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
function createAppStore() {
    return redux_1.createStore(user_reducer_1.userReducer);
}
exports.createAppStore = createAppStore;
exports.appStoreProviders = [
    { provide: exports.AppStore, useFactory: createAppStore }
];
