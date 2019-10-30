import {
  CAROUSELL_LOADED,
  START_CAROUSELL_LOAD,
  RESET_POSITION
} from "./types";

//Load the homepage carousell
export const loadCarousell = () => dispatch => {
  dispatch({
    type: START_CAROUSELL_LOAD
  });

  fetch("http://localhost:5000/moviedata")
    .then(data => {
      if (data.status === 200) {
        data.json().then(data => {
          dispatch({
            type: CAROUSELL_LOADED,
            entries: data.entries,
            totalCount: data.totalCount
          });

          dispatch({
            type: RESET_POSITION
          });
        });
      } else {
        console.log("ERROR");
      }
    })
    .catch(e => console.log(e));
};
