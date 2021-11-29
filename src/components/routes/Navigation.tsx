import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../logo2.png";
import PriceGetter from "../../contracts/PriceGetter.json";

const PRICEGETTER_CONTRACT_ADDRESS = "0xf21F90585fD99281cefdfdb5A3307082FE62E2B7";

export const Navigation = () : React.ReactElement => {

	const [currentUserEthBalance, setCurrentUserEthBalance] = useState();
	const [currentUserEthBalanceInUSD, setCurrentUserEthBalanceInUSD] = useState();

	const getEthBalanceAsync = async () => {
		const web3 = await Moralis.enableWeb3();
		const abi = PriceGetter.abi;
		const contract = new web3.eth.Contract(abi, PRICEGETTER_CONTRACT_ADDRESS);
		const EthToUsdData = await contract.methods.getLatestPrice().call({from: ethereum.selectedAddress});
		console.log(EthToUsdData);
		
		const balance = await web3.eth.getBalance(ethereum.selectedAddress);
		const balanceDeci = web3.utils.fromWei(balance);
		console.log(balanceDeci);
		const cuttedBalance = balanceDeci.toString().slice(0,6);
		setCurrentUserEthBalance(cuttedBalance);
		setCurrentUserEthBalanceInUSD((EthToUsdData * balanceDeci / 100000000).toString().slice(0,7));
	};

	useEffect(() => {
		getEthBalanceAsync();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (

	<nav className="navbar navbar-expand-lg">
		<Link className="navbar-brand" to="/"><img src={Logo} width="90" /></Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
	</button>
	<span className="balanceLine">Current Balance: {currentUserEthBalance} ETH ({currentUserEthBalanceInUSD} USD by Chainlink)</span>

	<div className="collapse navbar-collapse" id="navbarSupportedContent">
		<ul className="navbar-nav mr-auto">
			<li className="nav-item login-btn">
			<Link className="nav-link" to="/login">Login</Link>
			</li>
		</ul>
	</div>
	</nav>


  );
}