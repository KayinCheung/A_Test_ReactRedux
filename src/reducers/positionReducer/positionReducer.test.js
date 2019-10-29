import { LEFT_ARROW, RIGHT_ARROW, ENTER_KEY, CLICK_VIDEO } from '../../actions/types'
import positionReducer from './index'
import { mockMovieData } from '../../mock' 

describe('Position Reducer', () => {

    it('Should return default state', () => {
        const newState = positionReducer(undefined, {})
        expect(newState).toEqual({
            position: 0,
            total: 29,
            currentVideoIndex: 0,
            movie: null
        })
    })

    it('CLICK_VIDEO should replace OLD movie with NEW movie, replace OLD position/currentVideoIndex with NEW currentVideoIndex', () => {

        const currentState = {
            position: 6,
            total: 29,
            currentVideoIndex: 6,
            movie: null
        }

        const payload = {
            movie: mockMovieData,
            currentVideoIndex: 3
        }
        const newState = positionReducer(currentState, {
            type: CLICK_VIDEO,
            ...payload
        })
        expect(newState).toEqual({
            movie: mockMovieData,
            currentVideoIndex: 3,
            position: 3,
            total: 29,
        })
    })

    it('LEFT_ARROW should return current state, but with position reduced by 1', () => {
        const currentState = {
            position: 3,
            total: 29,
            currentVideoIndex: 4,
            movie: null
        }
        const newState = positionReducer(currentState, {
            type: LEFT_ARROW,
        })
        expect(newState).toEqual({
            position: 2,
            total: 29,
            currentVideoIndex: 4,
            movie: null
        })
    })

    it('LEFT_ARROW should return current state, position reduced by 1 (Minimum of 0)', () => {
        const currentState = {
            position: 0,
            total: 29,
            currentVideoIndex: 4,
            movie: null
        }
        const newState = positionReducer(currentState, {
            type: LEFT_ARROW,
        })
        expect(newState).toEqual({
            position: 0,
            total: 29,
            currentVideoIndex: 4,
            movie: null
        })
    })

    it('RIGHT_ARROW should return current state, with position increased by 1 (Max of total - 1)', () => {
        const currentState = {
            position: 5,
            total: 29,
            currentVideoIndex: 4,
            movie: null
        }
        const newState = positionReducer(currentState, {
            type: RIGHT_ARROW,
        })
        expect(newState).toEqual({
            position: 6,
            total: 29,
            currentVideoIndex: 4,
            movie: null
        })
    })

    it('RIGHT_ARROW should return current state, with position increased by 1 (Max of total - 1)', () => {
        const currentState = {
            position: 28,
            total: 29,
            currentVideoIndex: 4,
            movie: null
        }
        const newState = positionReducer(currentState, {
            type: RIGHT_ARROW,
        })
        expect(newState).toEqual({
            position: 28,
            total: 29,
            currentVideoIndex: 4,
            movie: null
        })
    })
});