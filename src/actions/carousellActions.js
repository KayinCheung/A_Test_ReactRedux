import { CAROUSELL_LOADED, START_CAROUSELL_LOAD } from './types'

export const loadCarousell = () => (dispatch) => {
    dispatch({
        type: START_CAROUSELL_LOAD,
    })


    fetch('http://localhost:5000/moviedata')
        .then(data => {
            if (data.status === 200) {
                data.json().then(data => {
                    console.log(data)
                    dispatch({
                        type: CAROUSELL_LOADED,
                        entries: data.entries,
                        totalCount: data.totalCount
                    })
                })
            } else {
                console.log("ERROR")
                console.log(data)
            }
        }
        ).catch(e =>
            console.log(e)
        )
}