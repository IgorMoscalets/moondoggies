import React from "react";

export const Accessories = () : React.ReactElement => {

		const accessoriesForSale = [{"name" : "Rob", 
							"health" : 20,
							"stamina" : 15,
							"attack" : 30,
							"adorable" : 20,
							"specie" : "moondog"},
							{"name" : "Mikey", 
							"health" : 20,
							"stamina" : 15,
							"attack" : 30,
							"adorable" : 20,
							"specie" : "Doge"},
							{"name" : "Kake", 
							"health" : 25,
							"stamina" : 30,
							"attack" : 35,
							"adorable" : 21,
							"specie" : "Zaddy"},
							{"name" : "Rob", 
							"health" : 20,
							"stamina" : 25,
							"attack" : 30,
							"adorable" : 20,
							"specie" : "Kadet"},
							{"name" : "Cane", 
							"health" : 25,
							"stamina" : 15,
							"attack" : 35,
							"adorable" : 20,
							"specie" : "moondog"},
							{"name" : "Booche", 
							"health" : 20,
							"stamina" : 15,
							"attack" : 30,
							"adorable" : 20,
							"specie" : "moondog"}, ];
	const listItems = accessoriesForSale.map( (d) => <div className="col-lg-4" key={d.name}>	
				<a className="card-nonclickable" href="nbmon-1.html"><div className="nbmon-card">
					<h1>{d.name}</h1>
					<img src="nbmon1.png" width="200" style={{float: "right"}} />
					<h2>Health: {d.health} <br /> Stamina: {d.stamina} <br /> Attack: {d.attack}</h2>
				</div>	</a>

			</div>);



  return (
    <div className="marketplace">
    <div className="row">
			{ listItems }
	</div>
    </div>
  );
}