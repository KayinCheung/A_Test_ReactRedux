import { CLICK_VIDEO, CHANGE_VIEW } from "./types";

//Handle case when user clicks on a video
export const videoClick = (movie, currentVideoIndex) => dispatch => {
  console.log("vid click");
  dispatch({
    type: CLICK_VIDEO,
    movie: movie,
    index: currentVideoIndex
  });
};
