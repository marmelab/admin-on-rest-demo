import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import DollarIcon from 'material-ui/svg-icons/editor/attach-money';
import { translate } from 'admin-on-rest';

const styles = {
    card: { borderLeft: 'solid 4px #31708f', flex: '1', marginRight: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#31708f' },
};

export default translate(({ value, translate }) => (
    <Card style={styles.card}>
        <DollarIcon style={styles.icon} />
        <CardTitle title={value} subtitle={translate('pos.dashboard.monthly_revenue')} />
    </Card>
));
