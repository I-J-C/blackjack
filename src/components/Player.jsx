import Hand from "./Hand";

const Player = (props) => {
    return(
        <div>
            YOU
            <Hand cards={props.player}/>
        </div>
    )
}

export default Player;