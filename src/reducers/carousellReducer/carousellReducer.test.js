import { START_CAROUSELL_LOAD, CAROUSELL_LOADED } from '../../actions/types'
import carousellReducer from './index'

describe('Carousell Reducer', () => {

    it('Should return default state', () => {
        const newState = carousellReducer(undefined, {})
        expect(newState).toEqual({
            entries: [],
            totalCount: 0,
            loaded: false
        })
    })

    it('CAROUSELL_LOADED should return payload as new state', () => {
        const payload = {
            entries: [1, 2, 3, 4],
            totalCount: 5,
            loaded: true,
        }
        const newState = carousellReducer(undefined, {
            type: CAROUSELL_LOADED,
            ...payload
        })
        expect(newState).toEqual({
            entries: [1, 2, 3, 4],
            totalCount: 5,
            loaded: true,
        })
    })

    it('START_CAROUSELL_LOAD should return current state, but with loaded = false', () => {
        const currentState = {
            entries: [1, 2, 3, 4],
            totalCount: 5,
            loaded: true,
        }
        const newState = carousellReducer(currentState, {
            type: START_CAROUSELL_LOAD,
        })
        expect(newState).toEqual({
            entries: [1, 2, 3, 4],
            totalCount: 5,
            loaded: false,
        })
    })
});