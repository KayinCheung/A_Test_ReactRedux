import React from 'react';
import { connect } from 'react-redux'

import videojs from 'video.js'
import { postHistoryActions } from '../../actions/postHistoryActions';
import { username } from '../../config'
import Header from '../Header'


class Video extends React.Component {

    componentDidMount() {
        let { postHistoryActions, movie } = this.props
        if (movie === null || movie === undefined || !movie.contents[0].url){
            window.location.href = "/"
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
        /*let video = videojs(`video`).ready(() => {
            let player = this;
            console.log("Vid ready")
            player.on('ended', function () {
                window.location.href = "/"
            });
        });*/
    }

    componentWillUnmount(){
        /*let video = videojs(`video`).ready(() => {
            this.dispose();
        });*/
    }

    render() {
        let { currentVideoIndex, movie } = this.props
        if (movie === null || movie === undefined || !movie.contents[0].url){
            window.location.href = "/"
            return null
        } 
    

        return (
            <div>
                <Header />
                <div key={`${currentVideoIndex}${movie.title}`} className="container body" data-test="VideoComponent">
                    <div className="is-centered has-text-centered">
                        Now Playing: {movie.title}
                        <video id={`video`} style={{ margin: 'auto' }} className='video-js fullscreen' controls preload='auto'
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

    currentVideoIndex: state.position.currentVideoIndex,
    movie: state.position.movie
})

export default connect(mapStateToProps, { postHistoryActions })(Video);
