import Hand from "./Hand";

const Player = (props) => {
    return(
        <div>
            <Hand cards={props.player}/>
        </div>
    )
}

export default Player;