import React, { useState} from 'react';
import "./ToDo.css";
import { ListItem, ListItemText, Button, Modal, makeStyles } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}))

function ToDo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("");
    
    const deleteTodo = () => {
        db.collection('todos').doc(props.todoData.id).delete();
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => setOpen(true);

    const updateTodo = () => {
        db.collection("todos").doc(props.todoData.id).set({
            todo: input,
        }, { merge: true });
        handleClose();
    }


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}>
                    <div className={classes.paper}>
                        <p>Mein leben!</p>
                        <input placeholder={props.todoData.todo} onChange={(e) => setInput(e.target.value)} />
                        <Button onClick={updateTodo}>Update todo</Button>
                    </div>
            </Modal>
            <ListItem className="ToDo__listItem">
                <ListItemText secondary="Todo" primary={props.todoData.todo}></ListItemText>
            </ListItem>
            <Button onClick={handleOpen}>Edit</Button>
            <Button onClick={deleteTodo}>
                <DeleteForeverIcon />
                Delete Me
            </Button>
        </>
    )
}

export default ToDo;
