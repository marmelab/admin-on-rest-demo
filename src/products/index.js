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
import RichTextInput from 'aor-rich-text-input';

import Poster from './Poster';
import ProductRefField from './ProductRefField';

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

const ImageField = ({ record }) => <img src={record.thumbnail} style={{ width: 25, maxWidth: 25, maxHeight: 25 }} role="presentation" />;
ImageField.defaultProps = {
    style: { padding: '0 0 0 16px' }
}

export const ProductList = (props) => (
    <List {...props} filter={<ProductFilter />} perPage={25}>
        <Datagrid>
            <ImageField />
            <ProductRefField source="reference" />
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

const ProductTitle = ({ record }) => <span>Poster #{record.reference}</span>;
export const ProductEdit = (props) => (
    <Edit {...props} title={<ProductTitle />}>
        <SimpleForm>
            <Poster />
            <TextInput source="reference" />
            <NumberInput source="price" elStyle={{ width: '5em' }} />
            <NumberInput source="width" style={{ display: 'inline-block' }} elStyle={{ width: '5em' }} />
            <NumberInput source="height" style={{ display: 'inline-block', marginLeft: 32 }} elStyle={{ width: '5em' }} />
            <ReferenceInput label="Category" source="category_id" reference="categories">
                <SelectInput source="name" />
            </ReferenceInput>
            <NumberInput source="stock" elStyle={{ width: '5em' }} />
            <RichTextInput source="description" />
            <div style={{ clear: 'both' }} />
        </SimpleForm>
    </Edit>
);
