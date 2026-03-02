import React from "react";
import Coin from "./Coin";

const CoinWrapper = () => {
    // The Coin component now handles the layout consistently with the main Navbar 
    // being visible globally (as updated in App.jsx).
    // We removed the conditional sidebar here to ensure a full-width, 
    // professional market analysis experience.
    return <Coin />;
};

export default CoinWrapper;
