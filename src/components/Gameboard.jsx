import { useState } from "react";
import DealerHand from "./DealerHand";
import Player from "./Player";

const Gameboard = (props) => {
    const [deck, setDeck] = useState();
    const [dealer, setDealer] = useState();

    // const startHand = () => {
    //     if(props.dealer) {
    //         drawCard(1);
    //         debugger;
    //         for (let i=0; i<cardsDrawn.length; i++) {
    //           // cards.push(<div className="card">
    //           //       <img src={cardsDrawn[i].image} alt={''} />
    //           //     </div>);
    //         }
    //     }else if(props.player) {
    //         drawCard(props.numCards);
    //         debugger;
    //         //for (let i=0; i < props.numCards; i++) {
              
    //         //}
    //         for (let i=0; i<cardsDrawn.length; i++) {
    //           // cards.push(<div className="card">
    //           //       <img src={cardsDrawn[i].image} alt={''} />
    //           //     </div>);
    //           // cards.push(i);
    //         }
    //     }
    //     // for (let i=0; i<cardsDrawn.length; i++) {
    //     //   cards.push(<div className="card">
    //     //         <img src={cardsDrawn[i].image} alt={''} />
    //     //       </div>);
    //     // }

    //     console.log(cardsDrawn);
    // }

    return (
        <div>
            {/* {props.deckID} */}
            {/* <button onClick={startGame}>Start</button> */}
            <button>Start Game</button> 

            <div className="actions">
                <button className="hitButton">Hit</button>
                <button className="standButton">Stand</button>
            </div>
            <div className="dealerBoard">
                <DealerHand deckID={props.deckID} fetchNewDeck={props.fetchNewDeck} />
            </div>
            <div className="playerBoard">
                <Player deckID={props.deckID} fetchNewDeck={props.fetchNewDeck} />
            </div>
        </div>
    )
}

export default Gameboard;