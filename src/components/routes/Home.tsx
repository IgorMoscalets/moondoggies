import React from "react";

export const Home = () : React.ReactElement => {
  return (
    <div className="col py-3">
           <div className="row">
            <h1>Wallet</h1>
            <div className="col deposit-buttons">
              <h1><p className="showBalance"></p></h1>
              <h2><p className="showUSD"></p></h2>
              <div className="row"><div className="col">
                <button>Deposit to Metamask</button>
              </div>
              <div className="col">
                <button>Withdraw from Metamask</button>
              </div></div>
              <h4>Metamask Address: <p className="showAccount"></p></h4>
            </div>
            <div className="col">
              <div className="row asset-card">
                <div className="col">1 NBMon</div>
                <div className="col">3 NBShard</div>
                <div className="col">1 NBXD</div>
              </div>
              <div className="row asset-card">
                <div className="col">0 BD</div>
                <div className="col">2 NBMNS</div>
              </div>
            </div>
           </div>
           <div className="row">
            <h1>Activities: | <a href="#" style={{fontSize: '20px'}}>View full activities</a></h1>
            <h2>Sep 03, 2021</h2>
            <ul className="activities-list">
              <li>You started t1</li>
              <li>fjklfkf</li>
              <li>fjkwsksdf</li>
              <li>slkfjsfd</li>
              <li>slfjsljdlsk</li>
            </ul> 
           </div>
        </div>
  );
}