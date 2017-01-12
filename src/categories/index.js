import React from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    List,
    SimpleForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/action/bookmark';

export const CategoryIcon = Icon;

export const CategoryList = (props) => (
    <List {...props} defaultSort={{ field: 'name', order: 'ASC' }}>
        <Datagrid >
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

const CategoryTitle = ({ record }) => <span>Category #{record.name}</span>;
export const CategoryEdit = (props) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);
