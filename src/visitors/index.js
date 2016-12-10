import React from 'react';
import {
    AmountField,
    BooleanField,
    ChipField,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    Filter,
    List,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    ReferenceManyField,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';

import Icon from 'material-ui/svg-icons/social/person';

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

const ColoredAmountField = colored(AmountField);
ColoredAmountField.defaultProps = AmountField.defaultProps;

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
            <ColoredAmountField source="total_spent" />
            <DateField source="latest_purchase" showTime />
            <BooleanField source="has_newsletter" label="News." />
            <ArrayField source="groups" label="Segments" />
            <EditButton />
        </Datagrid>
    </List>
);

const VisitorTitle = ({ record }) => <span>
    {record ? <img src={`${record.avatar}?size=25x25`} width="25" role="presentation" /> : null }
    {record ? `${record.first_name} ${record.last_name}'s details` : ''}
</span>;

export const VisitorEdit = (props) => (
    <Edit title={<VisitorTitle />} {...props}>
        <TextInput source="first_name" style={{ display: 'inline-block' }} />
        <TextInput source="last_name" style={{ display: 'inline-block', marginLeft: 32 }} />
        <TextInput type="email" source="email" validation={{ email: true }} style={{ width: 544 }} />
        <LongTextInput source="address" style={{ maxWidth: 544 }} />
        <TextInput source="zipcode" style={{ display: 'inline-block' }} />
        <TextInput source="city" style={{ display: 'inline-block', marginLeft: 32 }} />
        <DateInput source="birthday" />
        <NullableBooleanInput source="has_newsletter" />
        <DateField source="first_seen" style={{ width: 128, display: 'inline-block' }} />
        <DateField source="latest_purchase" style={{ width: 128, display: 'inline-block' }} />
        <DateField source="last_seen" style={{ width: 128, display: 'inline-block' }} />
        <ReferenceManyField label="Latest commands" reference="commands" target="customer_id">
            <Datagrid>
                <DateField source="date" />
                <TextField source="reference" />
                <NbItemsField />
                <AmountField source="total" />
                <TextField source="status" />
                <EditButton />
            </Datagrid>
        </ReferenceManyField>
    </Edit>
);
