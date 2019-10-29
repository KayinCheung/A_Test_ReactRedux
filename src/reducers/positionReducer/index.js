import { LEFT_ARROW, RIGHT_ARROW, ENTER_KEY, CLICK_VIDEO } from '../../actions/types'

const initialState = {
    position: 0,
    total: 29,
    currentVideoIndex: 0,
    movie: null
}

export default function (state = initialState, action){
    switch (action.type) {
        case LEFT_ARROW:
            return {
                ...state,
                position: Math.max(state.position - 1,0)
            }
        case RIGHT_ARROW:
            return {
                ...state,
                position: Math.min(state.position + 1, state.total - 1)
            }

        case ENTER_KEY:
        return {
            ...state,
            currentVideoIndex: state.position,
            movie: action.movie
        }

        case CLICK_VIDEO:
        return {
            ...state,
            position: action.currentVideoIndex,
            currentVideoIndex: action.currentVideoIndex,
            movie: action.movie
        }

        default:
            return state;
    }
}