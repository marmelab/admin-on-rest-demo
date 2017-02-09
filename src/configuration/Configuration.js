import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { changeTheme as changeThemeAction } from './actions';

const styles = {
    card: { margin: '2em' },
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({ theme, changeTheme }) => (
    <Card style={styles.card}>
        <CardTitle title="Configuration" />
        <CardText>
            <div style={styles.label}>Theme</div>
            <RaisedButton style={styles.button} label="Light" primary onClick={() => changeTheme('light')} />
            <RaisedButton style={styles.button} label="Dark" secondary onClick={() => changeTheme('dark')} />
        </CardText>
    </Card>
);

const mapStateToProps = state => ({
    theme: state.theme,
});

export default connect(mapStateToProps, {
    changeTheme: changeThemeAction,
})(Configuration);
