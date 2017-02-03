import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

import { ProductIcon } from '../products';

const LinkToRelatedProducts = ({ record }) => (
    <FlatButton
        primary
        label="Products"
        icon={<ProductIcon />}
        containerElement={<Link to="/products" query={{ filter: JSON.stringify({ category_id: record.id }) }} />}
    />
);

export default LinkToRelatedProducts;
