import { START_CAROUSELL_LOAD, CAROUSELL_LOADED } from '../../actions/types'

const initialState = {
    entries: [],
    totalCount: 0,
    loaded: false
}

export default function (state = initialState, action){
    switch (action.type) {
        case CAROUSELL_LOADED:
            return {
                ...state,
                entries: action.entries,
                totalCount: action.totalCount,
                loaded: true
            }
        case START_CAROUSELL_LOAD:
            return {
                ...state,
                loaded: false
            }

        default:
            return state;
    }
}