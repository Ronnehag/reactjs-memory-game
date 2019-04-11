import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MemoryCard from './MemoryCard';

export class GameBoard extends Component {

  state = {
    memoryCards: []
  }

  componentDidUpdate(prevprops, prevState) {
    if (prevState.memoryCards !== this.state.memoryCards) {
      this.setState({
        memoryCards: this.state.memoryCards
      });
    }
  }

  componentDidMount() {
    this.setState({
      memoryCards: this.props.cards
    });
  }

  countFlippedCards = () => {
    const { memoryCards } = this.state;
    return memoryCards.filter(({ flipped, found }) => flipped && !found).length;
  };

  flipCard = (id, cb) => {
    this.setState(prevState => (
      {
        memorycards: prevState.memoryCards.map(card => {
          if (card.id === id) {
            card.flipped = true;
          }
          return card;
        })
      }), () => cb ? cb() : null
    );
  };

  handleFlip = id => {
    switch (this.countFlippedCards()) {
      case 0:
        this.flipCard(id);
        break;
      case 1:
        this.flipCard(id, () => {
          this.isMatch();
        });
        break;
      default:
        console.log("None");
        break;
    }
  };

  isMatch = () => {
    const { memoryCards } = this.state;
    const flippedCards = memoryCards.filter(card => card.flipped && !card.found);
    if (flippedCards[0].matchesId === flippedCards[1].id ||
      flippedCards[1].matchesId === flippedCards[0].id) {
      this.setState(prevState => ({
        memoryCards: prevState.memoryCards.map(card => {
          switch (card.id) {
            case flippedCards[0].id:
            case flippedCards[1].id:
              card.found = true;
              return card;
            default:
              return card;
          }
        })
      }), () => this.hasWon());
    } else {
      setTimeout(() => {
        memoryCards[memoryCards.indexOf(flippedCards[0])].flipped = false;
        memoryCards[memoryCards.indexOf(flippedCards[1])].flipped = false;
        this.setState({
          memoryCards: memoryCards
        });
      }, 800);
    }
  };


  hasWon = () => {
    const { memoryCards } = this.state;
    let won = memoryCards.every(card => card.found);
    if (won) {
      this.props.won();
    }
  };


  createBoard = () =>
    this.state.memoryCards.length ? (
      this.state.memoryCards.map(card => (
        <Grid item xs={3} key={card.id}>
          <MemoryCard
            flipped={card.flipped}
            found={card.found}
            id={card.id}
            imgUrl={card.url}
            flip={this.handleFlip} />
        </Grid>
      ))
    ) : (
        <p>Loading cards...</p>
      );


  render() {
    return (
      <Grid container spacing={8} justify="center">
        {this.createBoard()}
      </Grid>
    );
  }
}

export default GameBoard;
