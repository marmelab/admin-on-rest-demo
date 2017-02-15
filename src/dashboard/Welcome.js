import React from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import HomeIcon from 'material-ui/svg-icons/action/home';
import CodeIcon from 'material-ui/svg-icons/action/code';
import FlatButton from 'material-ui/FlatButton';
import { translate } from 'admin-on-rest';

export default translate(({ style, translate }) => (
    <Card style={style}>
        <CardHeader
            title={translate('pos.dashboard.welcome.title')}
            subtitle={translate('pos.dashboard.welcome.subtitle')}
            avatar={<Avatar backgroundColor="#FFEB3B" icon={<LightBulbIcon />} />}
        />
        <CardActions style={{ textAlign: 'right' }}>
            <FlatButton label={translate('pos.dashboard.welcome.aor_button')} icon={<HomeIcon />} href="https://marmelab.com/admin-on-rest/" />
            <FlatButton label={translate('pos.dashboard.welcome.demo_button')} icon={<CodeIcon />} href="https://github.com/marmelab/admin-on-rest-demo" />
        </CardActions>
    </Card>
));
