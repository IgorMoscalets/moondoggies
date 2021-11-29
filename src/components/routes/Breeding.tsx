import React, { useEffect, useRef, useState } from "react";

import MDBase from "../../nftresources/base/moondoggies_base.png";
import MDMagicCollar from "../../nftresources/collar/moondoggies_magic-collar.png";
import MDMagicMoonCollar from "../../nftresources/collar/moondoggies_magic-moon-collar.png";
import MDHelmet from "../../nftresources/hats/moondoggies_helmet.png";
import MDMagicHat from "../../nftresources/hats/moondoggies_magic-hat.png";
import MDSimpleHat from "../../nftresources/hats/moondoggies_simple-hat.png";
import MDMagicUp from "../../nftresources/magicup/moondoggies_magicup.png";
import MDMagicShield from "../../nftresources/shield/moondoggies_magic-shield.png";
import MDWand from "../../nftresources/wand/moondoggies_magic-wand.png";
import MDArmorLvl1 from "../../nftresources/armor/moondoggies_armor-lvl1.png";
import MDArmorLvl2 from "../../nftresources/armor/moondoggies_armor-lvl2.png";
import MDArmorLvl3 from "../../nftresources/armor/moondoggies_armor-lvl3.png";
import MDAdorable30 from "../../nftresources/adorable/moondoggies_adorable-30.png";
import MDAdorable40 from "../../nftresources/adorable/moondoggies_adorable-40.png";
import MDAdorable60 from "../../nftresources/adorable/moondoggies_adorable-60.png";
import MDAdorable80 from "../../nftresources/adorable/moondoggies_adorable-80.png";
import MDAdorable100 from "../../nftresources/adorable/moondoggies_adorable-100.png";

import ACMagicCollar from "../../nftresources/accessories/magic collar.png";
import ACMagicMoonCollar from "../../nftresources/accessories/magic collar with moon.png";
import ACHelmet from "../../nftresources/accessories/helmet.png";
import ACMagicHat from "../../nftresources/accessories/magic hat.png";
import ACSimpleHat from "../../nftresources/accessories/simple hat.png";
import ACWand from "../../nftresources/accessories/magic wand.png";
import ACArmorLvl1 from "../../nftresources/accessories/armor lvl1.png";
import ACArmorLvl2 from "../../nftresources/accessories/armor lvl2.png";
import ACArmorLvl3 from "../../nftresources/accessories/armor lvl3.png";
import ACMagicShield from "../../nftresources/accessories/magic shield.png";

import { useMoralis } from "react-moralis";

import { Accessories } from "../../utils/Accessories";

import { NFTStorage, File } from 'nft.storage'

import Token from "../../contracts/Token.json";


const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ0MTU0RkE4MDRkNWU2QUQ3YTNDNWMwYTY2OTY2NzIyYzRDQjk4NTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNzc3MzQxMjI2MSwibmFtZSI6Ik1vb25Eb2dnaWVzIn0.XpBe6o3mVd2AVvvgbgSJ08HqUtUhf0GAURndDgTuxzA'
const client = new NFTStorage({ token: apiKey })

const CONTRACT_ADDRESS = "0x9A1158521a35032573BD96FBDeDbdd8867E74EF0";

export const Breeding = () : React.ReactElement => {

	const { Moralis } = useMoralis();

	const canvasRef = useRef(null);

	const width = 1000;
	const height = 1000;
	const INITIAL_PRICE = 50;

	const [getImageByName, setGetImageByName] = useState();

	const getImageByLink = {
		"Magic Wand": MDWand,
		"Magic Collar": MDMagicCollar,
		"Magic Moon Collar": MDMagicMoonCollar,
		"Helmet": MDHelmet,
		"Magic Hat": MDMagicHat,
		"Simple Hat": MDSimpleHat,
		"Magic Shield": MDMagicShield,
		"Armor Lvl 1": MDArmorLvl1,
		"Armor Lvl 2": MDArmorLvl2,
		"Armor Lvl 3": MDArmorLvl3,
		"Magic Up": MDMagicUp,
		"Adorable 30": MDAdorable30,
		"Adorable 40": MDAdorable40,
		"Adorable 60": MDAdorable60,
		"Adorable 80": MDAdorable80,
		"Adorable 100": MDAdorable100,
		"Base": MDBase
	};

	const getImageByNameAC = {
		"Magic Wand": ACWand,
		"Magic Collar": ACMagicCollar,
		"Magic Moon Collar": ACMagicMoonCollar,
		"Helmet": ACHelmet,
		"Magic Hat": ACMagicHat,
		"Simple Hat": ACSimpleHat,
		"Magic Shield": ACMagicShield,
		"Armor Lvl 1": ACArmorLvl1,
		"Armor Lvl 2": ACArmorLvl2,
		"Armor Lvl 3": ACArmorLvl3
	};

	const [checkedState, setCheckedState] = useState(
		new Array(Accessories.length).fill(false)
	);
	
	const [stm, setStm] = useState(0);

	const [baseStats, setBaseStats] = useState(
		{"health": 0,
		"stamina": 0,
		"adorable": 0,
		"attack": 0}
	);
	const [buffedStats, setBuffedStats] = useState(
		{"health": 0,
		"stamina": 0,
		"adorable": 0,
		"attack": 0,
		"stun": 0
		}
	);

	const [nftName, setNftName] = useState("");

	const [totalPrice, setTotalPrice] = useState(INITIAL_PRICE);

	const [overweightError, setOverweightError] = useState(false);

	const currentUserTokenCount = 200;

	
	// generate a random color hue
	const genColor = () => {
		const hue = Math.floor(Math.random() * 100)+200;
		const pastel = `hsl(${hue}, 100%, 80%)`;
		return pastel;
	};


	const drawImage = async (_image, ctx) => {
		ctx.drawImage(_image, 0, 0, 1000, 1000);
	};
	const resetCanvas = async (prev, ctx) => {
		ctx.clearRect(0, 0, 1000, 1000);
		ctx.fillStyle = prev;
		ctx.fillRect(0, 0, width, height);
	};
	
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d"); 
		const image = new Image();
		image.src = MDBase;
		image.onload = function(){
			ctx.drawImage(image, 0, 0, 1000, 1000);
		}
		ctx.clearRect(0, 0, 1000, 1000);
		const color = genColor();
		ctx.fillStyle = color;

		ctx.fillRect(0, 0, width, height);
		
		//const base64ImgData = canvas.toDataURL();
		//const base64 = base64ImgData.toString("base64");
		const newDict = {};
		for (const key in getImageByLink){
			const image = new Image();
			image.src = getImageByLink[key];
			image.onload = function(){
				newDict[key] = image;
			}
			
		}
		setGetImageByName(newDict);
// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

/*
	const handleOnChangeSliderRedraw = async () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		await resetCanvas(ctx.fillStyle, ctx);
		await drawImage(MDBase, ctx);


		if(baseStats.adorable > 0 || buffedStats.adorable > 0){
			await drawImage(MDMagicUp, ctx);
		}
		let i = 0;
		checkedState.forEach(element => {
			// SelectedAccessories
			if(element == true){

				drawImage(getImageByName[Accessories[i].name], ctx);
			}

			i++;
		});

		if(baseStats.adorable + buffedStats.adorable >= 100){
			drawImage(MDAdorable100, ctx);
		}
		else if(baseStats.adorable + buffedStats.adorable >= 80){
			drawImage(MDAdorable80, ctx);
		}
		else if(baseStats.adorable + buffedStats.adorable >= 60){
			drawImage(MDAdorable60, ctx);
		}
		else if(baseStats.adorable + buffedStats.adorable >= 40){
			drawImage(MDAdorable40, ctx);
		}
		else if(baseStats.adorable + buffedStats.adorable >= 30){
			drawImage(MDAdorable30, ctx);
		}
		
	}; */
	const handleOnChange = async (position, inputType, value) => {
		//console.log(getImageByName);
		//console.log("wow");
		if(inputType == "checkbox"){
			
			const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);
			const updatedElementClass = Accessories[position].aclass;
			
			let i = 0;
			let probablePrice = totalPrice;
			// Check if our User has enough tokens to buy this nft
			updatedCheckedState.forEach(element => {
				// Check if only one of Accessories of this class is selected
				if(element == true && Accessories[i].aclass == updatedElementClass && i != position){
					probablePrice -= Accessories[position].price;
					updatedCheckedState[i] = false;
				}
				i++;
			});
			if(Accessories[position].price + probablePrice > currentUserTokenCount && updatedCheckedState[position] == true){
				checkedState[position] = false;
				return;
			}


		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		await resetCanvas(ctx.fillStyle, ctx);
		await drawImage(getImageByName["Base"], ctx);


		if(baseStats.adorable > 0 || (Accessories[position].adorable != 0 && checkedState[position] != true) || buffedStats.adorable != 0){
			await drawImage(getImageByName["Magic Up"], ctx);
		}
		let priceAddUp = 0;
		const newBuffedArr = {"health": 0,
		"stamina": 0,
		"adorable": 0,
		"attack": 0,
		"stun": 0
		};
		i = 0;
		updatedCheckedState.forEach(element => {
			// SelectedAccessories
			if(element == true){

				//Add to Price
				priceAddUp += Accessories[i].price;

				//Add to Stats
				newBuffedArr.health += Accessories[i].health;
				newBuffedArr.stamina += Accessories[i].stamina;
				newBuffedArr.adorable += Accessories[i].adorable;
				newBuffedArr.attack += Accessories[i].attack;
				newBuffedArr.stun += Accessories[i].stun;

				//Render our Asset

				drawImage(getImageByName[Accessories[i].name], ctx);
			}

			i++;
		});

		// update checkboxes
		setCheckedState(updatedCheckedState);

		// set our total to Initial MoonDog price + sum of Accessories prices
		setTotalPrice(INITIAL_PRICE + priceAddUp);

		// set our Stats to SumUp from Arr
		setBuffedStats(newBuffedArr);

		if(baseStats.adorable + newBuffedArr.adorable >= 100){
			drawImage(getImageByName["Adorable 100"], ctx);
		}
		else if(baseStats.adorable + newBuffedArr.adorable >= 80){
			drawImage(getImageByName["Adorable 80"], ctx);
		}
		else if(baseStats.adorable + newBuffedArr.adorable >= 60){
			drawImage(getImageByName["Adorable 60"], ctx);
		}
		else if(baseStats.adorable + newBuffedArr.adorable >= 40){
			drawImage(getImageByName["Adorable 40"], ctx);
		}
		else if(baseStats.adorable + newBuffedArr.adorable >= 30){
			drawImage(getImageByName["Adorable 30"], ctx);
		}

	}
		else if(inputType == "baseStats"){

			//console.log(parseInt(value));
			const newBaseStats = baseStats;
			
			let otherSum = 0;
			Object.entries(newBaseStats).map(([key, val]) => { 
				if(key != position){
					otherSum += val;
				}
			})
			otherSum += parseInt(value);
			if(otherSum > 30){
				setOverweightError(true);
			}
			else{
				newBaseStats[position] = parseInt(value);
				setOverweightError(false);
			}
			setBaseStats(newBaseStats);

			

			//baseStats FRAME redraw
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			await resetCanvas(ctx.fillStyle, ctx);
			await drawImage(getImageByName["Base"], ctx);

			if(baseStats.adorable > 0 || buffedStats.adorable > 0){
				await drawImage(getImageByName["Magic Up"], ctx);
			}
			let i = 0;
			checkedState.forEach(element => {
				// SelectedAccessories
				if(element == true){
	
					drawImage(getImageByName[Accessories[i].name], ctx);
				}
	
				i++;
			});
	
			if(baseStats.adorable + buffedStats.adorable >= 100){
				drawImage(getImageByName["Adorable 100"], ctx);
			}
			else if(baseStats.adorable + buffedStats.adorable >= 80){
				drawImage(getImageByName["Adorable 80"], ctx);
			}
			else if(baseStats.adorable + buffedStats.adorable >= 60){
				drawImage(getImageByName["Adorable 60"], ctx);
			}
			else if(baseStats.adorable + buffedStats.adorable >= 40){
				drawImage(getImageByName["Adorable 40"], ctx);
			}
			else if(baseStats.adorable + buffedStats.adorable >= 30){
				drawImage(getImageByName["Adorable 30"], ctx);
			}

			//console.log(newBaseStats);
			//console.log(baseStats.health);
			setStm(stm + 1);
			if(stm > 10000){setStm(0)}
		}
		
	};

	const runMintingFunction = async () => {
		const canvas = canvasRef.current;

		const blob = await new Promise(resolve => canvas.toBlob(resolve));
		
		const metadata = await client.store({
			name: nftName,
			description: 'Mooooooooon',
			image: new File([blob], "doggo.png", { type: 'image/png' })
		});
		console.log(metadata.url);
		console.log(metadata.embed());

		const abi = Token.abi;
		const web3 = await Moralis.Web3.enableWeb3();
		const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

		const _finalAttack = baseStats.attack + buffedStats.attack;
		const _finalAdorable = baseStats.adorable + buffedStats.adorable;
		const _finalHealth = baseStats.health + buffedStats.health;
		const _finalStamina = baseStats.stamina + buffedStats.stamina;
		const _finalStun = buffedStats.stun;
		const _finalURI = metadata.url;
		const _finalPrice = web3.utils.toBN(totalPrice * 1000000000);

		console.log(_finalPrice);
		console.log("FINAL PRICE");

		const receipt = await contract.methods.mintExternal(_finalAttack,
			_finalAdorable,
			_finalHealth,
			_finalStamina,
			_finalStun,
			_finalURI,
			_finalPrice).send({from: ethereum.selectedAddress, value: _finalPrice});
		console.log(receipt);
	};

  return (
		<div className="row">
		<div className="col-6">
		
		<div className="row">
			{
				Accessories.map(({name, aclass, price, description}, index) => {
					return(
						<div key={index} className="col-4 accessories-item-wrapper">
							<div className="accessories-item card doggie-card">
								<div className="accimagediv"><img className="accimage" src={getImageByNameAC[name]}></img></div>
								<div className="accName">{name}</div> 
								<div className="accDescription">{description}</div>
								<div className="accClass">Class: {aclass}</div>
								<div className="accPrice">Price: {price}</div>
							<div className="accCheckbox"><input type="checkbox"
							name={name}
							value={name}
							checked={checkedState[index]}
							onChange={event => {handleOnChange(index, "checkbox", event.target.value)}} /></div>
							</div>
						</div>
					);
				})
			}
			
		</div>
		</div>
		<div className="col-6">
			<div className="canvasbuilder"><canvas ref={canvasRef}/></div>
			<div className="namecanv">{nftName}</div>
		<div className="row total-hold">
		<div className="mint-totals col-6">
		Enter Name: <input value={nftName} maxLength="40" onChange={e => setNftName(e.target.value)} type="text" /> <br/>
		Attack: {baseStats.attack} + {buffedStats.attack} (Buff) <br/>
		Stamina: {baseStats.stamina} + {buffedStats.stamina} (Buff) <br/>
		Health: {baseStats.health} + {buffedStats.health} (Buff) <br/>
		Adorable: {baseStats.adorable} + {buffedStats.adorable} (Buff) <br/>
		Stun: {buffedStats.stun} (Buff) <br/>
		</div>

		<div className="basestats col-5">
		<div className="basestats-header">Base Stats <i className="smallNotice">(You have {30-baseStats.health-baseStats.attack-baseStats.adorable-baseStats.stamina} points) </i></div>
		Health <br/><input type="range" min={0} max={30} value={baseStats.health} onChange={event => handleOnChange("health", "baseStats", event.target.value)} /> {baseStats.health} <br/>
		Stamina <br/> <input type="range" min={0} max={30} value={baseStats.stamina} onChange={event => handleOnChange("stamina", "baseStats", event.target.value)} /> {baseStats.stamina}<br/>
		Attack <br/><input type="range" min={0} max={30} value={baseStats.attack} onChange={event => handleOnChange("attack", "baseStats", event.target.value)} /> {baseStats.attack}<br/>
		Adorable <br/><input type="range" min={0} max={30} value={baseStats.adorable} onChange={event => handleOnChange("adorable", "baseStats", event.target.value)} /> {baseStats.adorable} <br/>

		Price: {totalPrice} <i className="smallNotice">(* Initial price is 50)</i> <br/>
		<i className="errormessage">{overweightError ? "You have no more points left to add!" : ""} <br/></i>
		</div>

		</div>

		<div className="mintbutton"><button onClick={runMintingFunction}>Mint!</button></div>
		</div>
	</div>
  );
}