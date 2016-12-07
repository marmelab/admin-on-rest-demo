import React from 'react';
import AvatarField from './AvatarField';

const FullNameField = ({ record = {} }) => <span>
    <AvatarField record={record} />
    {record.first_name} {record.last_name}
</span>;

FullNameField.defaultProps = {
    cellStyle: { 'td:first-child': { padding: '0 0 0 12px' } },
    source: 'last_name',
    label: 'Name',
};

export default FullNameField;
