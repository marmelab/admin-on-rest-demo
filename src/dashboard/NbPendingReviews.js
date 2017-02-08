import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

const styles = {
    card: { borderLeft: 'solid 4px #f44336', flex: 1, margin: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#f44336' },
};

export default ({ value }) => (
    <Card style={styles.card}>
        <CommentIcon style={styles.icon} />
        <CardTitle title={value} subtitle="Pending Reviews" />
    </Card>
);
