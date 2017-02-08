import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';

const styles = {
    card: { borderLeft: 'solid 4px #ff9800', flex: 1, marginLeft: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#ff9800' },
};

export default ({ value }) => (
    <Card style={styles.card}>
        <ShoppingCartIcon style={styles.icon} />
        <CardTitle title={value} subtitle="New Orders" />
    </Card>
);
