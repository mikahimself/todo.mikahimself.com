import React, { useState} from 'react';
import "./ToDo.css";
import { ListItem, ListItemText, ListItemIcon, Button, Modal, makeStyles, IconButton, Checkbox, ListItemSecondaryAction } from "@material-ui/core";
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
        boxShadow: theme.shadows[1],
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1),
        backgroundColor: "rgb(245, 255, 255)",
        "&:hover": {
            // backgroundColor: "rgb(247, 202, 205)"
            backgroundColor: "rgb(34, 143, 129)"
        },
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
    const [input, setInput] = useState("");
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

    const updateTodo = () => {
        db.collection("todos").doc(props.todoData.id).set({
            todo: input,
        }, { merge: true });
        handleClose();
    }
    const handleChange = (event) => {
        setChecked(event.target.checked);
    }    


    return (
        <>
            {props.todoData &&
            <Modal
                open={false}
                onClose={handleClose}>
                    <div className={classes.paper}>
                        <p>Mein leben!</p>
                        <input placeholder={props.todoData.todo} onChange={(e) => setInput(e.target.value)} />
                        <Button onClick={updateTodo}>Update todo</Button>
                    </div>
            </Modal>}
            <EditDialog open={editOpen} handleClose={handleClose} todoData={props.todoData.todo}/>
            <ListItem button className={classes.todoListItem} onClick={handleOpen}>
                {props.todoData !== undefined && 
                <>
                <ListItemIcon>
                    <Checkbox checked={checked} onChange={handleChange}/>
                </ListItemIcon>
                
                <ListItemText primary={props.todoData.todo} className={checked ? classes.todoText__checked : classes.todoText__normal} />
                    
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
