import { useEffect } from "react";


const Card = (props) => {
    let image = null;
    useEffect(
        () => {
            console.log(props.card);
            
            props.card?image = props.card.image:image="";

        }, [props.card]);

    return(
        <div className="card">
            {/* Card here */}
            {console.log(props.card)}
            <img src={props.card?image:"null"} />
        </div>
    )
}

export default Card;