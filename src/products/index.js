import React from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    Filter,
    List,
    NumberField,
    NumberInput,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';

import Icon from 'material-ui/svg-icons/image/collections';

export const ProductIcon = Icon;

export const ProductFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Category" source="category_id" reference="categories">
            <SelectInput source="name" />
        </ReferenceInput>
        <NumberInput label="Min width" source="width_gte" />
        <NumberInput label="Max width" source="width_lte" />
        <NumberInput label="Min height" source="height_gte" />
        <NumberInput label="Max height" source="height_lte" />
        <NumberInput label="Low Stock" source="stock_lte" />
    </Filter>
);

export const ProductList = (props) => (
    <List {...props} filter={<ProductFilter />}>
        <Datagrid>
            <TextField source="reference" />
            <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
            <NumberField source="width" options={{ minimumFractionDigits: 2 }} />
            <NumberField source="height" options={{ minimumFractionDigits: 2 }} />
            <ReferenceField source="category_id" reference="categories" label="Category">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="stock" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ProductEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="reference" />
            <NumberInput source="price" />
            <NumberInput source="width" style={{ display: 'inline-block' }} />
            <NumberInput source="height" style={{ display: 'inline-block', marginLeft: 32 }} />
        </SimpleForm>
    </Edit>
);
