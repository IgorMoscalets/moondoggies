import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Token from "../../contracts/Token.json";

const CONTRACT_ADDRESS = "0x9A1158521a35032573BD96FBDeDbdd8867E74EF0";
export const Doggies = () : React.ReactElement => {
	
	const { Moralis } = useMoralis();

	const [elements, setElements] = useState([]);
	
	const runContractFunction = async () => {
		const abi = Token.abi;
		const web3 = await Moralis.Web3.enableWeb3();
		const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
		const dataArray = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({from: ethereum.selectedAddress});
		
		console.log(dataArray);

		dataArray.forEach(async (dogId) => {
			const d = await contract.methods.getTokenDetails(dogId).call({from: ethereum.selectedAddress});
			console.log(d.tokenURI);
			const nftTokenURI = "https://dweb.link/ipfs/"+d.tokenURI.substring(5);
			const response = await fetch(nftTokenURI);
			const jsonResponse = await response.json();
			console.log(jsonResponse);

			const nftImageURI = "https://dweb.link/ipfs/"+jsonResponse.image.substring(5);

			const element = (<div key={jsonResponse.name} className="col-md-4">
			<div className="card doggie-card">
			<img src={nftImageURI}></img>
			<div className="doggiename">{jsonResponse.name}</div> <br/>
			Description: {jsonResponse.description} <br/>
			Health: {d.health} <br/>
			Stamina: {d.stamina} <br/>
			Adorable: {d.adorable} <br/>
			Attack: {d.attack} <br/>
			</div>
			<div className="sellbutton"><button>Sell</button></div>
			</div>);
			setElements(oldArray => [...oldArray, element]);
			console.log(d);
		}); 

	};

	useEffect(() => {
		runContractFunction();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	


return (
	<div id="Doggies">
		<div id="cards-render" className="row">
			{elements}
		</div>
	</div>
  );
}