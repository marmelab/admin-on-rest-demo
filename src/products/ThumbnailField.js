import React from 'react';

const ThumbnailField = ({ record }) => <img src={record.thumbnail} style={{ width: 25, maxWidth: 25, maxHeight: 25 }} role="presentation" />;

ThumbnailField.defaultProps = {
    style: { padding: '0 0 0 16px' },
};

export default ThumbnailField;
