import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import ListCharacters from './components/ListCharacters';
import Character from './components/AsyncCharacter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">

                    <Router>
                        <div>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/list-characters" component={ListCharacters} />
                            <Route path="/list-characters/:page" component={ListCharacters} />
                            <Route path="/character/:characterId" component={Character} />
                        </div>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;




