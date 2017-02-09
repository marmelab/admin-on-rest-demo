import React from 'react';
import { Route } from 'react-router';
import Configuration from './configuration/Configuration';

export default () => (
    <Route>
        <Route path="/configuration" component={Configuration} />
    </Route>
);
