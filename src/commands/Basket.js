import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { crudGetMany as crudGetManyAction } from 'admin-on-rest';

class Basket extends Component {
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        const { record: { basket }, crudGetMany } = this.props;
        crudGetMany('products', basket.map(item => item.product_id));
    }
    render() {
        const { record, products } = this.props;
        const { basket } = record;
        return (
            <Paper style={{ width: '42em', float: 'right' }} zDepth={2}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Reference</TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>Unit Price</TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>Quantity</TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>Total</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {basket.map(item => products[item.product_id] && (
                            <TableRow key={item.product_id}>
                                <TableRowColumn>
                                    {products[item.product_id].reference}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {products[item.product_id].price.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.quantity}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {(products[item.product_id].price * item.quantity).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                                </TableRowColumn>
                            </TableRow>)
                        )}
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn>Sum</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right' }}>
                                {record.total_ex_taxes.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn>Delivery</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right' }}>
                                {record.delivery_fees.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn>Tax Rate</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right' }}>
                                {record.tax_rate.toLocaleString(undefined, { style: 'percent' })}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn style={{ fontWeight: 'bold' }}>Total</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                {record.total.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { record: { basket } } = props;
    const productIds = basket.map(item => item.product_id);
    return {
        products: productIds
            .map(productId => state.admin.products.data[productId])
            .filter(r => typeof r !== 'undefined')
            .reduce((prev, next) => {
                prev[next.id] = next;
                return prev;
            }, {}),
    };
};

const ConnectedBasket = connect(mapStateToProps, {
    crudGetMany: crudGetManyAction,
})(Basket);

export default ConnectedBasket;
