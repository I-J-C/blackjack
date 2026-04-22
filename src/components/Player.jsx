import Hand from "./Hand";

const Player = ({ player }) => {
    const hands = Array.isArray(player[0]) ? player : [player];

    return (
        <div>
            {hands.map((hand, index) => (
                <Hand key={index} cards={hand} />
            ))}
        </div>
    );
};

export default Player;