import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import cacheProxy from './cacheProxy';

export class Players extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            loading: true,
            team: "",
            href: "",
            players: []
        }
    }
    componentDidMount() {

        this.setState({
            id: this.props.match.params.id,
            team: this.props.match.params.name,
            loading: true
        }, () => {
            cacheProxy.get('http://api.football-data.org/v1/competitions/' + `${this.state.id}` + '/teams').then(Obj => {
                this.setState({
                    href: Obj.teams[this.state.team]._links.players.href
                });
                cacheProxy.get(`${this.state.href}`).then(Object => {
                    this.setState({players: Object.players, loading: false});
                });
            });
        },)
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            id: nextProps.match.params.id,
            team: nextProps.match.params.name,
            loading: true
        }, () => {
            cacheProxy.get('http://api.football-data.org/v1/competitions/' + `${this.state.id}` + '/teams').then(Obj => {
                this.setState({
                    href: Obj.teams[this.state.team]._links.players.href
                });
                cacheProxy.get(`${this.state.href}`).then(Object => {
                    this.setState({players: Object.players, loading: false});
                });
            });
        },)
    }

    render() {

        if (this.state.loading) {
            return null;
        }
        if (this.state.players.length === 0) {
            return <div style={{
                width: '33%',
                height: '100vh',
                backgroundColor: 'green'
            }}>
                <h3 style={{
                    textAlign: 'center'
                }}>Niestety, nie mamy listy zawodników</h3>

            </div>;
        }

        const listOfPlayers = this.state.players.map((item, index) => {
            return <li key={index} style={{
                listStyleType: 'none',
                paddingLeft: '25px'
            }}>{item.name}</li>;
        });

        return <div style={{
            width: '33%',
            height: '100vh',
            backgroundColor: 'green'
        }}>
            <h3 style={{
                textAlign: 'center'
            }}>Lista zawodników</h3>
            <p>{listOfPlayers}</p>

        </div>;
    }
}
