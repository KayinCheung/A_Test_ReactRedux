import React from 'react';

class Card extends React.Component{

    render() {
        let { movie, position, selectedPosition } = this.props
        return (
            <div id={`view-${position}${movie.title}`} className="column movie" style={{ minWidth: 220 }} data-test="Card">
                <div>
                    <img src={movie.images[0].url} 
                        alt={`${movie.title}-image`}
                        className={position === selectedPosition ? 'movieimg' : ''}/>
                    <br />
                    <p className="is-size-7">{movie.title}</p>
                </div>
            </div>
        );
    }
}

export default Card;
