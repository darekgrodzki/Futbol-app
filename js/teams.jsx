import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import cacheProxy from './cacheProxy';

export class Teams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            teams: [],
            loading: true,
            id: ""
        }

    }
    componentDidMount() {

        this.setState({
            id: this.props.match.params.id
        }, () => {
            cacheProxy.get('https://api.football-data.org/v1/competitions/' + `${this.state.id}` + '/teams').then(Obj => {
                console.log(Obj);
                this.setState({teams: Obj.teams, loading: false});

            });
        })
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            id: nextProps.match.params.id,
            loading: true
        }, () => {
            cacheProxy.get('https://api.football-data.org/v1/competitions/' + `${this.state.id}` + '/teams').then(Obj => {
                this.setState({teams: Obj.teams, loading: false});
            });
        })
    }
    render() {

        if (this.state.loading) {
            return null;
        }

        const listOfTeams = this.state.teams.map((item, index) => {

            return <Link to={`/teams/${this.state.id}/players/${index}`} key={index} style={{
                color: 'black',
                textDecoration: 'none'
            }}>
                <li style={{
                    listStyleType: 'none',
                    paddingLeft: '25px'
                }}>{item.name}</li>
            </Link>;
        });

        return <div style={{
            width: '33%',
            height: '100vh',
            backgroundColor: 'white'
        }}>
            <h3 style={{
                textAlign: 'center'
            }}>Wybierz drużynę:</h3>
            <p>{listOfTeams}</p>
        </div>;
    }
}
