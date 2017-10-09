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
import { translate, crudGetMany as crudGetManyAction } from 'admin-on-rest';
import compose from 'recompose/compose';

class Basket extends Component {
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        const { record: { basket }, crudGetMany } = this.props;
        crudGetMany('products', basket.map(item => item.product_id));
    }
    render() {
        const { record, products, translate } = this.props;
        const { basket } = record;
        return (
            <Paper style={{ width: '42em', float: 'right' }} zDepth={2}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                {translate('resources.commands.fields.basket.reference')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.commands.fields.basket.unit_price')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.commands.fields.basket.quantity')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.commands.fields.basket.total')}
                            </TableHeaderColumn>
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
                            <TableRowColumn>{translate('resources.commands.fields.basket.sum')}</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right' }}>
                                {record.total_ex_taxes.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn>{translate('resources.commands.fields.basket.delivery')}</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right' }}>
                                {record.delivery_fees.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn>{translate('resources.commands.fields.basket.tax_rate')}</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right' }}>
                                {record.tax_rate.toLocaleString(undefined, { style: 'percent' })}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn style={{ fontWeight: 'bold' }}>{translate('resources.commands.fields.basket.total')}</TableRowColumn>
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
            .map(productId => state.admin.resources.products.data[productId])
            .filter(r => typeof r !== 'undefined')
            .reduce((prev, next) => {
                prev[next.id] = next;
                return prev;
            }, {}),
    };
};

const enhance = compose(
    translate,
    connect(mapStateToProps, {
        crudGetMany: crudGetManyAction,
    })
);

export default enhance(Basket);
