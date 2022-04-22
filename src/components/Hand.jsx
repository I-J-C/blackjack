import { useState } from "react";
// import Card from "./Card";

const drawURL1 = 'https://deckofcardsapi.com/api/deck/'
const drawURL2 = '/draw/?count='

const Hand = (props) => {
    let cards = [];
    let count = 0;
    let cardDrawn;
    // let cardDrawn = { code: response.cards[0].code,
    //                   image: response.cards[0].image,
    //                   value: cardValue(response.cards[0].code)};
    let cardsDrawn = [];
    let dealerCardsDrawn = [];

    const [currentCard, setCurrentCard] = useState();

    const cardValue = (cardCode) => {
      let value = null;
      if ((cardCode) && (cardCode.includes('K') || cardCode.includes('Q') || cardCode.includes('J') || cardCode.includes('0'))) {
        value = 10;
      } else if (cardCode.includes('A')) {
        if (count + 11 > 21) {
            value = 1;
        }else{
            value = 11;
        }
      } else {
        value = parseInt(cardCode);
      }
      return value;
    }

    const drawCard = () => {
      // if(remaining && remaining < 25) {
      //   props.fetchNewDeck();
      // }
        const url = `${drawURL1}${props.deckID}${drawURL2}1`;
        fetch(url)
          .then((response) => response.json())
          .then((response) => {
            // console.log(response.cards);
            // format: response.cards is array with all drawn cards
            // response.cards[i].{code, image(pngURL), images([pngURL, svgURL]), suit, value, remaining, success}
            // let newCard = new Card(response.cards[0].code, response.cards[0].image);
            
            let newCard ={
                code: response.cards[0].code,
                image: response.cards[0].image,
                value: cardValue(response.cards[0].code),
            }
            // console.log(newCard);
            cardDrawn = newCard;
            // console.log(cardDrawn);
            cardsDrawn.push(newCard);
            // setCurrentCard(newCard);
            
          })
          .catch((err) => {
            console.error(err);
          });
      }


    if(props.deckID){
        if(props.dealer) {
            drawCard();
            for (let i=0; i<cardsDrawn.length; i++) {
              cards.push(<div className="card">
                    <img src={cardsDrawn[i].image} alt={''} />
                  </div>);
            }
        }else if(props.player) {
            for (let i=0; i < props.numCards; i++) {
                drawCard();
            }
            for (let i=0; i<cardsDrawn.length; i++) {
              cards.push(<div className="card">
                    <img src={cardsDrawn[i].image} alt={''} />
                  </div>);
            }
        }
        // for (let i=0; i<cardsDrawn.length; i++) {
        //   cards.push(<div className="card">
        //         <img src={cardsDrawn[i].image} alt={''} />
        //       </div>);
        // }

        console.log(cardsDrawn);
    }

  

    

    return (
        <div className="handCard">
            {props.dealer?"DEALER":"YOU"}
            <div className="hand">
            {cards}
            {/* {console.log(cards)} */}
            </div>
        </div>
    )
}

export default Hand;