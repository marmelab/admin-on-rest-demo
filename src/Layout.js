import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import inflection from 'inflection';

import { AppBar, Notification, defaultTheme } from 'admin-on-rest/lib/mui';
import { translate } from 'admin-on-rest';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        display: 'flex',
        flex: '1',
        backgroundColor: '#edecec',
    },
    content: {
        flex: 1,
    },
    menu: {
        flex: '0 0 15em',
        order: -1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
};


const translatedResourceName = (resource, translate) =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _: translate(resource.options.label, {
            smart_count: 2,
            _: inflection.humanize(inflection.pluralize(resource.name)),
        }),
    });

const Layout = ({ isLoading, children, route, title, theme, logout, translate }) => {
    const muiTheme = getMuiTheme(theme);
    const prefix = autoprefixer(muiTheme);
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.main}>
                <AppBar title={title} isLoading={isLoading} />
                <div className="body" style={styles.body}>
                    <div style={styles.content}>{children}</div>
                    <Paper style={styles.menu}>
                        <List>
                            {route.resources
                                .filter(r => r.list)
                                .map(resource =>
                                    <ListItem
                                        key={resource.name}
                                        containerElement={<Link to={`/${resource.name}`} />}
                                        primaryText={translatedResourceName(resource, translate)}
                                        leftIcon={<resource.icon />}
                                    />,
                                )
                            }
                            <ListItem
                                containerElement={<Link to="/configuration" />}
                                primaryText="Configuration"
                                leftIcon={<SettingsIcon />}
                            />
                        </List>
                        {logout}
                    </Paper>
                </div>
                <Notification />
            </div>
        </MuiThemeProvider>
    );
};

Layout.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node,
    logout: PropTypes.element,
    route: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
        theme: state.theme === 'dark' ? darkBaseTheme : defaultTheme,
    };
}

export default connect(
  mapStateToProps,
)(translate(Layout));
