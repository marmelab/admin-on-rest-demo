import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const style = { marginRight: '1em', flex: 1 };

export default ({ reviews = [] }) => (
    <Card style={style}>
        <CardTitle title="Pending Reviews" />
        <List>
            {reviews.map(record =>
                <ListItem
                    key={record.id}
                    href={`/#/reviews/${record.id}`}
                    primaryText={record.id}
                />
            )}
        </List>
    </Card>
);
