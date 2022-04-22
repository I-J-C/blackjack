import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Gameboard from './components/Gameboard';
import Rules from './components/Rules';

const deckURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count='
let deckCount = 1;
const drawURL1 = 'https://deckofcardsapi.com/api/deck/'
const drawURL2 = '/draw/?count='

function App() {

  const [deckID, setDeckID] = useState();
  // const [currentCardImage, setCurrentCardImage] = useState();
  const [currentCard, setCurrentCard] = useState();
  const [drawnCard, setDrawnCard] = useState();
  const [game, setGame] = useState();
  const [player, setPlayer] = useState();
  const [dealer, setDealer] = useState();

  const fetchNewDeck = () => {
    const url = `${deckURL}${deckCount}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const newDeckID = response.deck_id;
        setDeckID(newDeckID);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const drawCard = () => {
    const url = `${drawURL1}${deckID}${drawURL2}1`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.cards);
        setDrawnCard(response.cards);
        // format: response.cards is array with all drawn cards
        // response.cards[i].{code, image(pngURL), images([pngURL, svgURL]), suit, value, remaining, success}
        let newCard = new Card(response.cards[0].code, response.cards[0].image);
        setCurrentCard(newCard);
      })
      .catch((err) => {
        console.error(err);
      });
  }





  // useEffect(()=>{
  //   fetchNewDeck();
  // }, []); 

  //Blackjack functions here

  class Player {
    constructor(bet = null, dealer = false) {
      this.currentHand = null;
      this.hands = [this.currentHand ? this.currentHand : null];
      dealer ? this.dealer = true : this.dealer = false;
    }
  }




  class Card {
    constructor(code, imageURL) {
      this.code = code;
      this.imageURL = imageURL;
      this.value = this.cardValue(this.code);
    }

    cardValue = (cardCode) => {
      let value = null;
      if ((cardCode) && (cardCode.includes('K') || cardCode.includes('Q') || cardCode.includes('J') || cardCode.includes('0'))) {
        value = 10;
      } else if (cardCode.includes('A')) {
        value = this.checkAce();
      } else {
        value = parseInt(cardCode);
      }
      return value;
    }

    checkAce = () => {
      if (this.value + 11 > 21) {
        return 1;
      } else {
        return 11;
      }
    }
  }

  class Hand {
    constructor(player, bet = null) {
      this.cards = [];
      this.player = player;
      this.value = 0;
      // this.split = false,
      // this.doubleDown = false,
      this.betAmount = bet;
      this.ended = false;
    }

    drawnCard = () => {
      let newCard = drawCard();
      this.cards.push(newCard)
      // this.value = this.value += newCard.value;
      console.log(this.cards);
      // this.handEnded();
    }

    addCard = (card) => {
      this.cards.push(card);
      this.value = this.value += card.value;
    }

    handEnded = () => {
      if (this.ended === false && this.value <= 21) {
        this.ended = false;
      } else {
        this.ended = true;
      }
      console.log('Hand over! value: ' + this.value);
      console.log('Cards in hand: ' + this.cards);
      return this.ended;
    }

    stand = () => {
      this.ended = true;
    }

    hit = () => {
      this.drawnCard();
      this.handEnded();
    }
  }

  class Gameplay {
    constructor(minBet, maxBet) {
      this.makePlayers();
    }

    makePlayers() {
      this.player = new Player(null);
      setPlayer(this.player);
      this.dealer = new Player(null, false);
      setDealer(this.dealer);
    }

    startHand = (bet = null) => {
      this.player.currentHand = new Hand(this.player, bet);
      this.dealer.currentHand = new Hand(this.dealer);
      this.player.currentHand.drawnCard();
      this.dealer.currentHand.drawnCard();
      this.player.currentHand.drawnCard();
      this.dealer.currentHand.drawnCard();
      console.log('Hand started');
    }

    //to play out the dealer's turn after the player's turn(s)
    dealerTurn = () => {
      let dealerHand = this.dealer.hands[0].value;
      while (dealerHand < 17) {
        this.dealer.currentHand.hit();
        dealerHand = this.dealer.currentHand.value;
      }
      this.dealer.currentHand.ended = true;
      console.log(this.dealer.currentHand.cards);
    }



  }


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className='deckButtons'>
      <button onClick={() => {
          fetchNewDeck();
          setGame(new Gameplay(1, null, null));
        }}>Start New Game</button>
        <div>{deckID}</div>
        <img className='cardImage' src={currentCard ? currentCard.imageURL: ''} alt={currentCard ? currentCard.code : 'None'} />
        <div>Card: {currentCard ? currentCard.code : 'None'}</div>
        <button onClick={()=>{
          if (game) {
            game.startHand();
            console.log(game.player.currentHand);
            console.log(game.dealer.currentHand);
          }
          }}>Start Hand</button>
      </div>
      <div className='dealer'> 
        <button onClick={game ? game.dealerTurn:null}>Dealer Turn</button>
      </div>
      <div className='player'>
        <button onClick={()=> {
          if (player && player.currentHand) {
            player.currentHand.hit();
          }
        }}>HIT</button>
        <button onClick={()=> {
          if (player && player.currentHand) {
            player.currentHand.stand();
          }
        }}>STAND</button>
{/* player ? player.currentHand.stand: null */}
      </div>
      <div className='router'>
      {/* <Routes>
        <Route path="/" element={<Gameboard />} />
        <Route path="/rules" element={<Rules />} />
      </Routes> */}

      </div>
    </div>
  );
}

export default App;
