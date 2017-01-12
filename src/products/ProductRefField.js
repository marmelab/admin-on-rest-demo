import React from 'react';
import { Link } from 'react-router';

const ProductRefField = ({ record, basePath }) =>
    <Link to={`${basePath}/${record.id}`}>{record.reference}</Link>;

ProductRefField.defaultProps = {
    source: 'product_id',
    label: 'Product',
};

export default ProductRefField;
