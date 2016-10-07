import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './components/slider';
import UnMountWrapper from './components/unmountwrapper';

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
		this.changeMsg = this.changeMsg.bind(this)
		this.addLove = this.addLove.bind(this)
	}
	changeMsg(e) {
		this.setState({
			message: e.target.value
		})
	}
	addLove(e) {
		console.log('--- addLove() is called');
		this.setState({
			love: this.state.love + 1
		})
	}
	update(e) {
		this.setState({
			red: ReactDOM.findDOMNode(this.refs.red).value,
			green: ReactDOM.findDOMNode(this.refs.green).value,
			blue: ReactDOM.findDOMNode(this.refs.blue).value
		})
	}
	render() {
	    console.log('rendering')
        return <div>
	        <h3>Props Text</h3>
	        <TextInput txt="{this.state.message}" update={this.changeMsg} />
	        {this.state.message}

	        <h3>Owner/Ownee Slider</h3>
	        <Slider ref="red" update={this.update}/>
	        {this.state.red}<br/>
	        <Slider ref="green" update={this.update}/>
	        {this.state.green}<br/>
	        <Slider ref="blue" update={this.update}/>
	        {this.state.blue}<br/>

	        <h3>Child properties</h3>
	        <Button update={this.addLove}>I <Heart/> React</Button> React is <Heart/> {this.state.love} times by machine and YOU
        </div>
    }

	// some component lifecycle calls
	componentWillMount() {
		console.log('mounting', ReactDOM.findDOMNode(this)); // don't know about this node yet, so it will be null
	}
	componentDidMount() {
		console.log('mounted', ReactDOM.findDOMNode(this));
		this.increase = setInterval(this.addLove, 2000); // check the screen console for increasing rendering call
	}
	componentWillUnmount() {
		console.log('will unmount', ReactDOM.findDOMNode(this));
		clearInterval(this.increase); // clean up interval
	}
	shouldComponentUpdate(nextProps, nextState) {
		let machineLoveNotReached = nextState.love < 4; // Limit machine love to 3 times only :)
		if (!machineLoveNotReached) {
			clearInterval(this.increase); // clean up interval
		}
		return machineLoveNotReached;
	}
	componentDidUpdate(prevProps, prevState) {
		console.log('prevState', prevState);
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


export default App