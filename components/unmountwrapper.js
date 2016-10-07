import React from 'react';

// Demo mount/unmount action
export default class UnMountWrapper extends React.Component {
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