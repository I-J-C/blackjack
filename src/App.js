import { useEffect, useState } from 'react';
import './App.css';

const deckURL = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count='
let deckCount = 1;
const drawURL1 = 'http://deckofcardsapi.com/api/deck/'
const drawURL2 = '/draw/?count='
let drawCount = 1;
function App() {

  const [deckID, setDeckID] = useState();
  const [currentCard, setCurrentCard] = useState();

  const fetchNewDeck = () => {
    const url = `${deckURL}${deckCount}`;
    fetch(url)
			.then((response) => response.json())
			.then((response) => {
				// console.log(response);
        const newDeckID = response.deck_id;
        console.log(newDeckID);
        setDeckID(newDeckID);
        // console.log(response.deck_id);
			})
			.catch((err) => {
				console.error(err);
			});
  }

  const drawCards = (cards) => {
    const url = `${drawURL1}${deckID}${drawURL2}${cards}`;
    fetch(url)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
        // console.log(response.deck_id);
			})
			.catch((err) => {
				console.error(err);
			});
  }



  // useEffect(()=>{
  //   fetchNewDeck();
  // }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchNewDeck}>New Deck</button>
        <div>{deckID}</div>
        <button onClick={()=>{drawCards(drawCount)}}>Draw Card</button>
        <div>{currentCard}</div>
      </header>
      <div className='router'></div>
    </div>
  );
}

export default App;
