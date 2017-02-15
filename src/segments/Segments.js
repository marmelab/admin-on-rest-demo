import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { translate } from 'admin-on-rest';

import LinkToRelatedCustomers from './LinkToRelatedCustomers';
import segments from './data';

const styles = {
    card: { margin: '2em' } ,
};

export default translate(({ translate }) => (
    <Card style={styles.card}>
        <CardTitle title={translate('resources.segments.name')} />
        <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>{translate('resources.segments.fields.name')}</TableHeaderColumn>
                    <TableHeaderColumn />
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {segments.map(segment => (
                    <TableRow key={segment.id}>
                        <TableRowColumn>{translate(segment.name)}</TableRowColumn>
                        <TableRowColumn>
                            <LinkToRelatedCustomers segment={segment.id} />
                        </TableRowColumn>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Card>
));
