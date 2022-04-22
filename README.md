Project Choice
A game of Blackjack, using the Deck of Cards API (http://deckofcardsapi.com/) to generate and manage playing cards.

Project Description
Blackjack is the popular casino game that is played all over the world. The player is against a dealer character, which is a computer managed by the app. The goal of the game is to add up their cards as close as possible to 21, while not going over 21 (a bust). The player wins the hand if they end the hand with a higher valid total than the dealer.

Card rules:
-The number cards 2-9 are worth the amount they show.
-A is worth either 1 or 11, whichever is better for the hand owner.
-10, Jack, Queen, and King are all worth 10.

Play rules:
-Players bet their appropriate amount (usually there is a minimum bet amount)
-All players are dealt 2 cards (face up) and the dealer also deals themselves 2 cards (one face up, one face down).
-Each player can then choose to either hit (draw an additional card - can be chosen repeatedly), stand (end that hand), double down (draw only 1 additional card and double their bet), or, conditionally, split (turn their 1 hand into 2 hands with 1 card each from their old hand -- this is only an option of both of the cards of the first hand were the same number).
-After the player(s) turn, the dealer then reveals their face down card and plays their hand, choosing to either hit or stand in the same way as the player. Some dealers are bound by certain rules, such as standing on 17 (will implement 1 dealer ruleset in MVP).
-Once the dealer is done, the hands are compared, the winner is chosen, bets are resolved, and a new hand begins!

Wire Frames
Components:
[https://media.git.generalassemb.ly/user/42127/files/c7a7c580-bce0-11ec-936c-9051afd7c768]

[https://media.git.generalassemb.ly/user/42127/files/c7a7c580-bce0-11ec-936c-9051afd7c768]

Game Board:
[https://media.git.generalassemb.ly/user/42127/files/d9896880-bce0-11ec-8225-8b81243afe24]

User Stories
As a player, I want to be able to start the game with some amount of money to bet.
As a player, I want to be able to hit repeatedly until I bust or choose to stand.
As a player, I want to see the dealer play their turn once I am done with my turn.
As a player, I want to gain money when I win, and (unfortunately) lose money when I lose.
As a player, I want to be able to double down or split my hand if those plays are possible or relevant.
MVP Goals
1 dealer ruleset (stand at 17)
Deal player 2 face up cards and dealer 1 face up and 1 face down card.
Let player hit until they choose to stand or they bust.
Let player double down (double bet and 1 hit).
Let player split their bet if they have doubles.
Game keeps track of drawn cards (through API) and only uses cards not already drawn.
Have the player start the game with some starting amount of money (maybe $100-200ish) and be able to bet appropriately with a minimum bet.
Game determines a winner for each hand and distributes winnings/losses appropriately.
Game determines when the player has run out of money and prevents them from continuing without more.
Rules explanation (Rules page with React Router)
Stretch Goals
Additional dealer rulesets.
Being able to split more than 1 time if more of the same number are drawn for additional hands.
Being able to change bet amounts/starting money.
Recommended plays depending on dealer show and player hand (maybe implemented as a hint button?).
Choose number of decks to play with (standard in a casino is 6).
Choose either a countable version (where drawn cards are not shuffled back in immediately) or a shuffled version (where all cards are available after every hand - effectively uncountable).