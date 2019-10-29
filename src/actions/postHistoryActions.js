
import { POST_HISTORY } from './types'


export const postHistoryActions = (history) => (dispatch) => {

    console.log(history)
    fetch(`http://localhost:5000/history/add`, {
        method: "POST",
        body: JSON.stringify(history),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(data => {
        if (data.status === 200) {
            console.log(data)
            data.json().then(data => {
                console.log(data)
            })
        } else {
            console.log("ERROR")
        }
    }
    ).catch(e =>
        console.log(e)
    )

}