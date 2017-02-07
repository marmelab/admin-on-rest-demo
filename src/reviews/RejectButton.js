import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import { reviewReject as reviewRejectAction } from './reviewActions';

class AcceptButton extends Component {
    handleApprove = () => {
        const { reviewReject, record } = this.props;
        reviewReject(record.id, record);
    }

    render() {
        const { record } = this.props;
        return record && record.status === 'pending' ? <FlatButton
            primary
            label="Reject"
            onClick={this.handleApprove}
            icon={<ThumbDown color="#FF5722" />}
        /> : <span/>;
    }
}

AcceptButton.propTypes = {
    record: PropTypes.object,
    reviewReject: PropTypes.func,
};

export default connect(null, {
    reviewReject: reviewRejectAction,
})(AcceptButton);
