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

  const [deckID, setDeckID] = useState();
  const [deck, setDeck] = useState([]);

  const fetchNewDeck = () => {
    let url1 = `${deckURL}${deckCount}`;
    axios.get(url1)
    .then(function (response) {
    setDeckID(response.data.deck_id);
    })
    .catch(function (error) {
      // handle error
    console.log(error);
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
    });
  }


  useEffect(
    () => {
      if(!deckID) {
          fetchNewDeck();
      }
      if(deckID) {
        getDeck();
        }
    }, [deckID, deck, fetchNewDeck]);


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
