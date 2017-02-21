import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import LabelIcon from 'material-ui/svg-icons/action/label';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import { AppBar, Notification, defaultTheme } from 'admin-on-rest/lib/mui';
import { translate } from 'admin-on-rest';

import { VisitorIcon } from './visitors';
import { CommandIcon } from './commands';
import { ProductIcon } from './products';
import { CategoryIcon } from './categories';
import { ReviewIcon } from './reviews';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#edecec',
        overflow: 'hidden',
    },
    content: {
        flex: 1,
    },
    menu: {
        open: {
            flex: '0 0 16em',
            order: -1,
            transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            marginLeft: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        closed: {
            flex: '0 0 16em',
            order: -1,
            transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            marginLeft: '-16em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
    },
};

const items = [
    { name: 'customers', icon: <VisitorIcon /> },
    { name: 'segments', icon: <LabelIcon /> },
    { name: 'commands', icon: <CommandIcon /> },
    { name: 'products', icon: <ProductIcon /> },
    { name: 'categories', icon: <CategoryIcon /> },
    { name: 'reviews', icon: <ReviewIcon /> },
];

const prefixedStyles = {};

class Layout extends Component {
    state = {
        sidebarOpen: true,
    };

    toggleSidebar = () => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    }

    render() {
        const { isLoading, children, title, theme, logout, translate } = this.props;
        const { sidebarOpen } = this.state;
        const muiTheme = getMuiTheme(theme);
        if (!prefixedStyles.main) {
            // do this once because user agent never changes
            const prefix = autoprefixer(muiTheme);
            prefixedStyles.main = prefix(styles.main);
            prefixedStyles.body = prefix(styles.body);
            prefixedStyles.content = prefix(styles.content);
            prefixedStyles.menu = {
                open: prefix(styles.menu.open),
                closed: prefix(styles.menu.closed),
            };
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={prefixedStyles.main}>
                    <AppBar title={title} isLoading={isLoading} onLeftIconButtonTouchTap={this.toggleSidebar} />

                    <div className="body" style={prefixedStyles.body}>
                        <div style={prefixedStyles.content}>{children}</div>
                        <Paper style={sidebarOpen ? styles.menu.open : styles.menu.closed}>
                            <List>
                                {items.map(item => (
                                    <ListItem
                                        key={item.name}
                                        containerElement={<Link to={`/${item.name}`} />}
                                        primaryText={translate(`resources.${item.name}.name`, { smart_count: 2 })}
                                        leftIcon={item.icon}
                                    />
                                ))}
                                <ListItem
                                    containerElement={<Link to="/configuration" />}
                                    primaryText={translate('pos.configuration')}
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
    }
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

Layout.defaultProps = {
    theme: defaultTheme,
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
