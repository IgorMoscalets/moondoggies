import React, { useState } from "react";

import { useMoralis } from "react-moralis";

export const Login = () : React.ReactElement => {

	const { logout, isAuthenticating, isAuthenticated, Moralis } = useMoralis();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [currentEmail, setCurrentEmail] = useState("");
	const [currentUsername, setCurrentUsername] = useState("");
	const [currentWalletAddr, setCurrentWalletAddr] = useState("");
	const [currentEmailVerified, setCurrentEmailVerified] = useState("");



	const handleEmailChange = (event) => setEmail(event.target.value);
	const handlePasswordChange = (event) => setPassword(event.target.value);
	const handleUsernameChange = (event) => setUsername(event.target.value);

	const loginUsingMetamask = async () => {
		Moralis.authenticate().then(function(user){
			user.set("username", username);
			user.set("password", password);
			user.set("email", email);
		});
	};

	const getCurrentUserInfo = async () => {
		Moralis.User.currentAsync().then(function(user){
		console.log(user);
		setCurrentEmail(user.get("email"));
		setCurrentUsername(user.get("username"));
		setCurrentWalletAddr(user.get("ethAddress"));
		setCurrentEmailVerified(user.get("emailVerified"));
		console.log("XDDD");
	});
	};


	

if (!isAuthenticated){
	return (
	<div>
		<input value={email} onChange={handleEmailChange} placeholder="email" />
		<input value={password} onChange={handlePasswordChange} placeholder="password" />
		<input value={username} onChange={handleUsernameChange} placeholder="username" />
		<button onClick={loginUsingMetamask}>Sign up (with Metamask)</button>
	</div>
	);
}
	
	
	return (
	<div>
		<h1>Welcome</h1>
		Email: {currentEmail} <br/>
		Username: {currentUsername} <br/>
		EthWallet: {currentWalletAddr} <br/>
			Email Verified: {currentEmailVerified} <br/>

		<button onClick={getCurrentUserInfo}>My Info</button>
		<button onClick={() => logout()} disabled={isAuthenticating}>
		Logout
		</button>
	</div>
	);
}
