
const Card = (props) => {
    const image = props.card.image;

    return(
        <div className={`card ${props.class}`} >
            <img src={image} alt={props.card.code}  />
        </div>
    )
}

export default Card;