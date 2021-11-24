import React from "react";
import { Web3Storage, getFilesFromPath } from 'web3.storage'


function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
   return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUyYTQ2NDVmMTExMWMxNGUwMjRhODVmOTc0M0Q2MDViZkZBM2I2OEMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mzc2NjM5MjEzMzgsIm5hbWUiOiJNb29uZG9nZ2llcyJ9.SNHrRj96IT_zhRp0nL66cfZdNGb9Aiy-lukwMniGVUQ'

  // In a real app, it's better to read an access token from an 
  // environement variable or other configuration that's kept outside of 
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  //return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function getFiles(path) {
  const files = await getFilesFromPath(path)
  console.log(`read ${files.length} file(s) from ${path}`);
  return files
}

async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}


export const Marketplace = () : React.ReactElement => {
	const gotFiles = getFiles("../database");
	storeFiles(gotFiles);

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
