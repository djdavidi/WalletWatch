import React, { Component } from 'react';
import './App.css';
import Wallet from "./wallet/Wallet"

const fakeUserData = {url: "https://blockchain.info/rawaddr/1Mz7153HMuxXTuR2R1t78mGSdzaAtNbBWX", type: "Bitcoin"}
class App extends Component {
  render() {
    return (
      <div className="App">
          <Wallet url={fakeUserData.url} type={fakeUserData.type}></Wallet>
      </div>
    );
  }
}

export default App;

