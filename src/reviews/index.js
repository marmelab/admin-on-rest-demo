import React from 'react';
import {
    AutocompleteInput,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    Filter,
    List,
    LongTextInput,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/communication/comment';

import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';

export const ReviewIcon = Icon;

export const ReviewFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <SelectInput source="status" choices={[
            { id: 'accepted', name: 'Accepted' },
            { id: 'pending', name: 'Pending' },
            { id: 'rejected', name: 'Rejected' },
        ]} />
        <ReferenceInput label="Customer" source="customer_id" reference="customers">
            <AutocompleteInput optionText={choice => `${choice.first_name} ${choice.last_name}`} />
        </ReferenceInput>
        <ReferenceInput label="Product" source="product_id" reference="products">
            <AutocompleteInput optionText="reference" />
        </ReferenceInput>
        <DateInput label="Posted since" source="date_gte" />
        <DateInput label="Posted before" source="date_lte" />
    </Filter>
);

const rowStyle = (record) => {
    if (record.status === 'accepted') return { backgroundColor: '#dfd' };
    if (record.status === 'pending') return { backgroundColor: '#ffd' };
    if (record.status === 'rejected') return { backgroundColor: '#fdd' };
    return {};
}
export const ReviewList = (props) => (
    <List {...props} filter={<ReviewFilter />} perPage={25} defaultSort={{ field: 'date', order: 'DESC' }}>
        <Datagrid rowStyle={rowStyle}>
            <DateField source="date" />
            <CustomerReferenceField />
            <ProductReferenceField />
            <StarRatingField />
            <TextField source="comment" style={{ maxWidth: '20em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
            <TextField source="status" />
            <EditButton />
        </Datagrid>
    </List>
);

const detailStyle = { display: 'inline-block', verticalAlign: 'top', marginRight: '2em', minWidth: '8em' };
export const ReviewEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DateField source="date" style={detailStyle} />
            <CustomerReferenceField style={detailStyle} />
            <ProductReferenceField style={detailStyle} />
            <ReferenceField source="command_id" reference="commands" label="Command" addLabel style={detailStyle}>
                <TextField source="reference" />
            </ReferenceField>
            <StarRatingField style={detailStyle} />
            <LongTextInput source="comment" />
            <SelectInput source="status" choices={[
                { id: 'accepted', name: 'Accepted' },
                { id: 'pending', name: 'Pending' },
                { id: 'rejected', name: 'Rejected' },
            ]} />
        </SimpleForm>
    </Edit>
)
