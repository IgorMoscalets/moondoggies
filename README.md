# moondoggies
Moondoggies is an NFT-based game where you can breed and fight with your NFT assets for more coins.

## Try it yourself!

You can <code>git clone</code> this project and then run <br>
<code>npm install</code> to install dependencies and then run <br>
<code>npm start</code> to try it yourself at <code>localhost:9000</code><br>
<i>You need to have node in order to run site and set your Metamask network to Kovan Test Network in order to run contracts</i>

## Inspiration
I've always been a big fan of crypto world! I started my journey to the world of crypto from crypto investing and buying tokens and meme tokens, but the fact that I develop things for a long time couldn't leave me indifferent to the tech side of crypto! This is where this project coming from - from this fun and easy perspective just as it was in crypto investing but in a more complicated, NFT-way with more serious approach. Here comes the MoonDoggie - the NFT asset that went through my mind and the beautiful-logic game that comes with it.

![alt text](https://github.com/IgorMoscalets/MoonDoggies/blob/main/src/moondoggies-screenshots/moondoggies-1-home.png?raw=true)

## What it does
It is a NFT game in which the most important part of the new approach I'm showing with this game is the NFT base creation by the user. It basically means that user can mint their starter NFT character from some base by his preference, and it's still going to be absolutely unique for every NFT created. Besides that, this NFT asset is directly related to our game, and it can be used as a character! With it's own properties, such as health, stamina, attack, and adorable...

![alt text](https://github.com/IgorMoscalets/MoonDoggies/blob/main/src/moondoggies-screenshots/moondoggies-3-createdoggies-base.png?raw=true)

Wait a sec, but what is adorable? Let me tell you about this interesting feature of this NFT world in this game. 
Adorable parameter of our MoonDoggie is basically a chance to stun in every game. Our battles will be mostly PVP and turn-based, which means that stunned player will just miss his next turn. If our character (NFT) has adorable for at least 0, it turns to a Magic MoonDoggie (it's shining with some renders of glows, stars depending of level of adorablenesss), if its adorable is 0 then its a simple MoonDoggie.

![alt text](https://github.com/IgorMoscalets/MoonDoggies/blob/main/src/moondoggies-screenshots/moondoggies-4-createdoggies-wow.png?raw=true)

This adorable parameter which is one of the most interesting and magical things about our game world requires randomness. Our game will be P2E (Play to Earn), and if we are controlling such assets as NFT that cost real money we should really put this randomness under a question mark. 

Here comes the Chainlink VRF (Verifiable Random Function), where we can get all our random stuff right inside our contracts with cryptological proof and security, which gives our game needed fairness and safety to choose players to win, even though we include such parameter as randomness in our game world. It just makes it more interesting but in no case easier to hack or more imbalanced. 


![alt text](https://github.com/IgorMoscalets/MoonDoggies/blob/main/src/moondoggies-screenshots/moondogbattle.png?raw=true)

Also we have our Marketplace, where users can sell and buy their NFTs (now they choose the price of them), they try them in game and then they know and decide, which NFTs are more rare, which are more valuable in terms of gameplay and so on. In this Marketplace we also want to use Chainlink Price Feeds, where we can get our fiat value for prices and user balance, to get more accurate and safe understanding of assets prices for user.
![alt text](https://github.com/IgorMoscalets/MoonDoggies/blob/main/src/moondoggies-screenshots/moondoggies-2-marketplace.png?raw=true)


## How I built it

We have tons of features to implement as we just started, but right now we have:

ReactJS App with TypeScript and Webpack 5, Node:
We are using this for front-end rendering stuff, also our NFT creation engine is realtime and serverless, its built on react.

Moralis:
We use Moralis for web3 using usual web3 and Web3API, to store basic User data which makes it absolutely serverless with Moralis.Query, etc., also for all communication with Contracts and calling contract methods (including our NFT ERC-721 token and contract with Chainlink Price Feeds). Basically Moralis makes our app absolutely serverless and a lot of things much easier.

![alt text](https://github.com/IgorMoscalets/MoonDoggies/blob/main/src/moondoggies-screenshots/moondoggies-5-mydoggies.png?raw=true)

Chainlink:
We use Chainlink VRF for some of the most important logical things in our game, that create our further win-lose dynamic and game fairness. It turns randomness into something that actually gives our game balance a positive impact instead of negative and makes things more interesting.
Also we use Chainlink Price Feeds to ensure that User has the most updated and high quality data about fiat prices on our Marketplace, and on Balance.

![alt text](https://github.com/IgorMoscalets/MoonDoggies/blob/main/src/moondoggies-screenshots/moondoggies-6-balance.png?raw=true)

nft.storage (ipfs stored on Filecoin servers):
We store our NFT asset metadata such as name, description and image on nft.storage and send it right from front-end without any server call, which gives us a super fast NFT asset management, as well as very secure storage as soon as nft.storage is based on blockchain.


## Challenges I ran into
Some of the technologies were new for me, but 99% of the time it was a positive experience! Documentations are very good as well, mostly of them are not written for react and some require server, but implementation of them is interesting [Check GitHub to see this right now: https://github.com/IgorMoscalets/moondoggies]
There were some issues, for example we couldn't get our web3.storage working sadly for some reason on react, but then we switched to nft.storage and it worked as a charm :) This is just a start of creation, but I can say that creating this game is more of an interesting deep dive in a game world, than a challenge. 

## What I learned
I learned a lot about new NFT technologies, new server technologies and crypto world.

## Accomplishments that I'm proud of

I'm proud of the perspective I see in this game and the actual gigantic sizes of this game world I am trying to build right now, it's first points and logical rules, it's first directions gives us opportunity to implement more and more interesting features in this game.

## What's next for MoonDoggies
We have tons of features to implement as we just started, some of them are 
- To finish our marketplace, set some initial rules for it, balance the economics on a marketplace so the users can buy and sell it with normal dynamics.
- To make our turn-based PVP battle for some reward to one user, which is also can be finished without both users being online. One user sends the battle invitation to second user, second user gets a notification of invitation to fight - then when second user accepts he/she sees the battle, and first user gets a log of the turn-based PVP battle in a notification! All results are provable and verifiable and they still don't require our users to sit 24/7 in our game, it all depends on which NFT assets they are going to choose and what their characteristics will be, it's giving our game the more chill/relaxed way for our users unlike other existing NFT games.
- To make breeding between base NFTs and between their children as well! The child will be generated from their base stats and their gathered stats (stats from accessories). This way it will give us a possibility to get a giant versatility of MoonDoggies and their rareness and uniqueness as we get more users to interact with them.
- To host a site, deploy it on a mainnet and start turning it into an actual game!
