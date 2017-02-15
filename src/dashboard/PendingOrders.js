import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { translate } from 'admin-on-rest';

const style = { flex: 1 };

export default translate(({ orders = [], customers = {}, translate }) => (
    <Card style={style}>
        <CardTitle title={translate('pos.dashboard.pending_orders')} />
        <List>
            {orders.map(record =>
                <ListItem
                    key={record.id}
                    href={`#/commands/${record.id}`}
                    primaryText={new Date(record.date).toLocaleString('en-GB')}
                    secondaryText={
                        <p>
                            {translate('pos.dashboard.order.items', {
                                smart_count: record.basket.length,
                                nb_items: record.basket.length,
                                customer_name: customers[record.customer_id] ? `${customers[record.customer_id].first_name} ${customers[record.customer_id].last_name}` : ''
                            })}
                        </p>
                    }
                    rightAvatar={<strong>{record.total}$</strong>}
                    leftAvatar={customers[record.customer_id] ? <Avatar src={`${customers[record.customer_id].avatar}?size=32x32`} /> : <Avatar />}
                />
            )}
        </List>
    </Card>
));
