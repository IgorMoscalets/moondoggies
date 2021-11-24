import React from "react";

export const Login = () : React.ReactElement => {
	return (
	<div className="login">
		<div className="container">
		<div className="row justify-content-md-center">
				<div className="col-4"><button className="btn btn-primary login-connect" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
		Login with Email
	</button>
	<div className="collapse" id="collapseExample">
		<div className="card card-body">
			<form>
			<div className="form-group">
				<label htmlFor="exampleInputEmail1">Email address</label>
				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
				<small id="emailHelp" className="form-text text-muted">Well never share your email with anyone else.</small>
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputPassword1">Password</label>
				<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
			</div>
			<div className="form-check">
				<input type="checkbox" className="form-check-input" id="exampleCheck1" />
				<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
			</div>
			<button type="submit" className="btn btn-primary">Submit</button>
			</form>
			</div>
		</div></div>

		<div className="row justify-content-md-center">
			<div className="col-4"><button className="login-connect enableEthereumButton"><img src="metamask.svg" width="50" />Connect with Custom RPC</button>
			<h4>Accounts: <span className="showAccount"></span></h4></div>
		</div>
		<div className="row justify-content-md-center">
			<div className="col-4"><button className="login-connect enableCustomRpcButton">Get Our Contract Name</button>
			<h4>Contract Name: <span className="showAccount"></span></h4>
			<h4>Total Supply: <span className="showAccount"></span></h4>
			<h4>Owner Name: <span className="showAccount"></span></h4>
			</div>
		</div>


		</div>
	</div>

	</div>
	);
}
