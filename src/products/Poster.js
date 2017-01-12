import React from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
        fullWidth
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

const Poster = ({ record }) => (
    <Card style={{ float: 'right', width: '42em' }} zDepth={2}>
        <CardMedia style={{ textAlign: 'center' }}>
            <img src={record.image} role="presentation" style={{ width: 'initial', minWidth: 'initial', maxWidth: '42em', maxHeight: '11em' }} />
        </CardMedia>
        <CardText>
            <Field name="image" component={renderTextField} label="Image" />
            <Field name="thumbnail" component={renderTextField} label="Thumbnail" />
        </CardText>
    </Card>
);

export default Poster;
