import * as React from "react";
import * as Immutable from "immutable";
import * as firebase from "firebase";
import { applyMiddleware, createStore } from "redux";
import { render } from "react-dom";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { Meteor } from "meteor/meteor";
import { createLogger } from "redux-logger";
import { History, createBrowserHistory, createHashHistory } from "history";
import * as ReactRouterRedux from "react-router-redux";
import EnvChecker from "../imports/helpers/envChecker";
import routes from "../imports/routes";
import { rootReducer, initialState } from "../imports/reducers";

let history: History;
if (EnvChecker.isDev()) {
  history = createHashHistory();
} else {
  history = createBrowserHistory();
}

const routerMid = ReactRouterRedux.routerMiddleware(history);

const logger = createLogger({
  stateTransformer: state => {
    const newState: any = {}; // HACK: Should assign proper type later
    for (const i of Object.keys(state)) {
      if ((Immutable as any).Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  },
});

export const store = createStore(rootReducer, initialState, applyMiddleware(routerMid, thunkMiddleware, logger));

Meteor.startup(() => {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHe6YDOGKevgmMA5e4CGjViMga0OVwZ5w",
    authDomain: "awesome-mix-edd9f.firebaseapp.com",
    databaseURL: "https://awesome-mix-edd9f.firebaseio.com",
    projectId: "awesome-mix-edd9f",
    storageBucket: "",
    messagingSenderId: "116835160945",
  };

  firebase.initializeApp(config);

  render(
    <Provider store={store}>
      <ReactRouterRedux.ConnectedRouter history={history}>{routes}</ReactRouterRedux.ConnectedRouter>
    </Provider>,
    document.getElementById("react-app"),
  );
});
