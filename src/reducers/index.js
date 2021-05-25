import { combineReducers } from 'redux';

import handReducer from './handReducer';

export default combineReducers({
    handState: handReducer
})