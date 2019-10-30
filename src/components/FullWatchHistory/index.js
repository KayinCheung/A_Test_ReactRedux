import React from "react";
import { connect } from "react-redux";

import { getHistoryActions } from "../../actions/getHistoryActions";

import { username } from "../../config";
import Header from "../Header";

import { DateConvert } from "../../helperFunctions/DateConvert";
import { videoClick } from "../../actions/videoClickActions";
import { ArrowNavigation } from "../../helperFunctions/ArrowNavigation";

/*
    /history page

    On load
    1) GET request to load user's first page of history
    2) Add document.onkeydown to handle left/right paging, and up/down keys for menu navigation
*/
class FullWatchHistory extends React.Component {
  componentDidMount() {
    let { getHistoryActions, current_page } = this.props;
    getHistoryActions(null, username, current_page);
    document.onkeydown = e => {
      this.handleKeyDown(e);
      ArrowNavigation(e);
    };
  }

  //Left key for last page, right key for next page
  handleKeyDown(e) {
    let { getHistoryActions, current_page, pages, loaded } = this.props;

    switch (e.key) {
      case "ArrowLeft":
        getHistoryActions(loaded, username, Math.max(0, current_page - 1));
        break;
      case "ArrowRight":
        getHistoryActions(
          loaded,
          username,
          Math.min(pages - 1, current_page + 1)
        );
        break;
      default:
        break;
    }
  }

  render() {
    let {
      history,
      getHistoryActions,
      current_page,
      pages,
      loaded
    } = this.props;

    let table = "";
    let paging = "";

    if (history === null) return;
    if (history.length != 0) {
      paging = (
        <div>
          <p className="has-text-centered">
            Page {current_page + 1} of {pages}
          </p>
          <br />
          <div className="buttons is-centered">
            <button
              className="is-link button"
              onClick={() =>
                getHistoryActions(
                  loaded,
                  username,
                  Math.max(0, current_page - 1)
                )}
            >
              Prev
            </button>
            <button
              className="is-link button"
              onClick={() =>
                getHistoryActions(
                  loaded,
                  username,
                  Math.min(pages - 1, current_page + 1)
                )}
            >
              Next
            </button>
          </div>
        </div>
      );

      table = (
        <div>
          <table className="table" data-test="HistoryTable">
            <thead>
              <tr>
                <th className="col1" />
                <th className="col2">Title</th>
                <th className="col3">Description</th>
                <th className="col4">Watch Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((data, i) => {
                let [date, time] = DateConvert(data.createdAt);
                return (
                  <tr
                    key={data.createdAt}
                    data-test="HistoryTableRow"
                    id={`row${i}`}
                  >
                    <td>
                      <img src={data.imageUrl}/>
                    </td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td>
                      {date}
                      <br />
                      {time}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div>
        <Header />

        <div className="is-centered container" data-test="FullWatchHistory">
          <p className="has-text-centered">
            Your recent views
            <br />
            {loaded === false ? <i className="fas fa-spinner fa-spin" /> : ""}
            {loaded === true && history.length === 0 ? "No view history" : ""}
          </p>
          {paging}
          <br />
          {table}
          <br />
          {history.length >= 3 ? paging : ""}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history.history,
  loaded: state.history.loaded,
  pages: state.history.pages,
  current_page: state.history.current_page
});

export default connect(mapStateToProps, { getHistoryActions, videoClick })(
  FullWatchHistory
);
