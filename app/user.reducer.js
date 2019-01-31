"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_actions_1 = require("./user.actions");
var initialState = { user: { record_id: '', name: '', uuid: '', active: false, schedule: [] } };
// Create our reducer that will handle changes to the state
exports.userReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case user_actions_1.CREATE_USER:
            var currentUser = action.user;
            //console.log("putting user into State: " + currentUser);
            return { user: currentUser };
        case user_actions_1.CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
};
