import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const style = { flex: 1 };

export default ({ orders = [], customers = {} }) => (
    <Card style={style}>
        <CardTitle title="Pending Orders" />
        <List>
            {orders.map(record =>
                <ListItem
                    key={record.id}
                    href={`#/commands/${record.id}`}
                    primaryText={new Date(record.date).toLocaleString('en-GB')}
                    secondaryText={
                        <p>
                            {customers[record.customer_id] ? `by ${customers[record.customer_id].first_name} ${customers[record.customer_id].last_name}, ` : null}
                            {record.basket.length} items
                        </p>
                    }
                    rightAvatar={<strong>{record.total}$</strong>}
                    leftAvatar={customers[record.customer_id] ? <Avatar src={`${customers[record.customer_id].avatar}?size=32x32`} /> : <Avatar />}
                />
            )}
        </List>
    </Card>
);
