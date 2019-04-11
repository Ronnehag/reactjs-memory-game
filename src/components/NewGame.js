import React, { Component } from "react";

export class NewGame extends Component {
  handleClick = e => {
    this.props.play()
  };

  render() {
    return (
      <div className="menu-item">
        <button className="btn btn-play"
          onClick={this.handleClick}
          disabled={this.props.game}
        >
          Play
        </button>
      </div>
    );
  }
}

export default NewGame;
