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

    function drawCard(cardCount) {
      // if(remaining && remaining < 25) {
      //   props.fetchNewDeck();
      // }
        const url = `${drawURL1}${props.deckID}${drawURL2}${cardCount}`;
        fetch(url)
          .then((response) => response.json())
          .then((response) => {
            // console.log(response.cards);
            // format: response.cards is array with all drawn cards
            // response.cards[i].{code, image(pngURL), images([pngURL, svgURL]), suit, value, remaining, success}
            // let newCard = new Card(response.cards[0].code, response.cards[0].image);
            
            let foundCards = response.cards;
            foundCards.forEach((element)=>{
              console.log(element);
              let newCard = {
                code: element.code,
                image: element.image,
                value: cardValue(element.code),
              }
              cardsDrawn.push(newCard);
            });
            // let newCard ={
            //     code: response.cards[0].code,
            //     image: response.cards[0].image,
            //     value: cardValue(response.cards[0].code),
            // }
            // console.log(newCard);
            //cardDrawn = newCard;
            // console.log(cardDrawn);
            //cardsDrawn.push(newCard);
            // setCurrentCard(newCard);
            //cards.push("<div className=\"card\"><img src=" + response.cards[0].image + " alt=\"\" /></div>");
          })
          .catch((err) => {
            console.error(err);
          });
      }

      const hit = () => {
        drawCard(1);
        
      }


    const startHand = () => {
        if(props.dealer) {
            drawCard(1);
            debugger;
            for (let i=0; i<cardsDrawn.length; i++) {
              // cards.push(<div className="card">
              //       <img src={cardsDrawn[i].image} alt={''} />
              //     </div>);
            }
        }else if(props.player) {
            drawCard(props.numCards);
            debugger;
            //for (let i=0; i < props.numCards; i++) {
              
            //}
            for (let i=0; i<cardsDrawn.length; i++) {
              // cards.push(<div className="card">
              //       <img src={cardsDrawn[i].image} alt={''} />
              //     </div>);
              // cards.push(i);
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
            {cardsDrawn.map(card => (<div><img src={card.image}></img></div>))}
            </div>
        </div>
    )
}

export default Hand;