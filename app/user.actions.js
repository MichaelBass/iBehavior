"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_USER = 'CREATE_USER';
exports.create_user = function (currentuser) { return ({
    type: exports.CREATE_USER,
    user: currentuser
}); };
exports.CLEAR_STATE = 'CLEAR_STATE';
exports.clear_state = function (currentuser) { return ({
    type: exports.CLEAR_STATE,
    user: currentuser
}); };
