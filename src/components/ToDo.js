import React, { useState} from 'react';
import "./ToDo.css";
import { ListItem, ListItemText, ListItemIcon, makeStyles, IconButton, Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { db } from "../firebase";
import EditDialog from './EditDialog';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[1],
        padding: theme.spacing(2, 4, 3),
    },
    todoListItem: {
        
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        backgroundColor: "rgb(255, 255, 255)",
        "&:hover": {
            //backgroundColor: "#50ADD0"
        },
        "&:focus": {
            //backgroundColor: "#7DC5E1"
        }
    },
    
    todoText__normal: {
        textDecoration: "none",
    },
    todoText__checked: {
        textDecoration: "line-through"
    }
}))

function ToDo(props) {
    const classes = useStyles();
    const [editOpen, setEditOpen] = useState(false)
    const [checked, setChecked] = useState(false);
    
    const deleteTodo = () => {
        db.collection('todos').doc(props.todoData.id).delete();
    }
    
    const handleClose = () => {
        setEditOpen(false);
    }

    const handleOpen = () => {
        console.log("Open edit")
        setEditOpen(true);
    }

    const handleChange = (event) => {
        event.stopPropagation();
        setChecked(event.target.checked);
    }    

    return (
        <>
            <EditDialog open={editOpen} handleClose={handleClose} handleEdit={props.handleEdit} todoId={props.todoId} todoTitle={props.todoData.todoTitle} todoContent={props.todoData.todoContent}/>
            
            <ListItem button className={classes.todoListItem}>
                {props.todoData !== undefined && 
                <>
                <ListItemIcon>
                    <Checkbox checked={checked} onChange={handleChange}/>
                </ListItemIcon>
                
                <ListItemText
                    primary={props.todoData.todoTitle}
                    secondary={props.todoData.todoContent}
                    className={checked ? classes.todoText__checked : classes.todoText__normal}
                    onClick={handleOpen} />
                    
                <ListItemSecondaryAction>
                    <IconButton onClick={deleteTodo}>
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
