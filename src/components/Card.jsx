
const Card = (props) => {
    const image = props.card.image;
    const cardBack = "https://deckofcardsapi.com/static/img/back.png"

    return(
        <div className={`card ${props.class}`} >
            <img src={props.card.faceDown ? cardBack : image} alt={props.card.faceDown ? "Back of Playing Card" : props.card.code}  />
        </div>
    )
}

export default Card;