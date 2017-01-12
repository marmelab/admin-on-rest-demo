import React from 'react';
import { ReferenceField } from 'admin-on-rest/lib/mui';
import FullNameField from './FullNameField';

const CustomerReferenceField = (props) => (
    <ReferenceField label="Customer" source="customer_id" reference="customers" {...props}>
        <FullNameField />
    </ReferenceField>
)
CustomerReferenceField.defaultProps = {
    label: 'Customer',
    source: 'customer_id',
    addLabel: true,
};

export default CustomerReferenceField;
