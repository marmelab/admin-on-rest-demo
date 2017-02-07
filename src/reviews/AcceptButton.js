import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import { reviewApprove as reviewApproveAction } from './reviewActions';

class AcceptButton extends Component {
    handleApprove = () => {
        const { reviewApprove, record } = this.props;
        reviewApprove(record.id, record);
    }

    render() {
        const { record } = this.props;
        return record && record.status === 'pending' ? <FlatButton
            primary
            label="Accept"
            onClick={this.handleApprove}
            icon={<ThumbUp color="#4CAF50" />}
        /> : <span/>;
    }
}

AcceptButton.propTypes = {
    record: PropTypes.object,
    reviewApprove: PropTypes.func,
};

export default connect(null, {
    reviewApprove: reviewApproveAction,
})(AcceptButton);
