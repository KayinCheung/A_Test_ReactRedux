import React from 'react';
import { connect } from 'react-redux'

import { getHistoryActions } from '../../actions/getHistoryActions'

import { username } from '../../config'
import Header from '../Header'

import { DateConvert } from '../../pureFunctions/DateConvert'
import { videoClick } from '../../actions/videoClickActions'
import { ArrowNavigation } from '../../pureFunctions/ArrowNavigation';


/*
    On load
    1) GET request to load user's first page of history
    2) Add document.onkeydown to handle left/right paging, and up/down keys for menu navigation
*/
class FullWatchHistory extends React.Component {

    componentDidMount() {
        let { getHistoryActions } = this.props
        getHistoryActions(username, 0)
        document.onkeydown = (e) => {
            this.handleKeyDown(e)
            ArrowNavigation(e)
        }
    }

    //Left key for last page, right key for next page
    handleKeyDown(e) {
        let { getHistoryActions, current_page, pages } = this.props

        switch (e.key) {
            case "ArrowLeft":
                getHistoryActions(username, Math.max(0, current_page - 1))
                break;
            case "ArrowRight":
                getHistoryActions(username, Math.min(pages, current_page + 1))
                break;
            default:
                break;
        }
    }



    render() {

        let { history, getHistoryActions, current_page, pages } = this.props
        let table = ''
        if (history === null) return
        if (history.length != 0) {
            table = (
                <div>
                    <table className="table" data-test="HistoryTable">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Watch Date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {history.map((data, i) => {
                                let [date, time] = DateConvert(data.createdAt)
                                return (
                                    <tr key={data.createdAt} data-test="HistoryTableRow" id={`row${i}`}>
                                        <td><img src={data.imageUrl} /></td>
                                        <td>{data.title}</td>
                                        <td>{data.description}</td>
                                        <td>{date}<br />{time}</td>

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
            )
        }
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

                    {table}

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

