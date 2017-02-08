import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import StarRatingField from '../reviews/StarRatingField';

const style = { marginRight: '1em', flex: 1 };

export default ({ reviews = [], customers = {} }) => (
    <Card style={style}>
        <CardTitle title="Pending Reviews" />
        <List>
            {reviews.map(record =>
                <ListItem
                    key={record.id}
                    href={`/#/reviews/${record.id}`}
                    primaryText={<StarRatingField record={record} />}
                    secondaryText={record.comment}
                    secondaryTextLines={2}
                    leftAvatar={customers[record.customer_id] ? <Avatar src={`${customers[record.customer_id].avatar}?size=32x32`} /> : <Avatar />}
                />
            )}
        </List>
    </Card>
);
