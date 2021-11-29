//import { useMoralis } from "react-moralis";
import React, { useState, useEffect } from "react";

import Token from "../../contracts/Token.json"

import { Moralis } from "moralis";

//import MarketplaceToken from "../../contracts/Marketplace.json"

const TOKEN_CONTRACT_ADDRESS = "0x9A1158521a35032573BD96FBDeDbdd8867E74EF0";
const MARKETPLACE_CONTRACT_ADDRESS = "0xfBd24865Ee0D63B99D85436927832CB12d47243C";


const APP_ID = "re36JMZQ8rWzCIO4mbBpqlVP1RbKGF52Rjx2Z5oI" //MAINNET "GEopAiMvn4j5xV1HUngZTgUynHjb4c0FPSYD27kJ";
const SERVER_URL =  "https://damp8oy0lyqo.usemoralis.com:2053/server"// MAINNET "https://blz71dbm4sc7.usemoralis.com:2053/server";

Moralis.initialize(APP_ID);
Moralis.serverURL = SERVER_URL;

export const Marketplace = () : React.ReactElement => {

//const { Moralis } = useMoralis();

const [myNFTs, setMyNFTs] = useState([]);

const showMyNFTs = async () => {
	const web3 = await Moralis.Web3.enableWeb3();
	const abi = Token.abi;
	const contract = new web3.eth.Contract(abi, TOKEN_CONTRACT_ADDRESS);
	const dataArray = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({from: ethereum.selectedAddress});
	
	//console.log(dataArray);

	dataArray.forEach(async (dogId) => {
		const d = await contract.methods.getTokenDetails(dogId).call({from: ethereum.selectedAddress});
		//console.log(d.tokenURI);
		const nftTokenURI = "https://dweb.link/ipfs/"+d.tokenURI.substring(5);
		const response = await fetch(nftTokenURI);
		const jsonResponse = await response.json();
		//console.log(jsonResponse);

		const nftImageURI = "https://dweb.link/ipfs/"+jsonResponse.image.substring(5);

		const element = (<div key={jsonResponse.name}>
		<div className="card doggie-card">
		<img src={nftImageURI}></img>
		<div className="doggiename">{jsonResponse.name}</div> <br/>
		Description: {jsonResponse.description} <br/>
		Health: {d.health} <br/>
		Stamina: {d.stamina} <br/>
		Adorable: {d.adorable} <br/>
		Attack: {d.attack} <br/>
		</div>
		<div className="sellbutton"><button onClick={sellNFTs} doggie-id={dogId}>Sell</button></div>
		</div>);
		setMyNFTs(oldArray => [...oldArray, element]);
		//console.log(d);
	}); 

};

const sellNFTs = (event) => {
	const tokenId = event.target.getAttribute("doggie-id");

	console.log(tokenId);

	offerNFT(tokenId);
};

//Sell NFT Funtions

const offerNFT = async (tokenId) => {

	const priceDeci = 0.43;

	const price = priceDeci.toString();

    const approval = await approveMarketPlace(TOKEN_CONTRACT_ADDRESS, tokenId);
    const offering = await placeOffering(TOKEN_CONTRACT_ADDRESS, tokenId, price); // 0.43 is the price
    console.log(offering);
	console.log(approval);
}

const placeOffering = async (_hostContract, _tokenId, _price) => {

	const web3 = await Moralis.Web3.enableWeb3();
    const params =  {hostContract: _hostContract,
                    offerer: ethereum.selectedAddress,
                    tokenId: _tokenId,
                    price: _price
    }
	console.log("HERE WE SKREW UP");
    const signedTransaction = await Moralis.Cloud.run("placeOffering", params);
	console.log("NOT HERE EYT ");
    fulfillTx = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
	return fulfillTx;
}

const approveMarketPlace = async (hostContract, tokenId) => {
	const web3 = await Moralis.Web3.enableWeb3();

    const encodedFunction = web3.eth.abi.encodeFunctionCall({
        name: "approve",
        type: "function",
        inputs: [
            {type: 'address',
            name: 'to'},
            {type: 'uint256',
            name: 'tokenURI'}]
    }, [MARKETPLACE_CONTRACT_ADDRESS, tokenId]);
    
    const transactionParameters = {
        to: hostContract,
        from: ethereum.selectedAddress,
        data: encodedFunction
    };
    const txt = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
    });
    return txt
}


useEffect(() => {

	showMyNFTs();

	/*

	const web3 = await Moralis.enableWeb3();



	Moralis.authenticate().then(function(){
		populateNFTs();
		populateOfferings();
		populateBalance();
		subscribeOfferings();
		subcribeBuys();
		subscribeUpdateNFTs();
	});*/

	// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


/*
const subscribeOfferings = async () => {
	const query = new Moralis.Query("PlacedOfferings");
	const subscriptionAlerts = await query.subscribe();
	subscriptionAlerts.on('create', (object) => {
		cleanOfferings();
		populateOfferings();
	});
};

const subscribeBuys = async () => {
	const query = new Moralis.Query("ClosedOfferings");
	const subscriptionAlerts = await query.subscribe();
	subscriptionAlerts.on('create', (object) => {
		cleanOfferings();
		populateOfferings();
	});
};

const subscribeUpdateNFTs = async () => {
	const query = new Moralis.Query("PolygonNFTOwners");
	const subscriptionAlerts = await query.subscribe();
	subscriptionAlerts.on('create', (object) => {
		cleanOfferings();
		populateOfferings();
	});
};

//Display Balance Functions
const getBalance = async () => (_address){
    const params =  {address: _address}
    const balance = await Moralis.Cloud.run("getBalance", params);
    return(balance);
}

const populateBalance = async () => {
    const presentBalance = await getBalance(ethereum.selectedAddress);
    const formatedBalance = "Your Market Place Balance is " + Moralis.Units.FromWei(presentBalance) + " ETH"
    document.getElementById("balance").innerHTML = formatedBalance;
}


//Display NFT Functions

const populateNFTs = async () => {
    const localNFTs = await getNFTs().then(function (data){
        let nftDisplays = getNFTObjects(data);
        displayUserNFTs(nftDisplays);
    });
}

const getNFTs = async () => {
    const queryAll = new Moralis.Query("PolygonNFTOwners");
    queryAll.equalTo("owner_of", ethereum.selectedAddress);
    const data = await queryAll.find()
    const nftArray = [];
    for (let i=0; i< data.length; i++){
        const metadataInfo = await fetch(data[i].get("token_uri"));
        const metadata = await metadataInfo.json();
        const nft = {"object_id":data[i].id, "token_id":data[i].get("token_id"),"token_uri":data[i].get("token_uri"),"contract_type":data[i].get("contract_type"),"token_address":data[i].get("token_address"),"image":metadata["image"],"name":metadata["name"],"description":metadata["description"]}
        nftArray.push(nft)
    }
    return nftArray;
}



async function selectNFT(nftObject){
    const nftId = nftObject.parentElement.id;
    let nft = window.nftArray.find(object => object.object_id == nftId);
    const nftDisplay = `<div id="${nft.object_id}" class="text-center">
                            <img src=${nft.image} class="img-fluid rounded" style="max-width: 40%">
                            <h3>${nft.name}</h3>
                            <p>${nft.description}</p>
                            <div id="sellActions">
                                <input id="price" type="text" class="form-control mb-2" placeholder="Price"> 
                                <button id="sellButton"class="btn btn-dark btn-lg btn-block mb-2" id="sell" onclick="offerNFT(this);">Offer for Sale</button>
                            </div>
                        </div>`
    document.getElementById("featured_nft").innerHTML = nftDisplay;
    nftOffered = await isNFTOffered(nft.token_address,nft.token_id);
    if (nftOffered){
        document.getElementById("sellActions").remove();
    }
}

async function isNFTOffered(hostContract, tokenId){
    let offering_exist = true;
    let offering_closed = false;
    const queryAll = new Moralis.Query("PlacedOfferings");
    queryAll.equalTo("hostContract", hostContract);
    queryAll.equalTo("tokenId", tokenId);
    const data = await queryAll.find();
    data.length > 0? offering_exist = true: offering_exist = false;
    for (let i=0; i< data.length; i++){
        offering_closed = await isOfferingClosed(data[i].get("offeringId"));
    }
    const result = offering_exist && !offering_closed
    return result;
}

//Display Offering Functions
async function populateOfferings(){
    let offeringArray = await getOfferings();
    let offerings = await getOfferingObjects(offeringArray);
    displayOfferings(offerings);
}

async function getOfferings(){
    const queryAll = new Moralis.Query("PlacedOfferings");
    const data = await queryAll.find()
    offeringArray = [];
    for (let i=0; i< data.length; i++){
        let flag = await isOfferingClosed(data[i].get("offeringId"));
        if (!flag) {
            const metadataInfo = await fetch(data[i].get("uri"));
            const metadata = await metadataInfo.json();
            const offering = {"offeringId":data[i].get("offeringId"),"offerer":data[i].get("offerer"),"hostContract":data[i].get("hostContract"),"tokenId":data[i].get("tokenId"),"price":web3.utils.fromWei(data[i].get("price")),"image":metadata["image"],"name":metadata["name"],"description":metadata["description"]}
            offeringArray.push(offering)
        }
    }
    return offeringArray;
}

async function isOfferingClosed(offeringId){
    const queryAll = new Moralis.Query("ClosedOfferings");
    queryAll.equalTo("offeringId", offeringId);
    const data = await queryAll.find()
    data.length > 0? result = true: result = false;
    return result;
}




//Buy NFT Funtions

async function buyNFT(context){
    const offeringId = context.parentElement.parentElement.id;
    let offering = window.offeringArray.find(object => object.offeringId == offeringId);
    const price = Moralis.Units.ETH(offering.price);
    const priceHexString = BigInt(price).toString(16);
    closedOffering = await closeOffering(offeringId,priceHexString);
    const tx_closeOffering = `<p> Buying transaction ${closedOffering}</p>`;
    context.parentElement.innerHTML = tx_closeOffering;
}

async function closeOffering(offeringId, priceEncoded){
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
        name: "closeOffering",
        type: "function",
        inputs: [
            {type: 'bytes32',
            name: '_offeringId'}]
    }, [offeringId]);
    
    const transactionParameters = {
        to: nft_market_place_address,
        from: ethereum.selectedAddress,
        value: priceEncoded,
        data: encodedFunction
    };
    const txt = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
    });
    return txt
}
*/



  return (
    <div className="marketplace">


    <div className="row">
		<div className="col-6">
		<div className="marketplace-title">My NFTs</div>
		{myNFTs}
		</div>

		<div className="col-6">
		<div className="marketplace-title">NFTs for sale</div>
		<div className="card doggie-card">
		<img src="https://dweb.link/ipfs/bafybeig2dn4odwle5hv2o2tbtq2rvjyd62v6xtghkg6jscxhcrqjyvm2km/doggo.png"></img>
		<div className="doggiename">Mega Adorable Dog</div> <br/>
		Description: Mega Adorable Dog with Magic Wand and Magic Shield <br/>
		Health: 10 <br/>
		Stamina: 10 <br/>
		Adorable: 110 <br/>
		Attack: 10 <br/>
		</div>
		<div className="sellbutton"><button>Buy</button></div>
		</div>

	</div>
    </div>
  );
}
