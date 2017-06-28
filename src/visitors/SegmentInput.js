import React from 'react';
import { translate, SelectInput } from 'admin-on-rest';

import segments from '../segments/data';

const SegmentInput = ({ translate, ...rest }) => (
    <SelectInput {...rest} choices={segments.map(segment => ({ id: segment.id, name: translate(segment.name) }))} />
);

const TranslatedSegmentInput = translate(SegmentInput);

TranslatedSegmentInput.defaultProps = {
    addLabel: true,
    addField: true,
    source: 'groups',
};

export default TranslatedSegmentInput;
