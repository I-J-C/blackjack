import React, { useEffect, useState, useRef } from "react";
import DealerHand from "./DealerHand";
import Player from "./Player";

const drawURL1 = 'https://deckofcardsapi.com/api/deck/';
const shuffle = '/shuffle/';

const Gameboard = (props) => {
    const axios = require('axios');
    const [count, setCount] = useState(0);

    const [player, setPlayer] = useState([]);
    const [playerAceCount, setPlayerAceCount] = useState(0);
    const [playerValue, setPlayerValue] = useState(0);
    const [playerStand, setPlayerStand] = useState(false);
    const [dealer, setDealer] = useState([]);
    const [dealerValue, setDealerValue] = useState(0);
    const [dealerAceCount, setDealerAceCount] = useState(0);
    const [dealerAceAdded, setDealerAceAdded] = useState(0);
    const [handOver, setHandOver] = useState(false);
    const [message, setMessage] = useState('');
    const [handActive, setHandActive] = useState(false);
    const [dealing, setDealing] = useState(false);
    const [betActive, setBetActive] = useState(false);
    const [bet, setBet] = useState(0);
    const [minBet, setMinBet] = useState(5);
    const [wallet, setWallet] = useState(100);
    const inputRef = useRef(null);
    let betAmount = 0;
    let nextCard = count;
    let drawnCards;
    let dealerAce = false;
    let dealerLength = 0;
    let dealerTotal = 0;
    let winner;

    //Sourced useInterval hook from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    //literally gives permission to copy-paste in document for use.
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    const startHand = () => {
        hit(player);
        setTimeout(() => {
            hit(dealer);
        }, 1000);
        setTimeout(() => {
            hit(player);
            setDealing(value => false);
        }, 2000);
    }

    const checkBlackJack = () => {
            if (player.length <= 2 &&  playerAceCount !== 0 && playerValue === 11) {
                setPlayerValue(value => 21);
                setHandOver(value => true);
                setPlayerStand(value => true);
                setMessage(value => "BlackJack!");
            }
    }

    const shuffleDeck = () => {
        let url2 = `${drawURL1}${props.deckID}${shuffle}`;

        axios.get(url2)
            .then(function (response) {
                console.log(response.data);
                props.getDeck();
                setCount(value => 0);
                console.log("Deck Shuffled");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const drawCards = (amount) => {
        let cards = [];
        for (let i = 0; i < amount; i++) {
            cards.push(props.deck[nextCard + i]);
            nextCard += 1;
        }
        setCount(count => count + 1);
        return cards;
    }

    const hit = (playerDealer) => {
        drawnCards = drawCards(1);
        drawnCards.forEach(element => {
            if (playerDealer === player) {
                setPlayer(player => [...player, element]);
                setPlayerValue(playerValue => playerValue + cardValue(element.code, player));
            } else if (playerDealer === dealer) {
                dealerLength += 1;
                dealerTotal += cardValue(element.code);
                setDealer(dealer => [...dealer, element]);
                setDealerValue(dealerValue => dealerValue + cardValue(element.code, dealer));
            }
        });
    }

    const cardValue = (cardCode, playerDealer) => {
        let value = null;
        if ((cardCode) && (cardCode.includes('K') || cardCode.includes('Q') || cardCode.includes('J') || cardCode.includes('0'))) {
            value = 10;
        } else if (cardCode.includes('A')) {
            value = 1;
            if (playerDealer === player) {
                setPlayerAceCount(count => count + 1);
            } else {
                setDealerAceCount(count => count + 1);
                if (dealerTotal + 10 <= 21 || dealerLength === 0) {
                    dealerAce = true;
                    setDealerAceAdded(value => true);
                    value += 10;
                }
            }
        } else {
            value = parseInt(cardCode);
        }
        return value;
    }

    const aceIncrease = () => {
        if (dealerAceCount !== 0) {
            let oldValue = dealerTotal;
            if (oldValue + 10 >= 17 && oldValue + 10 <= 21 && oldValue === dealerValue) {
                setDealerValue(value => value + 10);
                setDealerAceAdded(value => true);
                return true;
            }
        }
        return false;
    }

    const resetHand = () => {
        dealerAce = false;
        dealerLength = 0;
        dealerTotal = 0;
        winner = null;
        setPlayer(player => []);
        setPlayerValue(value => 0);
        setPlayerStand(value => false);
        setPlayerAceCount(value => 0);
        setDealer(dealer => []);
        setDealerValue(value => 0);
        setDealerAceAdded(value => false);
        setDealerAceCount(value => 0);
        setMessage(value => "");
        setHandOver(value => false);
    }

    useInterval(() => {
        if (playerStand && !handOver) {
            hit(dealer);
            dealerAce = aceIncrease();
            if (dealerTotal > 21 && dealerAce && dealerTotal - 10 < 21) {
                setDealerValue(value => value - 10);
                dealerAce = false;
                setDealerAceAdded(value => false);
                setHandOver(value => false);
            }
        }
    }, (dealerValue >= 17 || dealerAce === true) ? null : 1000);

    const checkWinner = () => {
        if (dealerValue > 21 && playerValue <= 21) {
            winner = player;
        }else if (dealerValue <= 21 && playerValue > 21) {
            winner = dealer;
        }else if (dealerValue > playerValue) {
            winner = dealer;
        }else if (playerValue > dealerValue) {
            winner = player;
        }else{
            winner = null;
        }
    }

    useEffect(
        () => {
            nextCard = count;
            if(player.length === 2) {
                checkBlackJack();
            }
            if ((dealerValue >= 17 && dealerValue <= 21) || (dealerAceAdded === true && dealerLength >= 2 && dealerTotal - 10 >= 17 && dealerTotal - 10 <= 21)) {
                setHandOver(oldValue => true);
            }
            if (playerValue > 21) {
                setHandOver(oldValue => true);
                setMessage(message => "Player Bust!");
            } else if (dealerValue > 21) {
                if (dealerAceAdded && dealerTotal - 10 < 21) {
                    setDealerValue(value => value - 10);
                    setDealerAceAdded(value => false);
                    dealerAce = false;
                } else {
                    setHandOver(oldValue => true);
                    setMessage(message => "Dealer Bust!");
                }
            }
            if (handOver === true) {
                setHandActive(oldValue => false);
                //settle bets
                checkWinner();
                if(winner === dealer) {
                    setMessage(message => message + " Dealer Wins!");
                    if (wallet === 0) {
                        setMessage(message => message + "Game Over. Please try again!");
                    }
                } else if (winner === player) {
                    setMessage(message => message + " You Win!");
                    setWallet(value => value + bet + bet);
                } else {
                    setMessage(message => "It's a tie!");
                    setWallet(value => value + bet);
                }
                setBetActive(oldValue => false);
                setBet(oldValue => 0);
            }
        }, [playerValue, dealerValue, dealerAceAdded, handOver, player, betActive]);

    return (
        <div className="gameBoard">
            <div className="board-header">
            <div className="message">{message}</div>
            <div className="bet-message">
                <p>Wallet: ${wallet}</p>
                <p>Minimum Bet: ${minBet}</p>
            </div>
            <div className="game-buttons">
                <form ref={inputRef} className="bet-form">
                    <input type="text"
                        onInput={(event) => {
                            betAmount = parseInt(event.target.value);
                            // debugger;
                        }}
                    />

            <button disabled={betActive || handActive} type="submit" onClick={(e)=>{
                e.preventDefault();
                if (betAmount >= minBet && betAmount <= wallet){
                    setWallet(value => value - betAmount);
                    setBet(value => betAmount);
                    setBetActive(value => true);
                    resetHand();
                    inputRef.current.reset();
                }else{
                    alert("Please input a valid bet");
                    inputRef.current.reset();
                }
            }}>Bet</button> 
            </form>
            <button disabled={handActive || !betActive} onClick={() => {
                if (props.deck.length - count <= 15) {
                    shuffleDeck();
                }
                setDealing(value => true);
                setHandActive(oldValue => true);
                resetHand();
                setBetActive(value => false);
                startHand();
            }}>Start Hand</button>
            </div>
            </div>
            <div className="board-space">
            <div className="dealerBoard">
                <div className="dealer-value">Dealer: {dealerValue}{(dealerAceCount !== 0 && dealerValue + 10 <= 17) ? `(${dealerValue + 10})` : ""}</div>
                <DealerHand dealer={dealer} />
            </div>
            <div className="playerBoard">

                <div className="actions">
                    <button disabled={playerStand || handOver || dealing || !handActive} className="hitButton" onClick={() => {
                        hit(player);
                    }}>Hit</button>
                    <button disabled={playerStand || handOver || dealing || !handActive} className="standButton" onClick={() => {
                        setPlayerStand(oldValue => true);
                        if (playerAceCount !== 0) {
                            if (playerValue + 10 <= 21) {
                                setPlayerValue(value => value + 10);
                            }
                        }
                    }}>Stand</button>
                </div>
                <div>You: {playerValue}{(playerAceCount !== 0 && playerValue + 10 <= 21) ? `(${playerValue + 10})` : ""}</div>
                <Player player={player} />
            </div>
            </div>
        </div>
    )
}

export default Gameboard;