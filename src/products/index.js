import React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    Filter,
    FormTab,
    List,
    NumberField,
    NumberInput,
    ReferenceField,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/image/collections';
import RichTextInput from 'aor-rich-text-input';

import Poster from './Poster';
import ProductRefField from './ProductRefField';
import ThumbnailField from './ThumbnailField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from '../reviews/StarRatingField';

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
    <List {...props} filter={<ProductFilter />} perPage={25}>
        <Datagrid>
            <ThumbnailField />
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
        <TabbedForm>
            <FormTab label="Image">
                <Poster />
                <TextInput source="image" options={{ fullWidth: true }} />
                <TextInput source="thumbnail" options={{ fullWidth: true }} />
            </FormTab>
            <FormTab label="Details">
                <TextInput source="reference" />
                <NumberInput source="price" elStyle={{ width: '5em' }} />
                <NumberInput source="width" style={{ display: 'inline-block' }} elStyle={{ width: '5em' }} />
                <NumberInput source="height" style={{ display: 'inline-block', marginLeft: 32 }} elStyle={{ width: '5em' }} />
                <ReferenceInput label="Category" source="category_id" reference="categories">
                    <SelectInput source="name" />
                </ReferenceInput>
                <NumberInput source="stock" elStyle={{ width: '5em' }} />
            </FormTab>
            <FormTab label="Description">
                <RichTextInput source="description" addLabel={false}/>
            </FormTab>
            <FormTab label="Reviews">
                <ReferenceManyField reference="reviews" target="product_id" addLabel={false}>
                    <Datagrid>
                        <DateField source="date" />
                        <CustomerReferenceField />
                        <StarRatingField />
                        <TextField source="comment" style={{ maxWidth: '20em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
                        <TextField source="status" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
        </TabbedForm>
    </Edit>
);
