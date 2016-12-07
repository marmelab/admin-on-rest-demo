import 'babel-polyfill';
import React, { Component } from 'react';
import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';

import './App.css';
import data from './data';
import { VisitorList, VisitorEdit, VisitorIcon } from './visitors';
import { CommandList, CommandEdit, CommandIcon } from './commands';

class App extends Component {
    componentWillMount() {
        const restServer = new FakeRest.FetchServer('http://localhost:3000');
        restServer.init(data);
        restServer.toggleLogging(); // logging is off by default, enable it
        fetchMock.mock('^http://localhost:3000', restServer.getHandler());
    }

    componentWillUnmount() {
        fetchMock.restore();
    }

    render() {
        return (
            <Admin restClient={simpleRestClient('http://localhost:3000')} title="Posters Galore Admin">
                <Resource name="customers" list={VisitorList} edit={VisitorEdit} remove={Delete} icon={VisitorIcon} />
                <Resource name="commands" list={CommandList} edit={CommandEdit} remove={Delete} icon={CommandIcon} />
            </Admin>
        );
    }
}

export default App;
