import React from "react";

export const Footer = () : React.ReactElement => {
return(
    <footer className="text-center text-lg-start">
    <section
        className="d-flex justify-content-center justify-content-lg-between p-4"
    >
    </section>
    <section className="">
        <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>MoonDoggies
            </h6>
            <p>
                MoonDoggies is a NFT based game with possibility of creating your new MNDs (MoonDoggies Tokens) by base or by breeding them, with PVP fighting and its own marketplace.
            </p>
            </div>
        
            
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            
            <h6 className="text-uppercase fw-bold mb-4">
                Useful links
            </h6>
            <p>
                <a href="https://github.com/IgorMoscalets/moondoggies" className="text-reset">Github</a>
            </p>
            <p>
                <a href="#!" className="text-reset">Project Video</a>
            </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            
            <h6 className="text-uppercase fw-bold mb-4">
                Contact
            </h6>
            <p><i className="fa fa-home me-3"></i> Chisinau, Moldova</p>
            <p>
                <i className="fa fa-envelope me-3"></i> moondoggies@gmail.com
            </p>
            <p><i className="fa fa-phone me-3"></i> + 373 78 617 607</p>
            </div>
            
        </div>
        
        </div>
    </section>

    <div className="text-center p-4">
        © 2021 Copyright: <b>Igor Moscalets</b>
    </div>
    </footer>
);
}
