import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import cacheProxy from './cacheProxy';

export class Leagues extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leagues: [],
            loading: true
        }
    }

    componentDidMount() {

        cacheProxy.get('https://api.football-data.org/v1/competitions').then(dataObj => {
            this.setState({leagues: dataObj, loading: false});
        });
    }
    render() {

        if (this.state.loading) {
            return null;
        }
        const listOfLeagues = this.state.leagues.map((item) => {
            return <Link to={`/teams/${item.id}`} key={item.id} style={{
                color: 'black',
                textDecoration: 'none'
            }}>
                <li style={{
                    listStyleType: 'none',
                    paddingLeft: '25px'
                }}>{item.caption}</li>
            </Link>;
        });

        return <div style={{
            width: '33%',
            height: '100vh',
            backgroundColor: 'red'
        }}>
            <h3 style={{
                textAlign: 'center'
            }}>Wybierz ligę:</h3>
            <p>{listOfLeagues}</p>
        </div>;
    }
}
