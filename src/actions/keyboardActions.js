import { LEFT_ARROW, RIGHT_ARROW, ENTER_KEY } from './types'

export const keyDown = (e, movie) => (dispatch) => {
    switch (e.key) {
        case "ArrowLeft":
            dispatch({
                type: LEFT_ARROW
            })
            break

        case "ArrowRight":
            dispatch({
                type: RIGHT_ARROW
            })
            break

        case "Enter":
            dispatch({
                type: ENTER_KEY,
                movie: movie
            })
            
            break

        default:
            break
    }
}