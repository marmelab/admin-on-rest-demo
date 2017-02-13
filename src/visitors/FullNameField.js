import React from 'react';
import AvatarField from './AvatarField';
import pure from 'recompose/pure';

const FullNameField = ({ record = {}, size = 25 }) => <span>
    <AvatarField record={record} size={size} />
    <span style={{ display: 'inline-block', width: size/3 }}>&nbsp;</span>
    {record.first_name} {record.last_name}
</span>;


const PureFullNameField = pure(FullNameField);

PureFullNameField.defaultProps = {
    source: 'last_name',
    label: 'resources.customers.fields.name',
};

export default PureFullNameField;
