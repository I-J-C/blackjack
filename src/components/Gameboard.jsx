import DealerHand from "./DealerHand";
import Player from "./Player";

const Gameboard = (props) => {
    return (
        <div>
            {/* {props.deckID} */}
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