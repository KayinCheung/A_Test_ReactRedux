import { POST_HISTORY } from "./types";

//When visiting video page, data of current movie is sent to backend and saved to DB
export const postHistoryActions = history => dispatch => {
  console.log(history);
  fetch(`http://localhost:5000/history/add`, {
    method: "POST",
    body: JSON.stringify(history),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => {
      if (data.status === 200) {
        data.json().then(data => {
          //console.log(data);
        });
      } else {
        console.log("ERROR");
      }
    })
    .catch(e => console.log(e));
};
