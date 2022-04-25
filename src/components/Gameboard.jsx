import { useEffect, useState, useRef } from "react";
import DealerHand from "./DealerHand";
import Player from "./Player";

const drawURL1 = 'https://deckofcardsapi.com/api/deck/';
const shuffle = '/shuffle/';

const Gameboard = (props) => {
    const [count, setCount] = useState(0);
    const [dealer, setDealer] = useState([]);
    const [player, setPlayer] = useState([]);
    const [playerValue, setPlayerValue] = useState(0);
    const [dealerValue, setDealerValue] = useState(0);
    const [handOver, setHandover] = useState();
    const [playerStand, setPlayerStand] = useState(false);
    const [message, setMessage] = useState('');
    let nextCard = count;
    let drawnCards;

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
    }
    
    const drawCards = (amount) => {
        let cards = [];
        for(let i=0; i<amount; i++){
        cards.push(props.deck[0][nextCard+i]);
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
        let playerDealerValue = null;
        if ((cardCode) && (cardCode.includes('K') || cardCode.includes('Q') || cardCode.includes('J') || cardCode.includes('0'))) {
            value = 10;
        } else if (cardCode.includes('A')) {
            if (playerDealer === player) {
                playerDealerValue = playerValue;
            } else {
                playerDealerValue = dealerValue;
            }
            if (playerDealerValue + 11 > 21) {
                value = 1;
            } else {
                value = 11;
          }
        } else {
          value = parseInt(cardCode);
        }
        return value;
      }

    useInterval(() => {
        if(playerStand) {
            hit(dealer);
        }
    }, dealerValue < 17 ? 1000: null);

      useEffect(
        () => {
          //add clause about remaining to add new deck
              nextCard = count;
              if (dealerValue >= 17) {
                  setMessage(message => "Dealer turn over!")
              }
              if (playerValue > 21) {
                  setHandover(oldValue => true);
                  setMessage(message => "Player Bust!");
              } else if (dealerValue > 21) {
                  setHandover(oldValue => true);
                  setMessage(message => "Dealer Bust!");
              }
          }, [playerValue, dealerValue]);

    return (
        <div>
            <button onClick={()=>{
                startHand();
                }}>Start Hand</button> 

            <div className="actions">
                <button className="hitButton" onClick={() => {
                    hit(player);
                }}>Hit</button>
                <button className="standButton" onClick={()=>{
                    setPlayerStand(oldValue => true);
                }}>Stand</button>
            </div>
            <div className="message">{message}</div>
            <div className="dealerBoard">
                <div className="dealer-value">Dealer Value: {dealerValue}</div>
                <DealerHand dealer={dealer}/>
            </div>
            <div className="playerBoard">
            <div>Player Value: {playerValue}</div>
                <Player player={player}/>
            </div>
            
        </div>
    )
}

export default Gameboard;