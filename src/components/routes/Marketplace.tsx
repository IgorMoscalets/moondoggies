import React from "react";

	import { NFTStorage, File } from 'nft.storage'

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ0MTU0RkE4MDRkNWU2QUQ3YTNDNWMwYTY2OTY2NzIyYzRDQjk4NTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNzc3MzQxMjI2MSwibmFtZSI6Ik1vb25Eb2dnaWVzIn0.XpBe6o3mVd2AVvvgbgSJ08HqUtUhf0GAURndDgTuxzA'
const client = new NFTStorage({ token: apiKey })

const metadata = await client.store({
	name: 'Pinpie',
	description: 'Pin is not delicious beef!',
	image: new File([{"done": "124214"}], 'pinpie.jpg', { type: 'image/jpg' })
})
console.log(metadata.url)
export const Marketplace = () : React.ReactElement => {

	/*const doggiesForSale = [];
	const listItems = doggiesForSale.map((d) => <div className="col-lg-4">	
				<a className="card-nonclickable" href="nbmon-1.html"><div className="nbmon-card">
					<h1>{d.name}</h1>
					<img src="nbmon1.png" width="200" style={{float: "right"}} />
					<h2>Health: {d.health} <br /> Stamina: {d.stamina} <br /> Attack: {d.attack}</h2>
				</div>	</a>

			</div>);*/

  return (
    <div className="marketplace">
    <div className="row">
			
	</div>
    </div>
  );
}
