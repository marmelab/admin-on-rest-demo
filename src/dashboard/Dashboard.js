import React, { Component } from 'react';
import { GET_LIST } from 'admin-on-rest';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';
import NewCustomers from './NewCustomers';
import NewRegistrations from './NewRegistrations';
import restClient from '../restClient';

const styles = {
    main: { margin: '2em' },
    welcome: { marginBottom: '2em' },
    bar: { display: 'flex' },
    data: { display: 'flex', marginTop: '2em' },
};

class Dashboard extends Component {
    state = {};

    componentDidMount() {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        restClient(GET_LIST, 'commands', {
                filter: { date_gte: d.toISOString() },
                sort: { field: 'date', order: 'DESC' },
                pagination: { page: 1, perPage: 50 },
            })
            .then(response => response.data
                .filter(order => order.status !== 'cancelled')
                .reduce((stats, order) => {
                    if (order.status !== 'cancelled') stats.revenue += order.total;
                    if (order.status === 'ordered') stats.pendingOrders++;
                    return stats;
                }, { revenue: 0, pendingOrders: 0})
            )
            .then(({ revenue, pendingOrders }) => this.setState({
                revenue: revenue.toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                }),
                pendingOrders,
            }));
        restClient(GET_LIST, 'reviews', {
                filter: { status: 'pending' },
                sort: { field: 'date', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            })
            .then(response => response.data
                .reduce(nb => ++nb, 0)
            )
            .then(pendingReviews => this.setState({ pendingReviews }))
        restClient(GET_LIST, 'customers', {
                filter: { has_ordered: true, first_seen_gte: d.toISOString() },
                sort: { field: 'first_seen', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            })
            .then(response => response.data)
            .then(newCustomers => {
                this.setState({ newCustomers });
                this.setState({ newCustomersNumber: newCustomers.reduce(nb => ++nb, 0) })
            })
    }

    render() {
        return (
            <div style={styles.main}>
                <Welcome style={styles.welcome} />
                <div style={styles.bar}>
                    <MonthlyRevenue value={this.state.revenue} />
                    <PendingOrders value={this.state.pendingOrders} />
                    <PendingReviews value={this.state.pendingReviews} />
                    <NewCustomers value={this.state.newCustomersNumber} />
                </div>
                <div style={styles.data}>
                    <NewRegistrations visitors={this.state.newCustomers} />
                </div>
            </div>
        );
    }
}

export default Dashboard;
