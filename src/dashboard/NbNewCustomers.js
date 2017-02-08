import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import CustomerIcon from 'material-ui/svg-icons/social/person-add';

const styles = {
    card: { borderLeft: 'solid 4px #4caf50', flex: 1, margin: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50' },
};

export default ({ value }) => (
    <Card style={styles.card}>
        <CustomerIcon style={styles.icon} />
        <CardTitle title={value} subtitle="New Customers" />
    </Card>
);
