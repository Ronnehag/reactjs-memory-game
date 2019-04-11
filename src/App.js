import React, { Component } from "react";
import GameBoard from "./components/GameBoard";
import NewGame from "./components/NewGame";
import PlayAgain from './components/PlayAgain';

class App extends Component {
  static initState = () => {
    return {
      newGame: false,
      won: false,
      cards: [],
      memoryCards: [
        {
          id: 1,
          color: "red",
          matchesId: 2,
          flipped: false,
          found: false
        },
        {
          id: 2,
          color: "red",
          matchesId: 1,
          flipped: false,
          found: false
        },
        {
          id: 3,
          color: "blue",
          matchesId: 4,
          flipped: false,
          found: false
        },
        {
          id: 4,
          color: "blue",
          matchesId: 3,
          flipped: false,
          found: false
        }
      ]
    };
  }

  state = App.initState();

  componentDidMount() {
    let amount = 10;
    let cards = [];
    for (let i = 1; i < amount + 1; i++) {
      let id = createId();
      let id2 = createId();
      const card1 = {
        id: id,
        matchesId: id2,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
        flipped: false,
        found: false,
      }
      const card2 = {
        id: id2,
        matchesId: id,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
        flipped: false,
        found: false,
      }
      cards.push(card1);
      cards.push(card2);
    }
    this.shuffleCards(cards);
    this.setState({
      cards: cards
    });
  }

  shuffleCards = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  resetGame = () => {
    this.setState(App.initState(), () => this.initGame());
  }

  hasWon = () => {
    this.setState({
      won: true
    });
    // TODO RESET GAME AND NEWGAME BUTTON
    // STATE INIT STATE
  };

  initGame = () => {
    this.setState({
      newGame: true
    });
  };

  render() {
    const { cards, newGame, won } = this.state;
    return (
      <div>
        <div className="flex-container">
          <div className="message">
            {won ? (<h2>You win!</h2>) : null}
          </div>
        </div>
        <div className="menu flex-container">
          <NewGame game={newGame} play={this.initGame} />
          {won ? (<PlayAgain again={this.resetGame} />) : null}
        </div>
        <div className="board-container">
          {newGame ?
            (<GameBoard cards={cards} won={this.hasWon} />)
            : null}
        </div>
      </div>
    );
  }
}

export default App;

const createId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}