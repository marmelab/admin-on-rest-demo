import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { translate } from 'admin-on-rest';

import { VisitorIcon } from '../visitors';

const LinkToRelatedCustomers = ({ segment, translate }) => (
    <FlatButton
        primary
        label={translate('resources.segments.fields.customers')}
        icon={<VisitorIcon />}
        containerElement={<Link to={{ pathname: "/customers", query: { filter: JSON.stringify({ groups: segment }) } }} />}
    />
);

export default translate(LinkToRelatedCustomers);
