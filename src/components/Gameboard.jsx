import React, { useEffect, useState, useRef } from "react";
import DealerHand from "./DealerHand";
import Player from "./Player";

const drawURL1 = 'https://deckofcardsapi.com/api/deck/';
const shuffle = '/shuffle/';

const Gameboard = ({ deckID, deck, setDeck, getDeck }) => {
    const axios = require('axios');
    const [count, setCount] = useState(0);
    const [player, setPlayer] = useState([]);
    // todo: move playerAceCount, playerValue, and playerStand to hand level
    const [playerAceCount, setPlayerAceCount] = useState(0);
    const [playerValue, setPlayerValue] = useState(0);
    // !
    const [dealerTurn, setDealerTurn] = useState(false);
    const [dealer, setDealer] = useState([]);
    const [dealerValue, setDealerValue] = useState(0);
    const [dealerAceCount, setDealerAceCount] = useState(0);
    const [dealerAceAdded, setDealerAceAdded] = useState(false);
    const [handOver, setHandOver] = useState(false);
    const [message, setMessage] = useState('');
    const [playerActive, setPlayerActive] = useState(false);
    const [betActive, setBetActive] = useState(false);
    const [bet, setBet] = useState(0);
    const [minBet, setMinBet] = useState(5);
    const [wallet, setWallet] = useState(100);
    const inputRef = useRef(null);
    let betAmount = 0;
    let nextCard = count;
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

    const checkBlackJack = () => {
        if (player.length <= 2 && playerAceCount > 0 && playerValue === 11) {
            setPlayerValue(value => 21);
            setHandOver(value => true);
            setMessage(value => "BlackJack!");
            checkWinner();
        }
    }

    const shuffleDeck = () => {
        let url2 = `${drawURL1}${deckID}${shuffle}`;

        axios.get(url2)
            .then(function (response) {
                // console.log(response.data);
                getDeck();
                setCount(value => 0);
                // console.log("Deck Shuffled");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const drawCards = (amount) => {
        let cards = [];
        for (let i = 0; i < amount; i++) {
            cards.push(deck[nextCard + i]);
            nextCard += 1;
        }
        setCount(count => count + 1);
        return cards;
    }

    const hit = (playerDealer, faceDown = false) => {
        drawCards(1).forEach(element => {
            if (faceDown) { element.faceDown = true; }
            console.log('element', element);
            if (playerDealer === player) {
                setPlayer(player => [...player, element]);
                setPlayerValue(playerValue => playerValue + cardValue(element.code, player));
            } else if (playerDealer === dealer) {
                setDealer(dealer => [...dealer, element]);
                setDealerValue(dealerValue => dealerValue + cardValue(element.code, dealer));
                console.log('dealer after hit', dealer);
            }
        });
    }

    const startHand = () => {
        hit(player);
        setTimeout(() => {
            hit(dealer, false);
        }, 1000);
        setTimeout(() => {
            hit(player, false);
        }, 2000);
        setTimeout(() => {
            hit(dealer, true);
            setPlayerActive(value => true);
        }, 3000);
    }

    const cardValue = (cardCode, playerDealer) => {
        let value = null;
        if ((cardCode) && (cardCode.includes('K') || cardCode.includes('Q') || cardCode.includes('J') || cardCode.includes('0'))) {
            value = 10;
        } else if (cardCode.includes('A')) {
            value = 1;
            if (playerDealer === player) {
                setPlayerAceCount(count => count + 1);
            } 
            if (playerDealer === dealer) {
                setDealerAceCount(count => count + 1);
                if (dealerValue + 10 <= 21 || dealer.length === 0) {
                    setDealerAceAdded(value => true);
                    value += 10;
                }
            }
        } else {
            value = parseInt(cardCode);
        }
        return value;
    }

    // todo: rework this to properly count all dealer hits
    const aceIncrease = () => {
        if (dealerAceCount !== 0) {
            let oldValue = dealerValue;
            if (oldValue + 10 >= 17 && oldValue + 10 <= 21 && oldValue === dealerValue) {
                setDealerValue(value => value + 10);
                setDealerAceAdded(value => true);
            }
        }
    }

    const resetHand = () => {
        winner = null;
        // player reset
        setPlayer(player => []);
        setPlayerValue(value => 0);
        setPlayerAceCount(value => 0);
        setPlayerActive(value => false);
        // dealer reset
        setDealer(dealer => []);
        setDealerTurn(value => false);
        setDealerValue(value => 0);
        setDealerAceAdded(value => false);
        setDealerAceCount(value => 0);
        // game reset
        setMessage(value => "");
        setHandOver(value => false);
    }

    useInterval(() => {
        if (dealerTurn) {
            // todo: fix re-render issue with card not flipping visually
            console.log('dealer turn!')
            console.log('dealer', dealer);
            if (!dealer[1].faceDown) {
                hit(dealer);
                if ((dealerValue >= 17 && dealerValue <= 21) || (dealerAceAdded && dealer.length() >= 2 && dealerValue - 10 >= 17 && dealerValue - 10 <= 21)) {
                    setDealerTurn(value => false);
                    setHandOver(value => true);
                }
                aceIncrease();
                if (dealerValue > 21 && dealerAceAdded && dealerValue - 10 <= 21) {
                    setDealerValue(value => value - 10);
                    setDealerAceAdded(value => false);
                }
            }
            flipDealerFaceDown();
        }
    }, (dealerValue >= 17 || dealerAceAdded || !dealerTurn) ? null : 1000);

    const flipDealerFaceDown = () => {
        if (dealer[1].faceDown === true) {
            let tempDealer = [...dealer];
            tempDealer[1].faceDown = false;
            setDealer(value => tempDealer);
        }
    }

    const checkWinner = () => {
        if (dealerValue > 21 && playerValue <= 21) {
            winner = player;
        } else if (dealerValue <= 21 && playerValue > 21) {
            winner = dealer;
        } else if (dealerValue > playerValue) {
            winner = dealer;
        } else if (playerValue > dealerValue) {
            winner = player;
        } else {
            winner = null;
        }

    }

    useEffect(
        () => {
            console.log('handover', handOver);
            if (player.length === 2 && dealer.length === 2) {
                checkBlackJack();
            }
            // todo: change this to check per hand instead of for 1 hand
            if (playerValue > 21) {
                setPlayerActive(value => false);
                setBetActive(value => false);
                setHandOver(value => true);
                setMessage(message => "Bust!");
            } else if (dealerValue > 21) {
                if (dealerAceAdded && dealerValue - 10 < 21) {
                    setDealerValue(value => value - 10);
                    setDealerAceAdded(value => false);
                } else {
                    setHandOver(value => true);
                    setBetActive(value => false);
                    setMessage(message => "Dealer Bust!");
                }
            }
            // todo: check this per hand instead of whole game
            if (handOver) {
                //settle bets
                console.log('checking winner');
                checkWinner();
                if (winner === dealer) {
                    setMessage(message => message + " Dealer Wins!");
                    if (wallet === 0 || wallet < 5) {
                        setMessage(message => message + " Game Over. Please try again!");
                    }
                } else if (winner === player) {
                    setMessage(message => message + " You Win!");
                    setWallet(value => value + bet + bet);
                } else {
                    setMessage(message => "It's a tie!");
                    setWallet(value => value + bet);
                }
                setBetActive(value => false);
                setBet(value => 0);
            }
        }, [playerValue, dealerValue, dealerAceAdded, playerActive, handOver, player, betActive, dealerTurn, bet, dealer, wallet, winner]);

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
                            }}
                        />
                        <button disabled={betActive || playerActive} type="submit" onClick={(e) => {
                            e.preventDefault();
                            if (betAmount >= minBet && betAmount <= wallet) {
                                if (deck.length - count <= 15) {
                                    shuffleDeck();
                                }
                                setWallet(value => value - betAmount);
                                setBet(value => betAmount);
                                setBetActive(value => true);
                                inputRef.current.reset();
                                resetHand();
                                console.log('starting hand!')
                                startHand();
                            } else {
                                alert("Please input a valid bet");
                                inputRef.current.reset();
                            }
                        }}>Bet</button>
                    </form>
                </div>
            </div>
            <div className="board-space">
                <div className="dealerBoard">
                    {/* todo: change this so it hides the dealer Value when playing */}
                    <div className="dealer-value">Dealer: {dealerValue}{(dealerAceCount !== 0 && dealerValue + 10 <= 17) ? `(${dealerValue + 10})` : ""}</div>
                    <DealerHand dealer={dealer} playerActive={playerActive} />
                </div>
                <div className="playerBoard">
                    <div className="actions">
                        <button disabled={!playerActive} className="hitButton" onClick={() => {
                            hit(player);
                        }}>Hit</button>
                        <button disabled={!playerActive} className="standButton" onClick={() => {
                            if (playerAceCount > 0 && playerValue + 10 <= 21) {
                                setPlayerValue(value => value + 10);
                                setPlayerAceCount(value => value - 1);
                            }
                            setPlayerActive(value => false);
                            setDealerTurn(value => true);
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