import {
    MOUSE_NEAR,
    ANTI_BLOCK,
    MOUSE_NEAR_TRUE,
    MOUSE_NEAR_FALSE
} from '../actions/index';

export default function (state, action) {
    switch (action.type) {
        case MOUSE_NEAR:
            let currentPosition = action.payload;
            return Object.assign({}, state, {
                status: currentPosition
            });
        case ANTI_BLOCK:
            let currentStatus = action.payload;
            return Object.assign({}, state, {
                enableAntiBlock: currentStatus
            });
        default:
            return {};
    }
}
