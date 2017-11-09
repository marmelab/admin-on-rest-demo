import React from 'react';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';
import { stringify } from 'query-string';

import { VisitorIcon } from '../visitors';

const LinkToRelatedCustomers = ({ segment, translate }) => (
    <Button
        color="primary"
        containerElement={
            <Link
                to={{
                    pathname: '/customers',
                    search: stringify({
                        page: 1,
                        perPage: 25,
                        filter: JSON.stringify({ groups: segment }),
                    }),
                }}
            />
        }
    >
        <VisitorIcon />
        {translate('resources.segments.fields.customers')}
    </Button>
);

export default translate(LinkToRelatedCustomers);
