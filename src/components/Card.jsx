import { useEffect } from "react";


const Card = (props) => {
    const image = props.card.image;

    return(
        <div className="card">
            <img src={image} alt={props.card.code} />
        </div>
    )
}

export default Card;