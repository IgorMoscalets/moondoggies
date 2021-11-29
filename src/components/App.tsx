import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Accessories, Marketplace, Home, Login, Breeding, Battle, Doggies, Navigation, Sidebar, Footer} from "./routes";

export const App = (): React.ReactElement => {

    return(


      <BrowserRouter>
        <Navigation />
    <div className="main-cont">
      <div className="container-fluid">
    <div className="row flex-nowrap">
    <Sidebar />
      <div className="sizingwsidebar">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/breeding" element={<Breeding />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/doggies" element={<Doggies />} />
          <Route path="/accessories" element={<Accessories />} />
        </Routes>
      </div>
      </div>
      </div>
    <Footer />
      </div>
      </BrowserRouter>
      );
}
