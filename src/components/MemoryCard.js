import React, { Component } from "react";
import ReactCardFlip from "react-card-flip";

export class MemoryCard extends Component {

  flipCard = e => {
    if (this.props.found || this.props.flipped) return;
    this.props.flip(e.target.id);
  };

  render() {
    const { id, imgUrl, flipped, found } = this.props;
    return (
      <div>
        <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
          <div id={id}
            className="memoryCard"
            onClick={this.flipCard}
            style={cardBack}
            key="front"
          />
          <div
            className="memoryCard"
            onClick={this.flipCard}
            key="back"
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat", backgroundPosition: "center",
              border: found ? "1px solid green" : "1px solid transparent"
            }}
          >
          </div>
        </ReactCardFlip>
      </div>
    );
  }
}

const cardBack = {
  background: "#3700B3",
  border: "1px solid transparent",
}


export default MemoryCard;
