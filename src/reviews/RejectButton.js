import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import { translate } from 'admin-on-rest';
import compose from 'recompose/compose';
import { reviewReject as reviewRejectAction } from './reviewActions';

class AcceptButton extends Component {
    handleApprove = () => {
        const { reviewReject, record } = this.props;
        reviewReject(record.id, record);
    }

    render() {
        const { record, translate } = this.props;
        return record && record.status === 'pending' ? <FlatButton
            primary
            label={translate('resources.reviews.action.reject')}
            onClick={this.handleApprove}
            icon={<ThumbDown color="#FF5722" />}
        /> : <span/>;
    }
}

AcceptButton.propTypes = {
    record: PropTypes.object,
    reviewReject: PropTypes.func,
    translate: PropTypes.func,
};

const enhance = compose(
    translate,
    connect(null, {
        reviewReject: reviewRejectAction,
    })
);

export default enhance(AcceptButton);
