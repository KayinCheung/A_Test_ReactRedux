import React from 'react';
import { connect } from 'react-redux'

import { getHistoryActions } from '../../actions/getHistoryActions'

import { username } from '../../config'
import Header from '../Header'

import { DateConvert } from '../../pureFunctions/DateConvert'
import { videoClick } from '../../actions/videoClickActions'
import { Link } from 'react-router-dom'

class FullWatchHistory extends React.Component  {

    componentDidMount() {
        let { getHistoryActions, history, current_page, pages } = this.props
        getHistoryActions(username, 0)
        document.onkeydown = (e) => {
            this.handleKeyDown(e)
        }
    }

    handleKeyDown(e){
        let { getHistoryActions, history, current_page, pages } = this.props

        switch (e.key) {
            case "ArrowLeft":
                console.log("left")
                getHistoryActions(username, Math.max(0, current_page - 1))
                break;
            case "ArrowRight":
                console.log("right", pages, current_page)
                
                getHistoryActions(username, Math.min(pages, current_page + 1))
                break;
            default:
                break;
        }
    }



    render() {

        let { history, videoClick, getHistoryActions, current_page, pages } = this.props

        return (
            <div>
                <Header />
                <div className="is-centered container" data-test="FullWatchHistory">
                    <div className="buttons is-centered">
                        <button className="is-link button"
                            onClick={() => getHistoryActions(username, Math.max(0, current_page - 1))}
                        >Prev</button>
                        <button className="is-link button"
                            onClick={() => getHistoryActions(username, Math.min(pages, current_page + 1))}
                        >Next</button>
                    </div>
                    <p className="has-text-centered">Page {current_page + 1} of {pages + 1}</p><br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>

                                <th>Title</th>
                                <th>Description</th>
                                <th>Watch Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(data => {
                                let movie = {
                                    title: data.title,
                                    contents: [{ "url": data.videoUrl }],
                                    images: [{ "url": data.imageUrl }],
                                    description: data.description
                                }
                                let [date, time] = DateConvert(data.createdAt)
                                return (
                                    <tr key={data.createdAt} data-test="HistoryTableRow">
                                        <td><img src={data.imageUrl} /></td>
                                        <td>{data.title}</td>
                                        <td>{data.description}</td>
                                        <td>{date}<br />{time}</td>
                                        <td><Link to="/video"><button className="button is-primary" onClick={() => { videoClick(movie, 0) }}
                                        >Rewatch</button></Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <p className="has-text-centered">Page {current_page + 1} of {pages + 1}</p><br />
                    <div className="buttons is-centered">

                        <button className="is-link button"
                            onClick={() => getHistoryActions(username, Math.max(0, current_page - 1))}
                        >Prev</button>
                        <button className="is-link button"
                            onClick={() => getHistoryActions(username, Math.min(pages, current_page + 1))}
                        >Next</button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    history: state.history.history,
    loaded: state.history.loaded,
    pages: state.history.pages,
    current_page: state.history.current_page,

})

export default connect(mapStateToProps, { getHistoryActions, videoClick })(FullWatchHistory);

