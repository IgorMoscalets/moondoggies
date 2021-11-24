import React from "react";
export const Doggies = () : React.ReactElement => {
  return (
    <div className="marketplace">
      <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Marketplace</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Filter</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Search</span></a>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
        <div className="col py-3">
			<div className="row">
			<div className="col">
				<a className="card-nonclickable" href="nbmon-1.html"><div className="nbmon-card">
					<h1>Real NBMON</h1>
					<img src="nbmon1.png" width="200" style={{float: "right"}} />
					<h2>Energy: 10 <br /> Stamina: 20 <br /> Health: 25</h2>
				</div>	</a>
			</div>
			<div className="col">
				<a className="card-nonclickable" href="nbmon-1.html"><div className="nbmon-card">
					<h1>Real NBMON</h1>
					<img src="nbmon2.png" width="200" style={{float: "right"}} />
					<h2>Energy: 10 <br /> Stamina: 20 <br /> Health: 25</h2>
				</div>	</a>
			</div>
			<div className="col">
				<a className="card-nonclickable" href="nbmon-1.html"><div className="nbmon-card">
					<h1>Real NBMON</h1>
					<img src="nbmon2.png" width="200" style={{float: "right"}} />
					<h2>Energy: 10 <br /> Stamina: 20 <br /> Health: 25</h2>
				</div>	</a>
			</div>

		</div>
		<div className="row">
			<div className="col">
				<a className="card-nonclickable" href="nbmon-1.html"><div className="nbmon-card">
					<h1>Real NBMON</h1>
					<img src="nbmon3.png" width="200" style={{float: "right"}} />
					<h2>Energy: 10 <br /> Stamina: 20 <br /> Health: 25</h2>
				</div>	</a>
			</div>
			<div className="col">
				<a className="card-nonclickable" href="nbmon-1.html"><div className="nbmon-card">
					<h1>Real NBMON</h1>
					<img src="nbmon1.png" width="200" style={{float: "right"}} />
					<h2>Energy: 10 <br /> Stamina: 20 <br /> Health: 25</h2>
				</div>	</a>
			</div>
		</div>
        </div>
    </div>
</div>
    </div>
  );
}