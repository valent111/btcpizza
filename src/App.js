import React, { Component } from "react";
import Bitcoin from "./contracts/Bitcoin.json";
import getWeb3 from "./getWeb3";
import Pizza from "./contracts/Pizza.json";
import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const btccontractaddress = Bitcoin.networks[networkId];
      const btcContract = new web3.eth.Contract(
        Bitcoin.abi,
        btccontractaddress && btccontractaddress.address
      );
      const pizzaAddress = Pizza.networks[networkId];
      const pizzaContract = new web3.eth.Contract(
        Pizza.abi,
        pizzaAddress && pizzaAddress.address
      );
      this.setState({ web3, accounts, btcContract, pizzaContract });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, please wait...</div>;
    }
    return (
      <div className="App">
        <div className="item1">
          <h1>Mine bitcoin and buy pizza</h1>
          <h2>Christmas offer: price reduced from 10000$BTC to 0 </h2>
          <img src="https://cdn.pixabay.com/photo/2021/08/20/15/36/cryptocurrency-6560735_960_720.png"></img>
        </div>
        <div className="item2">
          <button
            class="cybr-btn"
            onClick={() => {
              this.state.btcContract.methods
                .mine(this.state.accounts[0])
                .send({ from: this.state.accounts[0] });
            }}
          >
            Mine bitcoin<span aria-hidden>_</span>
            <span aria-hidden class="cybr-btn__glitch">
              Mine bitcoin
            </span>
            <span aria-hidden class="cybr-btn__tag">
              R25
            </span>
          </button>
          <button
            class="cybr-btn"
            onClick={() => {
              this.state.pizzaContract.methods
                .safeMint(this.state.accounts[0])
                .send({ from: this.state.accounts[0] });
            }}
          >
            Buy pizza<span aria-hidden>_</span>
            <span aria-hidden class="cybr-btn__glitch">
              Buy pizza
            </span>
            <span aria-hidden class="cybr-btn__tag">
              R25
            </span>
          </button>
        </div>
        <a href="https://github.com/valent111/btcpizza">Source code</a>
      </div>
    );
  }
}

export default App;
