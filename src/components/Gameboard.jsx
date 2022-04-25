import { useEffect, useState } from "react";
import DealerHand from "./DealerHand";
import Player from "./Player";

const drawURL1 = 'https://deckofcardsapi.com/api/deck/';
const shuffle = '/shuffle/';

const Gameboard = (props) => {

    const [count, setCount] = useState(0);
    const [dealer, setDealer] = useState();
    const [player, setPlayer] = useState([]);
    const [playerValue, setPlayerValue] = useState(0);
    const [dealerValue, setDealerValue] = useState(0);
    const [handOver, setHandover] = useState();
    const [message, setMessage] = useState('');
    let drawnCards;
    let checkValue = true;

    const startHand = () => {
        //start the game with 1 card for player then 1 for dealer then 1 for player
    }

    const shuffleDeck = () => {
        //change props.deck to contain newly shuffled deck to draw from
    }
    
    const drawCards = (amount) => {
        let cards = [];
        for(let i=0; i<amount; i++){
        cards.push(props.deck[0][count+i]);
        }
        console.log("cards",cards);
        setCount(count => count + 1);
        console.log("new Count:", count);
        return cards;
    }

    const hit = (playerDealer) => {
        let current;
        drawnCards = drawCards(1);
        drawnCards.forEach(element => {
            if(playerDealer === player) {
                current = player;
                setPlayer(player => [...player, element]);
                setPlayerValue(playerValue => playerValue + cardValue(element.code, player));
            }else if (playerDealer === dealer) {
                current = dealer;
                setDealer(dealer => [...dealer, element]);
                setDealerValue(dealerValue => dealerValue + cardValue(element.code, dealer));
            }
        });
    }

    // const validValue = (playerDealer) => {
    //     let value;
    //     if (playerDealer === player) {
    //         value = playerValue;
    //     }else{
    //         value = dealerValue;
    //     }
    //     console.log("value: ",value);
    // }

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

      useEffect(
        () => {
          //add clause about remaining to add new deck
            if (playerValue > 21) {
                setHandover(oldValue => true);
                setMessage(message => "Player Bust!");
            }else if (dealerValue > 21) {
                setHandover(oldValue => true);
                setMessage(message => "Dealer Bust!");
            }
        }, [playerValue, dealerValue]);

    return (
        <div>
            <button>Start Hand</button> 

            <div className="actions">
                <button className="hitButton" onClick={() => {
                    hit(player);
                }}>Hit</button>
                <button className="standButton" onClick={()=>{

                }}>Stand</button>
            </div>
            <div className="message">Player Value: {playerValue}<div>{message}</div></div>
            <div className="dealerBoard">
                <DealerHand dealer={dealer}/>
            </div>
            <div className="playerBoard">
                <Player player={player}/>
            </div>
                
        </div>
    )
}

export default Gameboard;