import {MOUSE_NEAR} from '../actions/index';
export default function (state, action) {
    switch (action.type) {
        case MOUSE_NEAR:
            let currentPosition = action.payload;
            return Object.assign({}, state, {
            });
        default:
            return {};
    }
}
