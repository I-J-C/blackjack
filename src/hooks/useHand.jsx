import { useState } from "react";

export const useHand = (initialHand = []) => {
    const [cards, setCards] = useState(initialHand);
    const [stand, setStand] = useState(false);
    const [value, setValue] = useState(0);
    const [aceCount, setAceCount] = useState(0);

    const hit = (card) => {
        setCards(prev => [...prev, card]);
    };

    const handleStand = () => {
        setStand(true);

        if (aceCount !== 0 && value + 10 <= 21) {
            setValue(value => value + 10);
        }
    };

    const doubleDown = (card) => {
        // todo: double bet amount here
        hit(card);
        handleStand;
    }

    const split = () => {
        // todo: handle double bet amount here
        // todo: make another hand - makeHand method?
    }

    return {
        cards,
        setCards,
        value,
        setValue,
        aceCount,
        setAceCount,
        stand,
        hit,
        handleStand
    };
};