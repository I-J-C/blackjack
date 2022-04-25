import Card from "./Card";

const drawURL1 = 'https://deckofcardsapi.com/api/deck/'
const drawURL2 = '/draw/?count='

const Hand = (props) => {


    // const startHand = () => {
    //     if(props.dealer) {
    //         drawCard(1);
    //         debugger;
    //         for (let i=0; i<cardsDrawn.length; i++) {
    //           // cards.push(<div className="card">
    //           //       <img src={cardsDrawn[i].image} alt={''} />
    //           //     </div>);
    //         }
    //     }else if(props.player) {
    //         drawCard(props.numCards);
    //         debugger;
    //         //for (let i=0; i < props.numCards; i++) {
              
    //         //}
    //         for (let i=0; i<cardsDrawn.length; i++) {
    //           // cards.push(<div className="card">
    //           //       <img src={cardsDrawn[i].image} alt={''} />
    //           //     </div>);
    //           // cards.push(i);
    //         }
    //     }
    //     // for (let i=0; i<cardsDrawn.length; i++) {
    //     //   cards.push(<div className="card">
    //     //         <img src={cardsDrawn[i].image} alt={''} />
    //     //       </div>);
    //     // }

    //     console.log(cardsDrawn);
    // }


  

    

    return (
        <div className="handCard">
            <div className="hand">
            {props.cards?props.cards.map((card, index) => (<Card card={card} key={index} />)):""}
            </div>
        </div>
    )
}

export default Hand;