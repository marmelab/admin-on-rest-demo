import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const style = { marginLeft: '1em', flex: 1 };

export default ({ visitors = [] }) => (
    <Card style={style}>
        <CardTitle title="New Registrations" />
        <List>
            {visitors.map(record =>
                <ListItem href={`/#/customers/${record.id}`} key={record.id} leftAvatar={<Avatar src={`${record.avatar}?size=32x32`} />} >
                    {record.first_name} {record.last_name}
                </ListItem>
            )}
        </List>
    </Card>
);
