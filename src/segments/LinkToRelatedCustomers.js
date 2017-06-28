import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { translate } from 'admin-on-rest';
import { stringify } from 'query-string';

import { VisitorIcon } from '../visitors';

const LinkToRelatedCustomers = ({ segment, translate }) => (
    <FlatButton
        primary
        label={translate('resources.segments.fields.customers')}
        icon={<VisitorIcon />}
        containerElement={<Link to={{
            pathname: "/customers",
            search: stringify({ page: 1, perPage: 25, filter: JSON.stringify({ groups: segment }) }),
        }} />}
    />
);

export default translate(LinkToRelatedCustomers);
