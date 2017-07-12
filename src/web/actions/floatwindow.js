export const MOUSE_NEAR = 'MOUSE_NEAR';
export const ANTI_BLOCK = 'ANTI_BLOCK';

export const MOUSE_NEAR_TRUE = 'MOUSE_NEAR_TRUE';
export const MOUSE_NEAR_FALSE = 'MOUSE_NEAR_FALSE';

export function mouseNear(status) {
    return {
        type: MOUSE_NEAR,
        payload: status
    }
}

export function enableAntiBlock(status) {
    return {
        type: ANTI_BLOCK,
        payload: status
    }
}
