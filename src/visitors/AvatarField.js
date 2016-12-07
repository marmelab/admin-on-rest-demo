import React from 'react';

const AvatarField = ({ record, size }) => <img
    style={{ verticalAlign: 'text-bottom' }}
    src={`${record.avatar}?size=${size}x${size}`}
    width={size}
    role="presentation"
/>;

AvatarField.defaultProps = {
    size: 25,
};

export default AvatarField;
