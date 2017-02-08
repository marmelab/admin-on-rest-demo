import React, { Component } from 'react';
import { GET_LIST, GET_MANY } from 'admin-on-rest';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import NbPendingOrders from './NbPendingOrders';
import NbPendingReviews from './NbPendingReviews';
import NbNewCustomers from './NbNewCustomers';
import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';
import NewCustomers from './NewCustomers';
import restClient from '../restClient';

const styles = {
    main: { margin: '2em' },
    welcome: { marginBottom: '1em' },
    bar: { display: 'flex', margin: '0 -1em 0 -1em' },
    data: { display: 'flex', margin: '0 -1em 0 -1em' },
    data2: { padding: '1em', flex: 1, display: 'flex' },
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
                    if (order.status === 'ordered') {
                        stats.nbPendingOrders++;
                        stats.pendingOrders.push(order);
                    }
                    return stats;
                }, { revenue: 0, nbPendingOrders: 0, pendingOrders: [] })
            )
            .then(({ revenue, nbPendingOrders, pendingOrders }) => {
                this.setState({
                    revenue: revenue.toLocaleString(undefined, {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                    }),
                    nbPendingOrders,
                    pendingOrders,
                });
                return pendingOrders;
            })
            .then(pendingOrders => pendingOrders.map(order => order.customer_id))
            .then(customerIds => restClient(GET_MANY, 'customers', { ids: customerIds }))
            .then(customers => customers.reduce((prev, customer) => {
                prev[customer.id] = customer; // eslint-disable-line no-param-reassign
                return prev;
            }, {}))
            .then(customers => this.setState({ pendingOrdersCustomers: customers }));
        restClient(GET_LIST, 'reviews', {
                filter: { status: 'pending' },
                sort: { field: 'date', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            })
            .then(response => response.data)
            .then(pendingReviews => this.setState({ pendingReviews, nbPendingReviews: pendingReviews.reduce(nb => ++nb, 0) }));
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
                    <NbPendingOrders value={this.state.nbPendingOrders} />
                    <NbPendingReviews value={this.state.nbPendingReviews} />
                    <NbNewCustomers value={this.state.newCustomersNumber} />
                </div>
                <div style={styles.data}>
                    <PendingOrders orders={this.state.pendingOrders} customers={this.state.pendingOrdersCustomers} />
                    <div style={styles.data2}>
                        <PendingReviews reviews={this.state.pendingReviews} />
                        <NewCustomers visitors={this.state.newCustomers} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
