import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router-dom";

import { loadCarousell } from '../../actions/carousellActions'
import { keyDown } from '../../actions/keyboardActions'
import { videoClick } from '../../actions/videoClickActions'

import Card from '../Card/index'
import Header from '../Header'

import {ArrowNavigation} from '../../pureFunctions/ArrowNavigation'

class Carousell extends React.Component {

/*
    On load
    1) GET request to movie data
    2) Add document.onkeydown to handle left/right/enter for navigating carousell cards, and up/down for menu navigation
    3) Listen to scroll events to make scrolling horizontal.
*/
    componentDidMount() {
        let { loadCarousell } = this.props
        loadCarousell()

        document.onkeydown = async (e) => {
            const toHandleKeydown = ArrowNavigation(e)
            if (toHandleKeydown === false) return
            let { keyDown, entries, selectedPosition } = this.props
            await keyDown(e, entries[selectedPosition])
            console.log(entries[selectedPosition])
            if (e.key === "Enter" && toHandleKeydown) {
                this.props.history.push('/video')
            }
            
        }

        const item = document.getElementById('carousell-scroll');
        window.addEventListener('wheel', function(e) {
            if (e.deltaY > 0) item.scrollLeft += 100;
            else item.scrollLeft -= 100;
          });
    }

    render() {

        let { entries, selectedPosition, videoClick } = this.props
        return (
            <div>
                <Header />
                <div data-test="Carousell">
                    <p className="has-text-centered">Video List</p>
                    <div className="carousell-wrapper">
                        <div className="carousell" id="carousell-scroll">

                            <div className="columns">
                                {entries.map(function (movie, i) {
                                    //Loop out individual movie into cards
                                    return (
                                        <Link to="/video"
                                            key={`${i}${movie.title}`}
                                            onClick={() => videoClick(movie, i)}>
                                            <Card
                                                movie={movie}
                                                position={i}
                                                selectedPosition={selectedPosition}
                                                
                                            />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    entries: state.carousell.entries,
    loaded: state.carousell.loaded,
    totalCount: state.carousell.totalCount,
    lastInteractPosition: state.position.lastInteractPosition,

    selectedPosition: state.position.position
})

export default connect(mapStateToProps, { loadCarousell, keyDown, videoClick })(Carousell);
