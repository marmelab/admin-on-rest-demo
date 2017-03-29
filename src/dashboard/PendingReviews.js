import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import { translate } from 'admin-on-rest';

import StarRatingField from '../reviews/StarRatingField';

const styles = {
    titleLink: { textDecoration: 'none', color: '#000' },
    card: { borderLeft: 'solid 4px #f44336', flex: 1, marginRight: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#f44336' },
};

const location = { pathname: 'reviews', query: { filter: JSON.stringify({ status: 'pending' }) } };

export default translate(({ reviews = [], customers = {}, nb, translate }) => (
    <Card style={styles.card}>
        <CommentIcon style={styles.icon} />
        <CardTitle title={<Link to={location} style={styles.titleLink}>{nb}</Link>} subtitle={translate('pos.dashboard.pending_reviews')} />
        <List>
            {reviews.map(record =>
                <ListItem
                    key={record.id}
                    href={`#/reviews/${record.id}`}
                    primaryText={<StarRatingField record={record} />}
                    secondaryText={record.comment}
                    secondaryTextLines={2}
                    leftAvatar={customers[record.customer_id] ? <Avatar src={`${customers[record.customer_id].avatar}?size=32x32`} /> : <Avatar />}
                />
            )}
        </List>
    </Card>
));
