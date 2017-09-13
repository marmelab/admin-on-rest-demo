import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { translate } from 'admin-on-rest';
import { stringify } from 'query-string';

import { ProductIcon } from '../products';

const LinkToRelatedProducts = ({ record, translate }) => (
    <FlatButton
        primary
        label={translate('resources.categories.fields.products')}
        icon={<ProductIcon />}
        containerElement={<Link
            to={{
                pathname: '/products',
                search: stringify({ page: 1, perPage: 25, filter: JSON.stringify({ category_id: record.id }) }),
            }}
        />}
    />
);

export default translate(LinkToRelatedProducts);
