import React from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    Filter,
    List,
    NullableBooleanInput,
    NumberField,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';

import Icon from 'material-ui/svg-icons/action/book';

import NbItemsField from './NbItemsField';
import FullNameField from '../visitors/FullNameField';

export const CommandIcon = Icon;

const CommandFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Customer" source="customer_id" reference="customers">
            <SelectInput optionText="last_name" />
        </ReferenceInput>
        <DateInput label="Passed Since" source="date_gte" />
        <DateInput label="Passed Before" source="date_lte" />
        <TextInput label="Min Amount" source="total_gte" />
        <NullableBooleanInput source="returned" />
    </Filter>
);

export const CommandList = (props) => (
    <List {...props} filter={<CommandFilter />} defaultSort={{ field: 'date', order: 'DESC' }} perPage={25}>
        <Datagrid >
            <DateField source="date" showTime />
            <TextField source="reference" />
            <ReferenceField label="Customer" source="customer_id" reference="customers">
                <FullNameField />
            </ReferenceField>
            <NbItemsField />
            <NumberField source="total" options={{ style: 'currency', currency: 'USD' }} />
            <TextField source="status" />
            <BooleanField source="returned" />
            <EditButton />
        </Datagrid>
    </List>
);

const CommandTitle = ({ record }) => <span>
    {record ? <img src={`${record.avatar}?size=25x25`} width="25" role="presentation" /> : null }
    {record ? `${record.first_name} ${record.last_name}'s details` : ''}
</span>;

export const CommandEdit = (props) => (
    <Edit title={<CommandTitle />} {...props}>
        <TextInput source="first_name" />
    </Edit>
);
