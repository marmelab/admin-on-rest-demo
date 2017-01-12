import React from 'react';
import {
    BooleanField,
    ChipField,
    Datagrid,
    DateField,
    DateInput,
    Delete,
    Edit,
    Filter,
    FormTab,
    List,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    ReferenceManyField,
    TabbedForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';

import Icon from 'material-ui/svg-icons/social/person';

import EditButton from '../buttons/EditButton';
import FullNameField from './FullNameField';
import NbItemsField from '../commands/NbItemsField';

export const VisitorIcon = Icon;

const VisitorFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <DateInput label="Visited Since" source="last_seen_gte" />
        <NullableBooleanInput source="has_ordered" />
        <NullableBooleanInput source="has_newsletter" />
    </Filter>
);

const colored = WrappedComponent => props => props.record[props.source] > 500 ?
    <span style={{ color: 'red' }}><WrappedComponent {...props} /></span> :
    <WrappedComponent {...props} />;

const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

const ArrayField = ({ record, source, Renderer = ChipField }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {record[source].map(value => <Renderer key={value} record={{ value }} source="value" />)}
    </div>
);

const rowStyle = (record, index) => ({
    backgroundColor: index % 2 ? '#eee' : 'white',
})

export const VisitorList = (props) => (
    <List {...props} filter={<VisitorFilter />} defaultSort={{ field: 'last_seen', order: 'DESC' }} perPage={25}>
        <Datagrid rowStyle={rowStyle}>
            <FullNameField />
            <DateField source="last_seen" type="date" />
            <NumberField source="nb_commands" label="Commands" style={{ color: 'purple' }} />
            <ColoredNumberField source="total_spent" options={{ style: 'currency', currency: 'USD' }} />
            <DateField source="latest_purchase" showTime />
            <BooleanField source="has_newsletter" label="News." />
            <ArrayField source="groups" label="Segments" />
            <EditButton />
        </Datagrid>
    </List>
);

const VisitorTitle = ({ record }) => <span>
    {record && <img src={`${record.avatar}?size=25x25`} width="25" role="presentation" /> }
    {record && `${record.first_name} ${record.last_name}'s details`}
</span>;

export const VisitorEdit = (props) => (
    <Edit title={<VisitorTitle />} {...props}>
        <TabbedForm>
            <FormTab label="Identity">
                <TextInput source="first_name" style={{ display: 'inline-block' }} />
                <TextInput source="last_name" style={{ display: 'inline-block', marginLeft: 32 }} />
                <TextInput type="email" source="email" validation={{ email: true }} options={{ fullWidth: true }} style={{ width: 544 }} />
                <DateInput source="birthday" />
            </FormTab>
            <FormTab label="Address">
                <LongTextInput source="address" label="Street" style={{ maxWidth: 544 }} />
                <TextInput source="zipcode" style={{ display: 'inline-block' }} />
                <TextInput source="city" style={{ display: 'inline-block', marginLeft: 32 }} />
            </FormTab>
            <FormTab label="Commands">
                <ReferenceManyField addLabel={false} reference="commands" target="customer_id">
                    <Datagrid>
                        <DateField source="date" />
                        <TextField source="reference" />
                        <NbItemsField />
                        <NumberField source="total" options={{ style: 'currency', currency: 'USD' }} />
                        <TextField source="status" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
            <FormTab label="Stats">
                <NullableBooleanInput source="has_newsletter" />
                <DateField source="first_seen" style={{ width: 128, display: 'inline-block' }} />
                <DateField source="latest_purchase" style={{ width: 128, display: 'inline-block' }} />
                <DateField source="last_seen" style={{ width: 128, display: 'inline-block' }} />
            </FormTab>
        </TabbedForm>
    </Edit>
);

const VisitorDeleteTitle = ({ record }) => <span>
    Delete customer
    {record && <img src={`${record.avatar}?size=25x25`} width="25" role="presentation" />}
    {record && `${record.first_name} ${record.last_name}?`}
</span>;

export const VisitorDelete = (props) => <Delete {...props} title={<VisitorDeleteTitle />} />;
