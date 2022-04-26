import Hand from "./Hand";

const DealerHand = (props) => {

    return(
        <div>
            <Hand cards={props.dealer} />
        </div>
    )
}

export default DealerHand;