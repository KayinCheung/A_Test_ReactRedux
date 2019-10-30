import React from "react";

//Child of Carousell component. One card rendered for each movie
class Card extends React.Component {
  /*On update, ensure that if the current card is the card selected (by left/right key navigation),Scroll that card into view.*/
  componentDidUpdate() {
    let { movie, position, selectedPosition } = this.props;

    if (position === selectedPosition) {
      const card = document.getElementById(`view-${position}${movie.title}`);
      card.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }

  render() {
    let { movie, position, selectedPosition } = this.props;

    return (
      <div
        id={`view-${position}${movie.title}`}
        className="column movie"
        style={{ minWidth: 220 }}
        data-test="Card"
      >
        <div>
          <img
            src={movie.images[0].url}
            alt={`${movie.title}-image`}
            className={position === selectedPosition ? "movieimg" : ""}
          />
          <br />
          <p className="is-size-7">{movie.title}</p>
        </div>
      </div>
    );
  }
}

export default Card;
