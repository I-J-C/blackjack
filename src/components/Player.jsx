import Hand from "./Hand";

const Player = (props) => {


    return(
        <div>
            {/* hit button here */}
            {/* stand button here */}
            <Hand deckID={props.deckID} player={true} numCards={2} fetchNewDeck={props.fetchNewDeck} setDeckID={props.setDeckID} />
        </div>
    )
}

export default Player;