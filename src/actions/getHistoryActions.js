
import { GET_HISTORY, START_GET_HISTORY } from './types'

export const getHistoryActions = (username, page) => (dispatch) => {
    dispatch({
        type: START_GET_HISTORY,
    })
    fetch(`http://localhost:5000/history?username=${username}&page=${page}`)
    .then(data => {
        if (data.status === 200) {
            data.json().then(data => {
                dispatch({
                    type: GET_HISTORY,
                    history: data.data,
                    pages: data.pages,
                    current_page: data.current_page
                })
            })
        } else {
            console.log("ERROR")
        }
    }
    ).catch(e =>
        console.log(e)
    )

}