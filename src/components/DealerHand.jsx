import Hand from "./Hand";

const DealerHand = (props) => {
    return(
        <div>
            <Hand deckID={props.deckID} setDeckID={props.setDeckID} dealer={true} fetchNewDeck={props.fetchNewDeck} />
        </div>
    )
}

export default DealerHand;