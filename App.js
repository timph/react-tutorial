import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './components/slider';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			// simple props
			message: '',
			// ownnee props
			red: 0,
			green: 0,
			blue: 0,
			// component lifecycle
			love: 0,
			// end of block of state :)
			eob: 0
		}

		this.update = this.update.bind(this)
	}
	update(e) {
		this.setState({
			message: e.target.value,
			red: ReactDOM.findDOMNode(this.refs.red).value,
			green: ReactDOM.findDOMNode(this.refs.green).value,
			blue: ReactDOM.findDOMNode(this.refs.blue).value,
			love: this.state.love + 1,
			eob: 0
		})
	}
	render() {
	    console.log('rendering')
        return <div>
	        <h3>Props Text</h3>
	        <TextInput txt="{this.state.message}" update={this.update} />
	        {this.state.message}

	        <h3>Owner/Ownee Slider</h3>
	        <Slider ref="red" update={this.update}/>
	        {this.state.red}<br/>
	        <Slider ref="green" update={this.update}/>
	        {this.state.green}<br/>
	        <Slider ref="blue" update={this.update}/>
	        {this.state.blue}<br/>

	        <h3>Child properties</h3>
	        <Button update={this.update}>I <Heart/> React {this.state.love} times</Button> I heart React is children
        </div>
    }

	// some component lifecycle calls
	componentWillMount() {
		console.log('mounting')
	}
	componentDidMount() {
		console.log('mounted')
	}
	componentWillUnmount() {
		console.log('will unmount')
	}
}

// dumb component
const TextInput = (props) => <div><input type = "text" onChange={props.update} /></div>

class Button extends React.Component {
	render() {
		return <button onClick={this.props.update}>{this.props.children}</button>
	}
}

// Nested stateless component
const Heart = () => <span className="glyphicon glyphicon-heart"></span>

// Demo mount/unmount action
class UnMountWrapper extends React.Component {
	constructor() {
		super();
	}
	mount() {
		ReactDOM.render(<App/>, document.getElementById('mountee'))
	}
	unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('mountee'))
	}
	render() {
		return <div>
			<button onClick={this.mount.bind(this)}>Mount</button>
			<button onClick={this.unmount.bind(this)}>Unmount</button>
			<div id="mountee">Put the App here</div>
		</div>
	}
}
// See it in action with
// export default UnMountWrapper

export default App