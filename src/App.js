import 'babel-polyfill';
import React, { Component } from 'react';
import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import { simpleRestClient, Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';

import './App.css';
import data from './data';
import { VisitorList, VisitorCreate, VisitorEdit, VisitorIcon } from './visitors';

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
        const restClient = simpleRestClient('http://localhost:3000');
        const delayedRestClient = (type, resource, params) => new Promise(resolve => setTimeout(() => resolve(restClient(type, resource, params)), 1000));

        return (
            <Admin restClient={delayedRestClient} title="Example Admin">
                <Resource name="customers" list={VisitorList} create={VisitorCreate} edit={VisitorEdit} remove={Delete} icon={VisitorIcon} />
            </Admin>
        );
    }
}

export default App;
