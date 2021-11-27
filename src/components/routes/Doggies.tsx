import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Token from "../../contracts/Token.json";

const CONTRACT_ADDRESS = "0xC9117C4C0b7B481907975bc28bcdF90490C19F6F";
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

			const element = (<div key={d.name} className="col-md-4 card">
			Health: {d.health} <br/>
			Stamina: {d.stamina} <br/>
			Adorable: {d.adorable} <br/>
			Attack: {d.attack} <br/>
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