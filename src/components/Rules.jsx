

const Rules = () => {
    return (
        <div className="rules">
            <h1 className="rules-title">Rules</h1>
            <h2>Ruleset</h2>
            <ul>
                <li>Dealer stands on soft 17</li>
                <li>No split</li>
                <li>No double down</li>
            </ul>
            <h2>Objective</h2>
            <p>Beat The Dealer</p>
            <h2>Ways to beat the dealer</h2>
            <ul>
                <li>By drawing a hand value that is higher than the dealer hand value</li>
                <li>By the dealer drawing a hand value that goes over 21</li>
                <li>By drawing a hand value of 21 on your first two cards, when the dealer does not</li>
            </ul>
            <h2>How do you lose to the dealer?</h2>
            <ul>
                <li>Your hand value exceeds 21</li>
                <li>The dealer hand has a greater value than yours at the end of a round.</li>
            </ul>
        </div>
    )
}

export default Rules