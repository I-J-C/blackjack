import Card from "./Card";

const Hand = (props) => {


    return (
        <div className="handCard">
            <div className="hand">
            {props.cards?props.cards.map((card, index) => (<Card card={card} key={index} class={index!==0?"extra-cards":""} />)):""}
            </div>
        </div>
    )
}

export default Hand;