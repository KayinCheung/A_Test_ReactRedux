import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadCarousell } from '../../actions/carousellActions'
import { keyDown } from '../../actions/keyboardActions'
import { videoClick } from '../../actions/videoClickActions'

import { withRouter } from "react-router-dom";

import Card from '../Card/index'


class Carousell extends React.Component {

    componentDidMount() {
        let { loadCarousell, keyDown, entries, selectedPosition } = this.props
        loadCarousell()
        document.onkeydown = async (e) => {
            await keyDown(e, entries[selectedPosition])
            if (e.key === "Enter") {
                this.props.history.push('/video')
            }
        }
    }

    render() {

        let { entries, selectedPosition, videoClick } = this.props
        return (
            <div data-test="Carousell">
                Video List
            <div className="carousell-wrapper">
                    <div className="carousell" id="carousell-scroll">

                        <div className="columns">
                            {entries.map(function (movie, i) {
                                return (
                                    <Link to="/video"
                                        onClick={() => videoClick(movie, i)}
                                        key={`${i}${movie.title}`}>
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

export default withRouter(connect(mapStateToProps, { loadCarousell, keyDown, videoClick })(Carousell));
