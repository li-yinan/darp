export const MOUSE_NEAR = 'MOUSE_NEAR';

export function mouseNear(direction) {
    return {
        type: MOUSE_NEAR,
        payload: direction
    }
}
