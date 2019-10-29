import { CLICK_VIDEO, CHANGE_VIEW } from './types'

export const videoClick = (movie, currentVideoIndex) => (dispatch) => {
    console.log('vid click')
    dispatch({
        type: CLICK_VIDEO,
        movie: movie,
        index: currentVideoIndex
    })
}