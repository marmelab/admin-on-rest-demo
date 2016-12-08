import React from 'react';
import { FunctionField } from 'admin-on-rest/lib/mui'

const NbItemsField = (props) => <FunctionField {...props} render={record => record.basket.length} />;

NbItemsField.defaultProps = {
    label: 'Nb Items',
    cellStyle: { td: { textAlign: 'right' } },
    headerStyle: { th: { textAlign: 'right' } },
};

export default NbItemsField;
