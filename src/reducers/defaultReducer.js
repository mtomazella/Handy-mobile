import { TEST } from '../actions';

const defaultReducer = (state = null, action) => {
    switch (action.type) {
        case TEST:
            return state;
        default:
            return state;
    }
}

export default defaultReducer;