import React from 'react';
import './App.css';
import STORE from './STORE';
import NotefulApp from './NotefulApp/NotefulApp';

class App extends React.Component {
	state = {
		folders: STORE.folders,
		notes: STORE.notes
	}
	render() {
		return (
			<div className="App">
				<NotefulApp />
			</div>
		);
	}
}

export default App;