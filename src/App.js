import React, { Component } from 'react';
import './App.css';
import Wallet from "./wallet/Wallet"

const fakeUserData = {
	address: "1Mz7153HMuxXTuR2R1t78mGSdzaAtNbBWX",
	baseUrl: "https://blockchain.info/multiaddr?cors=true&n=100&active=",
	type: "Bitcoin"
};

class App extends Component {
  render() {
    return (
      <div className="App">
          <Wallet user={fakeUserData}></Wallet>
      </div>
    );
  }
}

export default App;

