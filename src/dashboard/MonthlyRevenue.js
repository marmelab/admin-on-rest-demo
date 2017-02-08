import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import DollarIcon from 'material-ui/svg-icons/editor/attach-money';

const styles = {
    card: { borderLeft: 'solid 4px #31708f', flex: '1', margin: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#31708f' },
};

export default ({ value }) => (
    <Card style={styles.card}>
        <DollarIcon style={styles.icon} />
        <CardTitle title={value} subtitle="Monthly Revenue" />
    </Card>
);
