import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import Gameboard from './components/Gameboard';
import Rules from './components/Rules';

const deckURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count='
let deckCount = 1;
const drawURL1 = 'https://deckofcardsapi.com/api/deck/'
const drawURL2 = '/draw/?count='

const App = () =>{

  const axios = require('axios');

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     dealer: null,
  //     player: null,
  //     gameOver: false,
  //     deckID: null
  //   }
  // }

  const [deckID, setDeckID] = useState();
  const [deck, setDeck] = useState([]);

  // const [playerHands, setPlayerHands] = useState();



  // const [currentCardImage, setCurrentCardImage] = useState();
  // const [currentCard, setCurrentCard] = useState();
  // const [drawnCard, setDrawnCard] = useState();
  // const [game, setGame] = useState();
  // const [player, setPlayer] = useState();
  // const [dealer, setDealer] = useState();

  const fetchNewDeck = () => {
    let url1 = `${deckURL}${deckCount}`;
    axios.get(url1)
    .then(function (response) {
    // console.log(response.data);
    setDeckID(response.data.deck_id);
    })
    .catch(function (error) {
      // handle error
    console.log(error);
    })
    .then(function () {
    // always executed
    });
  }


  const getDeck= () => {
    // let cardArray = [];
    let url2 = `${drawURL1}${deckID}${drawURL2}52`;

    axios.get(url2)
    .then(function (response) {
    if (response.data.cards.length === 0) {
      return;
    }
    setDeck(oldDeck => response.data.cards);
    console.log('deck:', deck);
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    // always executed
    });
  }


  useEffect(
    () => {
      //add clause about remaining to add new deck
      if(!deckID) {
          fetchNewDeck();
      }
      if(deckID) {
        getDeck();
        // console.log("deck", deck);
        }
    }, [deckID, deck, fetchNewDeck]);


    


  //Blackjack functions here

  // class Player {
  //   constructor(bet = null, dealer = false) {
  //     this.currentHand = null;
  //     this.hands = [this.currentHand ? this.currentHand : null];
  //     dealer ? this.dealer = true : this.dealer = false;
  //   }
  // }




  // class Card {
  //   constructor(code, imageURL) {
  //     this.code = code;
  //     this.imageURL = imageURL;
  //     this.value = this.cardValue(this.code);
  //   }

  //   cardValue = (cardCode) => {
  //     let value = null;
  //     if ((cardCode) && (cardCode.includes('K') || cardCode.includes('Q') || cardCode.includes('J') || cardCode.includes('0'))) {
  //       value = 10;
  //     } else if (cardCode.includes('A')) {
  //       value = this.checkAce();
  //     } else {
  //       value = parseInt(cardCode);
  //     }
  //     return value;
  //   }

  //   checkAce = () => {
  //     if (this.value + 11 > 21) {
  //       return 1;
  //     } else {
  //       return 11;
  //     }
  //   }
  // }

  // class Hand {
  //   constructor(player, bet = null) {
  //     this.cards = [];
  //     this.player = player;
  //     this.value = 0;
  //     // this.split = false,
  //     // this.doubleDown = false,
  //     this.betAmount = bet;
  //     this.ended = false;
  //   }

    // drawnCard = () => {
    //   let newCard = drawCard();
    //   this.cards.push(newCard)
    //   // this.value = this.value += newCard.value;
    //   console.log(this.cards);
    //   // this.handEnded();
    // }

    // addCard = (card) => {
    //   this.cards.push(card);
    //   this.value = this.value += card.value;
    // }

    // handEnded = () => {
  //     if (this.ended === false && this.value <= 21) {
  //       this.ended = false;
  //     } else {
  //       this.ended = true;
  //     }
  //     console.log('Hand over! value: ' + this.value);
  //     console.log('Cards in hand: ' + this.cards);
  //     return this.ended;
  //   }

  //   stand = () => {
  //     this.ended = true;
  //   }

  //   hit = () => {
  //     this.drawnCard();
  //     this.handEnded();
  //   }
  // }

  // class Gameplay {
  //   constructor(minBet, maxBet) {
  //     this.makePlayers();
  //   }

    // makePlayers() {
    //   this.player = new Player(null);
    //   setPlayer(this.player);
    //   this.dealer = new Player(null, false);
    //   setDealer(this.dealer);
    // }

    // startHand = (bet = null) => {
    //   this.player.currentHand = new Hand(this.player, bet);
    //   this.dealer.currentHand = new Hand(this.dealer);
    //   this.player.currentHand.drawnCard();
    //   this.dealer.currentHand.drawnCard();
    //   this.player.currentHand.drawnCard();
    //   this.dealer.currentHand.drawnCard();
    //   console.log('Hand started');
    // }

    //to play out the dealer's turn after the player's turn(s)
    // dealerTurn = () => {
    //   let dealerHand = this.dealer.hands[0].value;
    //   while (dealerHand < 17) {
    //     this.dealer.currentHand.hit();
    //     dealerHand = this.dealer.currentHand.value;
    //   }
    //   this.dealer.currentHand.ended = true;
    //   console.log(this.dealer.currentHand.cards);
    // }



  // }

  return (
    <div className="App">
      <header className="App-header">
        <Link to={'/'}>GAME</Link>
        <Link to={'/rules'}>RULES</Link>
      </header>
      <div className='main-content'>
      <Routes>
        {/* <Route path="/" element={<Gameboard  deckID={deckID} setDeckID={setDeckID}  fetchNewDeck={fetchNewDeck}/>} /> */}
        <Route path="/" element={<Gameboard  deckID={deckID} deck={deck} setDeck={setDeck} getDeck={getDeck}/>} />
        <Route path="/rules" element={<Rules />} />
      </Routes> 
      </div>
    </div>
  );
}

export default App;
