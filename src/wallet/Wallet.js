import React, {Component} from 'react';
import axios from "axios"
class Wallet extends Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		url:
	// 	}
	// }
	componentDidMount() {
		axios.get(this.props.url)
		.then(res => {
			console.log("first res", res)

			return res.json()
		})
		.then(rese => {
			console.log("RES",rese)
			// console.log("rese", res.json())
		});
	}

	render() {
		return (
			<div>Hello {this.props.url}</div>
		);
	}
}


export default Wallet;

