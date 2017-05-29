import React from 'react';
import { Card, CardMedia } from 'material-ui/Card';

const Poster = ({ record }) => (
    <Card zDepth={2} style={{ display: 'inline-block', marginTop: '1em' }}>
        <CardMedia>
            <img src={record.image} alt="" style={{ width: 'initial', minWidth: 'initial', maxWidth: '42em', maxHeight: '15em' }} />
        </CardMedia>
    </Card>
);

export default Poster;
