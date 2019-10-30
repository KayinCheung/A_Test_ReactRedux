import React from "react";
import { connect } from "react-redux";

import videojs from "video.js";
import { postHistoryActions } from "../../actions/postHistoryActions";
import { username } from "../../config";
import Header from "../Header";
import { ArrowNavigation } from "../../helperFunctions/ArrowNavigation";

//Page with the video player
class Video extends React.Component {
  /*
    On load
    1) current movie details are posted to backend and saved inn database to store history
    2) Load the video callback, when video ends, return to homepage
    3) Add event listener for handling keyboard navigation
    */
  componentDidMount() {
    let { postHistoryActions, movie } = this.props;
    if (movie === null || movie === undefined || !movie.contents[0].url) {
      return null;
    }

    let historyData = {
      username: username,
      title: movie.title,
      description: movie.description,
      videoUrl: movie.contents[0].url,
      imageUrl: movie.images[0].url
    };

    postHistoryActions(historyData);

    /*
        Handle keyboard navigation. 
        If the header menu isn't focused,
        the left/right keys rewinds/skips 10s of video, and Enter/Space key toggles between playing and pausing the video     
    */
    document.onkeydown = e => {
      const toHandleKeydown = ArrowNavigation(e);
      if (toHandleKeydown) {
        let video = videojs("video");
        switch (e.key) {
          case " ":
          case "Enter":
            video.paused() ? video.play() : video.pause();
            break;
          case "ArrowRight":
            video.currentTime(video.currentTime() + 10);
            break;
          case "ArrowLeft":
            video.currentTime(video.currentTime() - 10);
            break;
        }
      }
    };

    //Back to homepage when video finished
    if (document.getElementById("video")) {
      let video = videojs("video");
      video.play();
      video.on("ended", function() {
        window.location.href = "/";
      });
    }
  }

  //Dispose the video when finished watching
  componentWillUnmount() {
    let video = videojs("video");
    video.dispose();
  }

  render() {
    let { movie } = this.props;
    if (movie === null || movie === undefined || !movie.contents[0].url) {
      window.location.href = "/";
      return null;
    }

    return (
      <div>
        <Header />
        <div
          key={`${movie.title}`}
          className="container body"
          data-test="VideoComponent"
        >
          <div className="is-centered has-text-centered">
            Now Playing: {movie.title}
            <video
              id="video"
              style={{ margin: "auto" }}
              className="video-js fullscreen"
              controls
              preload="auto"
            >
              <source src={movie.contents[0].url} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.position.movie
});

export default connect(mapStateToProps, { postHistoryActions })(Video);
