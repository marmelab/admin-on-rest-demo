import React from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    List,
    NumberField,
    NumberInput,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';

import Icon from 'material-ui/svg-icons/social/person';

export const ProductList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="reference" />
            <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
            <NumberField source="width" options={{ minimumFractionDigits: 2 }} />
            <NumberField source="height" options={{ minimumFractionDigits: 2 }} />
            <EditButton />
        </Datagrid>
    </List>
);

export const ProductEdit = (props) => (
    <Edit {...props}>
        <TextInput source="reference" />
        <NumberInput source="price" />
        <NumberInput source="width" style={{ display: 'inline-block' }} />
        <NumberInput source="height" style={{ display: 'inline-block', marginLeft: 32 }} />
    </Edit>
);
