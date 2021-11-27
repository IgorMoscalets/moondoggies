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

import { Accessories } from "../../utils/Accessories";


export const Breeding = () : React.ReactElement => {
	const canvasRef = useRef(null);

	const width = 1000;
	const height = 1000;
	const INITIAL_PRICE = 50;

	const getImageByName = {
		"Magic Wand": MDWand,
		"Magic Collar": MDMagicCollar,
		"Magic Moon Collar": MDMagicMoonCollar,
		"Helmet": MDHelmet,
		"Magic Hat": MDMagicHat,
		"Simple Hat": MDSimpleHat,
		"Magic Shield": MDMagicShield,
		"Armor Lvl 1": MDArmorLvl1,
		"Armor Lvl 2": MDArmorLvl2,
		"Armor Lvl 3": MDArmorLvl3
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

	const [totalPrice, setTotalPrice] = useState(INITIAL_PRICE);

	const [overweightError, setOverweightError] = useState(false);

	const currentUserTokenCount = 200;

	
	// generate a random color hue
	const genColor = () => {
		const hue = Math.floor(Math.random() * 360);
		const pastel = `hsl(${hue}, 100%, 85%)`;
		return pastel;
	};


	const drawImage = async (_image, ctx) => {
		const image = new Image();
		image.src = _image;
		await image.decode();
		ctx.drawImage(image, 0, 0, 1000, 1000);
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
		
		const base64ImgData = canvas.toDataURL();
		//const base64 = base64ImgData.toString("base64");

		console.log(base64ImgData);
	}, [])


	
	const handleOnChange = async (position, inputType, value) => {
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
		await drawImage(MDBase, ctx);


		if(baseStats.adorable > 0 || (Accessories[position].adorable != 0 && updatedCheckedState[position] != false)){
			await drawImage(MDMagicUp, ctx);
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
			drawImage(MDAdorable100, ctx);
		}
		else if(baseStats.adorable + newBuffedArr.adorable >= 80){
			drawImage(MDAdorable80, ctx);
		}
		else if(baseStats.adorable + newBuffedArr.adorable >= 60){
			drawImage(MDAdorable60, ctx);
		}
		else if(baseStats.adorable + newBuffedArr.adorable >= 40){
			drawImage(MDAdorable40, ctx);
		}
		else if(baseStats.adorable + newBuffedArr.adorable >= 30){
			drawImage(MDAdorable30, ctx);
		}

	}
		else if(inputType == "baseStats"){

			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			await resetCanvas(ctx.fillStyle, ctx);
			await drawImage(MDBase, ctx);

			console.log(parseInt(value));
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

			
			//console.log(newBaseStats);
			//console.log(baseStats.health);
			setStm(stm + 1);
			if(stm > 10000){setStm(0)}
		}
		
	};

  return (
		<div className="row">
		<div className="col-6">
		{overweightError ? "You have no more points left to add!" : ""} <br/>
		Base Stats: (You have {30-baseStats.health-baseStats.attack-baseStats.adorable-baseStats.stamina} points) <br/>
		Health: <input type="range" min={0} max={30} value={baseStats.health} onChange={event => handleOnChange("health", "baseStats", event.target.value)} /> {baseStats.health} <br/>
		Stamina: <input type="range" min={0} max={30} value={baseStats.stamina} onChange={event => handleOnChange("stamina", "baseStats", event.target.value)} /> {baseStats.stamina}<br/>
		Attack: <input type="range" min={0} max={30} value={baseStats.attack} onChange={event => handleOnChange("attack", "baseStats", event.target.value)} /> {baseStats.attack}<br/>
		Adorable: <input type="range" min={0} max={30} value={baseStats.adorable} onChange={event => handleOnChange("adorable", "baseStats", event.target.value)} /> {baseStats.adorable} <br/>

		Price: {totalPrice} (* Initial price is 50) Current Wallet: {currentUserTokenCount}
		<div className="row">
			{
				Accessories.map(({name, attack, stamina, health, adorable, stun, aclass, price}, index) => {
					return(
							<div key={index} className="accessories-item col-4 card">
								Name: {name} <br/>
								Attack: {attack}<br/>
								Stamina: {stamina}<br/>
								Health: {health}<br/>
								Adorable: {adorable}<br/>
								Stun: {stun}<br/>
								Class: {aclass}<br/>
								Price: {price}<br/>
								<input type="checkbox"
								name={name}
								value={name}
								checked={checkedState[index]}
								onChange={event => {handleOnChange(index, "checkbox", event.target.value)}} />
							</div>
					);
				})
			}
		</div>
		</div>
		<div className="col-5">
			<canvas ref={canvasRef}/> <br/>
		Final: 
		Name: Moonie
		Attack: {baseStats.attack} + {buffedStats.attack} (Buff) <br/>
		Stamina: {baseStats.stamina} + {buffedStats.stamina} (Buff) <br/>
		Health: {baseStats.health} + {buffedStats.health} (Buff) <br/>
		Adorable: {baseStats.adorable} + {buffedStats.adorable} (Buff) <br/>
		Stun: {buffedStats.stun} (Buff) <br/>
		</div>
	</div>
  );
}