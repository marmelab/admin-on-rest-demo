import React from 'react';
import {
    AutocompleteInput,
    BooleanField,
    BooleanInput,
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
    SimpleForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/editor/attach-money';

import Basket from './Basket';
import NbItemsField from './NbItemsField';
import FullNameField from '../visitors/FullNameField';

export const CommandIcon = Icon;

const CommandFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Customer" source="customer_id" reference="customers">
            <AutocompleteInput optionText={choice => `${choice.first_name} ${choice.last_name}`} />
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

const CommandTitle = ({ record }) => <span>Command #{record.reference}</span>;
export const CommandEdit = (props) => (
    <Edit title={<CommandTitle />} {...props}>
        <SimpleForm>
            <Basket />
            <DateInput source="date" />
            <ReferenceInput label="Customer" source="customer_id" reference="customers">
                <AutocompleteInput optionText={choice => `${choice.first_name} ${choice.last_name}`} />
            </ReferenceInput>
            <SelectInput source="status" choices={[
                { id: 'delivered', name: 'delivered' },
                { id: 'ordered', name: 'ordered' },
                { id: 'cancelled', name: 'cancelled' },
            ]}/>
            <BooleanInput source="returned" />
            <div style={{ clear: 'both' }} />
        </SimpleForm>
    </Edit>
);
