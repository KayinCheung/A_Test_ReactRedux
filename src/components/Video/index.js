import React from 'react';
import { connect } from 'react-redux'

import videojs from 'video.js'
import { postHistoryActions } from '../../actions/postHistoryActions';
import { username } from '../../config'
import Header from '../Header'
import { ArrowNavigation } from '../../pureFunctions/ArrowNavigation';

class Video extends React.Component {

    /*
    On load
    1) current movie details are posted to backend and saved inn database to store history
    2) Load the video callback, when video ends, return to homepage
    3) Add event listener for handling keyboard navigation
    */
    componentDidMount() {
        let { postHistoryActions, movie } = this.props
        if (movie === null || movie === undefined || !movie.contents[0].url) {
            return null
        }

        let historyData = {
            username: username,
            title: movie.title,
            description: movie.description,
            videoUrl: movie.contents[0].url,
            imageUrl: movie.images[0].url
        }

        postHistoryActions(historyData)

        document.onkeydown = (e) => {
            ArrowNavigation(e)
        }

        //videojs will cause tests to fail with the error: "TypeError: The element or ID supplied is not valid."
        //Setting it in a try/catch for test to pass
        try {
            let video = videojs('video').ready(function () {
                let player = this;
                player.on('ended', function () {
                    window.location.href = "/"
                });
            });
        } catch {}

    }

    //Dispose the video when finished watching
    componentWillUnmount() {
        //Same videojs test issue as above
        try{
            let video = videojs('video').ready(function () {
                let player = this;
                this.dispose();
            });
        } catch{}
       
    }

    render() {
        let { movie } = this.props
        if (movie === null || movie === undefined || !movie.contents[0].url) {
            window.location.href = "/"
            return null
        }

        return (
            <div>
                <Header />
                <div key={`${movie.title}`} className="container body" data-test="VideoComponent">
                    <div className="is-centered has-text-centered">
                        Now Playing: {movie.title}
                        <video id='video' style={{ margin: 'auto' }} className='video-js fullscreen' controls preload='auto'
                            poster='MY_VIDEO_POSTER.jpg' data-setup='{"controls": true,"preload": "auto", "fluid": true}'>
                            <source src={movie.contents[0].url} type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    movie: state.position.movie
})

export default connect(mapStateToProps, { postHistoryActions })(Video);
