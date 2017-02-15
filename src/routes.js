import React from 'react';
import { Route } from 'react-router';
import Configuration from './configuration/Configuration';
import Segments from './segments/Segments';

export default () => (
    <Route>
        <Route path="/configuration" component={Configuration} />
        <Route path="/segments" component={Segments} />
    </Route>
);
