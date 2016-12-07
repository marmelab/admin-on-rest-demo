import React from 'react';

const NbItemsField = ({ record }) => <span>{record && record.basket.length}</span>;

NbItemsField.defaultProps = {
    label: 'Nb Items',
    cellStyle: { td: { textAlign: 'right' } },
    headerStyle: { th: { textAlign: 'right' } },
};

export default NbItemsField;
