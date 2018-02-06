import React, {Component} from 'react';
// import HeaderTag from "./HeaderTag"
class Wallet extends Component {
	constructor() {
		super();
		this.state = {
			data: {},
			txs: []
		}
	}
	componentDidMount() {
		// could implement fetch indefinite tx length
		// by checking if txs < wallet.n_tx and going until have all
		// but not doing it for the purposes of this exercise
		let url = this.props.user.baseUrl + this.props.user.address
		console.log(url)
		fetch(url, { method: 'GET',
				mode: "cors",
               cache: 'default' })
		.then(res => {
			return res.json()
		})
		.then(response => {
			this.setState({data: response});
			this.setState({txs: response.txs});
			console.log(this.state.data);
			this.connection = new WebSocket("wss://ws.blockchain.info/inv");

			this.connection.onopen = () => this.connection.send({"op":"addr_sub", "addr": this.props.user.address})
			this.connection.onmessage = evt => {
				this.setState({
					txs: evt.data.concat(this.state.txs)
				})
			}
		});
	}

	render() {
		function convertSatToBit(num) {
			return `${num/100000000} BTC`;
		}
		function convertUnixToDate(timestamp){
			// in a real project would use moment.js
			return new Date(timestamp * 1000);
		}
		return (
			<div className="wallet-container">
				<div className="wallet-header">
				
				<div><span>ADDRESS</span> : {this.props.user.address}</div>
				<div><span>BALANCE</span> : {this.state.data.wallet ? convertSatToBit(this.state.data.wallet.final_balance): ""}</div>
				</div>
				<div className="user-table">
					<div className="table-header">
						<div><span>From</span></div>
						<div><span>Amount</span></div>
						<div><span>Date</span></div>
					</div>	
					<div className="wallet-transactions">
					{ this.state.txs ? (
						this.state.txs.map(elem =>
							<div key={elem.hash}>
								<div>
									{elem.result > 0 ? elem.inputs[0].prev_out.addr : elem.out[0].addr}
								</div>
								<div className={elem.result > 0 ? "gain" : "loss"}>
									{convertSatToBit(elem.result)}
								</div>
								<div>
									{convertUnixToDate(elem.time).toUTCString()}
								</div>
							</div>
						)) : (
						<div>empty</div>
					)}
					</div>
				</div>
			</div>
		);
	}
}

export default Wallet;

