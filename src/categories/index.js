import React from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    List,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/action/bookmark';

import ThumbnailField from '../products/ThumbnailField';
import ProductRefField from '../products/ProductRefField';

export const CategoryIcon = Icon;

export const CategoryList = (props) => (
    <List {...props} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid >
            <TextField source="name" style={{ padding: '0 12px 0 25px' }} />
            <EditButton />
        </Datagrid>
    </List>
);

const CategoryTitle = ({ record }) => <span>Category "{record.name}"</span>;
export const CategoryEdit = (props) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceManyField reference="products" target="category_id" label="Orders" perPage={5}>
                <Datagrid>
                    <ThumbnailField />
                    <ProductRefField source="reference" />
                    <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
                    <NumberField source="width" options={{ minimumFractionDigits: 2 }} />
                    <NumberField source="height" options={{ minimumFractionDigits: 2 }} />
                    <NumberField source="stock" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);
