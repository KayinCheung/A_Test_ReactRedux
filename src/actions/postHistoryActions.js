import { POST_HISTORY } from "./types";
import { apiUrl } from "../config";

//When visiting video page, data of current movie is sent to backend and saved to DB
export const postHistoryActions = history => dispatch => {
  console.log(history);
  fetch(`${apiUrl}/history/add`, {
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
