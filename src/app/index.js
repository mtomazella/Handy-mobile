import React from 'react';
import Router from '../router';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../reducers';

import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(rootReducer, devToolsEnhancer());

export default props => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}