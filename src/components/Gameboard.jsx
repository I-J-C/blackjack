import { useEffect, useState, useRef } from "react";
import DealerHand from "./DealerHand";
import Player from "./Player";

const drawURL1 = 'https://deckofcardsapi.com/api/deck/';
const shuffle = '/shuffle/';

const Gameboard = (props) => {
    const axios = require('axios');
    const [count, setCount] = useState(0);
    
    const [player, setPlayer] = useState([]);
    const [playerAceCount, setPlayerAceCount] = useState(0);
    const [playerValue, setPlayerValue] = useState(0);
    const [playerStand, setPlayerStand] = useState(false);
    const [dealer, setDealer] = useState([]);
    const [dealerValue, setDealerValue] = useState(0);
    const [dealerAceCount, setDealerAceCount] = useState(0);
    const [dealerAceAdded, setDealerAceAdded] = useState(0);
    const [handOver, setHandOver] = useState();
    const [message, setMessage] = useState('');
    const [handActive, setHandActive] = useState(false);
    let nextCard = count;
    let drawnCards;
    let dealerAce = false;
    let dealerLocalValue;

    //Sourced useInterval hook from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    //literally gives permission to copy-paste in document for use.
    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

    const startHand = () => {
        //start the game with 1 card for player then 1 for dealer then 1 for player
        hit(player);
        setTimeout(() => {
            hit(dealer);
        }, 1000);
        setTimeout(() => {
            hit(player);
        }, 2000);
    }

    const shuffleDeck = () => {
        //change props.deck to contain newly shuffled deck to draw from
        let url2 = `${drawURL1}${props.deckID}${shuffle}`;

        axios.get(url2)
            .then(function (response) {
                console.log(response.data);
                props.getDeck();
                setCount(value => 0);
                console.log("Deck Shuffled");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    
    const drawCards = (amount) => {
        let cards = [];
        for(let i=0; i<amount; i++){
        cards.push(props.deck[nextCard+i]);
        nextCard +=1;
        }
        setCount(count => count + 1);
        return cards;
    }

    const hit = (playerDealer) => {
        drawnCards = drawCards(1);
        drawnCards.forEach(element => {
            if(playerDealer === player) {
                setPlayer(player => [...player, element]);
                setPlayerValue(playerValue => playerValue + cardValue(element.code, player));
            }else if (playerDealer === dealer) {
                setDealer(dealer => [...dealer, element]);
                setDealerValue(dealerValue => dealerValue + cardValue(element.code, dealer));
            }
        });
    }

    const cardValue = (cardCode, playerDealer) => {
        let value = null;
        if ((cardCode) && (cardCode.includes('K') || cardCode.includes('Q') || cardCode.includes('J') || cardCode.includes('0'))) {
            value = 10;
        } else if (cardCode.includes('A')) {
            value = 1;
            if (playerDealer === player) {
                setPlayerAceCount(count => count + 1);
            } else {
                debugger;
                setDealerAceCount(count => count + 1);
                if (dealerValue + 10 <= 21 || dealer.length === 0){
                    debugger;
                    setDealerAceAdded(value => true);
                    value += 10;
                }
            }
        } else {
          value = parseInt(cardCode);
        }
        return value;
      }

      const aceIncrease = () => {
        if (dealerAceCount !== 0) {
            let oldValue = dealerValue;
            if (oldValue + 10 >= 17 && oldValue + 10 <= 21) {
                setDealerValue(value => value + 10);
                setDealerAceAdded(value => true);
                return true;
            }
        }
        return false;
    }

    const resetHand = () => {
        setPlayer(player => []);
        setPlayerValue(value => 0);
        setPlayerStand(value => false);
        setPlayerAceCount(value => 0);
        setDealer(dealer => []);
        setDealerValue(value => 0);
        setDealerAceAdded(value => false);
        setDealerAceCount(value => 0);
        setMessage(value => "");
        setHandOver(value => false);
    }

    useInterval(() => {
        if(playerStand) {
            hit(dealer);
            dealerAce = aceIncrease();
            if (dealerValue > 21 && dealerAce && dealerValue - 10 < 21) {
                setDealerValue(value => value - 10);
                setDealerAceAdded(value => false);
                debugger;
            }
        }
    }, (dealerValue >= 17 || dealerAce === true) ? null : 1000);


    

      useEffect(
        () => {
              nextCard = count;
              if (dealerValue >= 17 || dealerAceAdded === true) {
                  setMessage(message => "Dealer turn over!")
                  setHandOver(oldValue => true);
                //   if (dealerAce)
                //  console.log('Ace added: ' , dealerAceAdded);
              }
              if (playerValue > 21) {
                  setHandOver(oldValue => true);
                  setMessage(message => "Player Bust!");
              } else if (dealerValue > 21) {
                  if (dealerAceAdded && dealerValue - 10 < 21) {
                      setDealerValue(value => value - 10);
                  }else{
                  setHandOver(oldValue => true);
                  setMessage(message => "Dealer Bust!");
                  }
              }
              if (handOver === true) {
                  setHandActive(oldValue => false);
                //settle bets
              }

          }, [playerValue, dealerValue, dealerAceAdded, handOver]);

    return (
        <div>
            <button disabled={handActive} onClick={()=>{
                if (props.deck.length - count <= 15) {
                    shuffleDeck();
                }
                setHandActive(oldValue => true);
                resetHand();
                startHand();
                }}>Start Hand</button> 
                {/* <button onClick={shuffleDeck} >Shuffle Cards</button> */}
            
            <div className="message">{message}</div>
            <div className="dealerBoard">
                <div className="dealer-value">Dealer Value: {dealerValue}{(dealerAceCount !== 0 && dealerValue+10 <= 17)? `(${dealerValue+10})`:""}</div>
                <DealerHand dealer={dealer}/>
            </div>
            <div className="playerBoard">
            
            <div>Player Value: {playerValue}{(playerAceCount !== 0 && playerValue+10 <= 21)? `(${playerValue+10})`:""}</div>
            <div className="actions">
                <button disabled={playerStand||handOver} className="hitButton" onClick={() => {
                    hit(player);
                }}>Hit</button>
                <button disabled={playerStand||handOver} className="standButton" onClick={()=>{
                    setPlayerStand(oldValue => true);
                    if (playerAceCount !== 0) {
                        if (playerValue + 10 <= 21) {
                            setPlayerValue(value => value + 10);
                        }
                    }
                }}>Stand</button>
            </div>
                <Player player={player}/>
            </div>
            
        </div>
    )
}

export default Gameboard;