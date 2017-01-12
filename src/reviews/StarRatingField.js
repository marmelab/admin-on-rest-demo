import React from 'react';
import Icon from 'material-ui/svg-icons/action/stars';

const StarRatingField = ({ record }) => (
    <span>
        {Array(record.rating).fill(true).map((_, i) => <Icon key={i} style={{ opacity: 0.87 }} />)}
    </span>
);
StarRatingField.defaultProps = {
    label: 'Rating',
    source: 'rating',
    addLabel: true,
};

export default StarRatingField;
