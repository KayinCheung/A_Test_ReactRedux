import { GET_HISTORY, START_GET_HISTORY } from "./types";
import { apiUrl } from "../config";

export const getHistoryActions = (loaded, username, page) => dispatch => {
  if (loaded === false) return;
  dispatch({
    type: START_GET_HISTORY
  });
  fetch(`${apiUrl}/history?username=${username}&page=${page}`)
    .then(data => {
      if (data.status === 200) {
        data.json().then(data => {
          dispatch({
            type: GET_HISTORY,
            history: data.data,
            pages: data.pages,
            current_page: data.current_page
          });
        });
      } else {
        console.log("ERROR");
      }
    })
    .catch(e => console.log(e));
};
