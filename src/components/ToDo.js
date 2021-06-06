import React, { useState} from 'react';
import { ListItem, ListItemText, ListItemIcon, makeStyles, IconButton, Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { db } from "../firebase";
import EditDialog from './EditDialog';

const useStyles = makeStyles((theme) => ({
    todoListItem: {        
        marginBottom: theme.spacing(2),
        borderRadius: theme.spacing(1),
        paddingRight: "48px",
        backgroundColor: theme.palette.background.default,
        "&:hover": {
            backgroundColor: theme.palette.primary.light
        },
    },
    
    todoText__normal: {
        textDecoration: "none",
        textOverflow: "ellipsis"
    },
    todoText__checked: {
        textDecoration: "line-through"
    }
}));

function ToDo(props) {
    const classes = useStyles();
    const [editOpen, setEditOpen] = useState(false)
    
    const deleteTodo = () => {
        db.collection('todos').doc(props.todoData.id).delete();
    }
    
    const handleClose = () => {
        setEditOpen(false);
    }

    const handleOpen = () => {
        setEditOpen(true);
    }

    const handleChange = (event) => {
        event.stopPropagation();
        props.handleCheck({todoId: props.todoData.id, todoDone: event.target.checked})
    }    

    return (
        <>
            <EditDialog open={editOpen} handleClose={handleClose} handleEdit={props.handleEdit} todoId={props.todoId} todoTitle={props.todoData.todoTitle} todoContent={props.todoData.todoContent}/>
            
            <ListItem key={props.todoId} button className={classes.todoListItem}>
                {props.todoData !== undefined && 
                <>
                    <ListItemIcon>
                        <Checkbox checked={props.todoData.todoDone} onChange={handleChange}/>
                    </ListItemIcon>
                    
                    <ListItemText
                        primary={props.todoData.todoTitle}
                        secondary={props.todoData.todoContent}
                        className={props.todoData.todoDone ? classes.todoText__checked : classes.todoText__normal}
                        onClick={handleOpen} />
                        
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={deleteTodo}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </>
                }
            </ListItem>
        </>
    )
}

export default ToDo;
