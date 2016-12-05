import React from 'react';
import {
    Create,
    ChipField,
    Datagrid,
    DateField,
    DateInput,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
    LongTextInput,
    ReferenceManyField,
    Show,
    TextField,
    TextInput,
    RichTextField,
    RichTextInput,
} from 'admin-on-rest/lib/mui';

import Icon from 'material-ui/svg-icons/action/book';
import CheckIcon from 'material-ui/svg-icons/action/check-circle';

export const VisitorIcon = Icon;

const VisitorFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const AvatarField = ({record}) => <img src={`${record.avatar}?size=25x25`} width="25" role="presentation" />;
AvatarField.defaultProps = {
    cellStyle: { 'td:first-child': { padding: '0 0 0 12px' } },
};

const FullNameField = ({ record = {} }) => <span>{record.first_name} {record.last_name}</span>;
FullNameField.defaultProps = { label: 'Name'};

const AmountField = ({ record = {}, source, currency = '$' }) => record[source] ?
    <span>{currency}{record[source].toFixed(2)}</span> :
    null;
AmountField.defaultProps = {
    cellStyle: { td: { textAlign: 'right' } },
    headerStyle: { th: { textAlign: 'right' } },
};

const colored = WrappedComponent => props => props.record[props.source] > 500 ?
    <span style={{ color: 'red' }}><WrappedComponent {...props} /></span> :
    <WrappedComponent {...props} />;

const ColoredAmountField = colored(AmountField);
ColoredAmountField.defaultProps = AmountField.defaultProps;

const CheckedField = ({ record, source }) => record[source] ? <CheckIcon /> : null;

const ArrayField = ({ record, source, Renderer = ChipField }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {record[source].map(value => <Renderer key={value} record={{ value }} source="value" />)}
    </div>
);

const rowStyle = (record, index) => ({
    backgroundColor: index % 2 ? '#eee' : 'white',
})

export const VisitorList = (props) => (
    <List {...props} filter={VisitorFilter} defaultSort={{ field: 'last_seen', order: 'DESC' }}>
        <Datagrid rowStyle={rowStyle}>
            <AvatarField />
            <FullNameField source="last_name" />
            <DateField source="last_seen" type="date" />
            <TextField source="nb_commands" label="Commands" style={{ color: 'purple' }} />
            <ColoredAmountField source="total_spent" />
            <DateField source="latest_purchase" showTime />
            <CheckedField source="has_newsletter" label="News." />
            <ArrayField source="groups" label="Segments" />
            <EditButton />
        </Datagrid>
    </List>
);

export const VisitorCreate = (props) => (
    <Create {...props}>
        <TextInput source="first_name" />
        <TextInput source="last_name" />
    </Create>
);

const VisitorTitle = ({ record }) => <span>
    {record ? <img src={`${record.avatar}?size=25x25`} width="25" role="presentation" /> : null }
    {record ? `${record.first_name} ${record.last_name}'s details` : ''}
</span>;

export const VisitorEdit = (props) => (
    <Edit title={VisitorTitle} {...props}>
        <TextInput source="first_name" />
        <TextInput source="last_name" />
    </Edit>
);
