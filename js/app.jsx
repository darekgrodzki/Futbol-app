import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import cacheProxy from './cacheProxy';
import {Players} from './teamplayers.jsx';
import {Leagues} from './leagues.jsx';
import {Teams} from './teams.jsx';

document.addEventListener('DOMContentLoaded', function() {

    class App extends React.Component {

        render() { 

            return (
                <BrowserRouter>
                    <div style={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex'
                    }}>
                        <Route path="/" component={Leagues}/>
                        <Route path="/teams/:id" component={Teams}/>
                        <Route path="/teams/:id/players/:name" component={Players}/>
                    </div>
                </BrowserRouter>
            );

        }
    }

    ReactDOM.render(
        <App/>, document.getElementById('app'));
});
