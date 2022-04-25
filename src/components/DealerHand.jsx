import Hand from "./Hand";

const drawURL1 = 'https://deckofcardsapi.com/api/deck/'
const drawURL2 = '/draw/?count='

const data = [
    {code: '0H', image: 'https://deckofcardsapi.com/static/img/OH.png', value: 10},
]

const DealerHand = (props) => {
    let cardImage = "https://deckofcardsapi.com/static/img/9H.png";
    let handTotal = 9;
    let cards = [ {code: '9H', image: 'https://deckofcardsapi.com/static/img/9H.png', value: 9,}];

    const dealerTurn = () => {
        handTotal += data[0].value;
        console.log('Dealer turn ended! value: ' + handTotal);
    }

    return(
        <div>
            DEALER
            <Hand cards={props.dealer} />
            {/* <div className="dealer-title">Dealer</div>
            <button className="dealer-turn" onClick={dealerTurn}>Dealer Turn</button>
            <div className="dealerCard">
                <img src={cardImage} alt='' />
            </div> */}
        </div>
    )
}

export default DealerHand;