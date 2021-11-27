import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../logo2.png";

export const Navigation = () : React.ReactElement => {
	return (
	<div className="navigation">
	<nav className="navbar navbar-expand-lg">
		<Link className="navbar-brand" to="/"><img src={Logo} width="90" /></Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
	</button>

	<div className="collapse navbar-collapse" id="navbarSupportedContent">
		<ul className="navbar-nav mr-auto">
			<li className="nav-item login-btn">
			<Link className="nav-link" to="/login">Login</Link>
			</li>
		</ul>
	</div>
	</nav>
    </div>


  );
}