import React from 'react';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import Button from 'material-ui/Button';
import {
    translate,
    changeLocale as changeLocaleAction,
    ViewTitle,
} from 'react-admin';

import { changeTheme as changeThemeAction } from './actions';

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({
    theme,
    locale,
    changeTheme,
    changeLocale,
    translate,
}) => (
    <Card>
        <ViewTitle title={translate('pos.configuration')} />
        <CardText>
            <div style={styles.label}>{translate('pos.theme.name')}</div>
            <Button
                raised
                style={styles.button}
                primary
                onClick={() => changeTheme('light')}
            >
                {translate('pos.theme.light')}
            </Button>
            <Button
                raised
                style={styles.button}
                secondary
                onClick={() => changeTheme('dark')}
            >
                {translate('pos.theme.dark')}
            </Button>
        </CardText>
        <CardText>
            <div style={styles.label}>{translate('pos.language')}</div>
            <Button
                raised
                style={styles.button}
                primary={locale === 'en'}
                onClick={() => changeLocale('en')}
            >
                en
            </Button>
            <Button
                raised
                style={styles.button}
                primary={locale === 'fr'}
                onClick={() => changeLocale('fr')}
            >
                fr
            </Button>
        </CardText>
    </Card>
);

const mapStateToProps = state => ({
    theme: state.theme,
    locale: state.locale,
});

export default connect(mapStateToProps, {
    changeLocale: changeLocaleAction,
    changeTheme: changeThemeAction,
})(translate(Configuration));
