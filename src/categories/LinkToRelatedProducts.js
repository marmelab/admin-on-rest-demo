import React from 'react';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';
import { stringify } from 'query-string';

import { ProductIcon } from '../products';

const LinkToRelatedProducts = ({ record, translate }) => (
    <Button
        color="primary"
        containerElement={
            <Link
                to={{
                    pathname: '/products',
                    search: stringify({
                        page: 1,
                        perPage: 25,
                        filter: JSON.stringify({ category_id: record.id }),
                    }),
                }}
            />
        }
    >
        <ProductIcon />
        {translate('resources.categories.fields.products')}
    </Button>
);

export default translate(LinkToRelatedProducts);
