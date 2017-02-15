import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CustomerIcon from 'material-ui/svg-icons/social/person-add';
import { translate } from 'admin-on-rest';

const styles = {
    card: { borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50' },
};

export default translate(({ visitors = [], nb, translate }) => (
    <Card style={styles.card}>
        <CustomerIcon style={styles.icon} />
        <CardTitle title={nb} subtitle={translate('pos.dashboard.new_customers')} />
        <List>
            {visitors.map(record =>
                <ListItem href={`#/customers/${record.id}`} key={record.id} leftAvatar={<Avatar src={`${record.avatar}?size=32x32`} />} >
                    {record.first_name} {record.last_name}
                </ListItem>
            )}
        </List>
    </Card>
));
