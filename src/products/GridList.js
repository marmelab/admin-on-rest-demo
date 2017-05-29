import React from 'react';
import { GridList as MuiGridList, GridTile } from 'material-ui/GridList';
import { NumberField, EditButton } from 'admin-on-rest';

const styles = {
    root: {
        margin: '-2px',
    },
    gridList: {
        width: '100%',
        margin: 0,
    },
};

const GridList = ({ ids, isLoading, data, currentSort, basePath, rowStyle }) => (
    <div style={styles.root}>
        <MuiGridList cellHeight={180} cols={4} style={styles.gridList}>
            {ids.map((id) => (
                <GridTile
                    key={id}
                    title={data[id].reference}
                    subtitle={<span>{data[id].width}x{data[id].height}, <b><NumberField source="price" record={data[id]} options={{ style: 'currency', currency: 'USD' }} /></b></span>}
                    actionIcon={<EditButton basePath={basePath} record={data[id]} label="" />}
                    titleBackground="linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)"
                >
                    <img src={data[id].thumbnail} alt="" />
                </GridTile>
            ))}
        </MuiGridList>
    </div>
);

export default GridList;
