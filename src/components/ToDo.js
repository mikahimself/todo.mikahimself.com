import React, { useState} from 'react';
import "./ToDo.css";
import { ListItem, Input, ListItemText, ListItemIcon, Button, Modal, makeStyles, IconButton, Checkbox, ListItemSecondaryAction } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    todoListItem: {
        boxShadow: theme.shadows[3],
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        backgroundColor: "rgb(247, 255, 255)",
        "&:hover": {
            backgroundColor: "rgb(247, 202, 205)"
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
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("");
    const [checked, setChecked] = useState(false);
    
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
    const handleChange = (event) => {
        setChecked(event.target.checked);
    }    


    return (
        <>
            {props.todoData &&
            <Modal
                open={open}
                onClose={handleClose}>
                    <div className={classes.paper}>
                        <p>Mein leben!</p>
                        <input placeholder={props.todoData.todo} onChange={(e) => setInput(e.target.value)} />
                        <Button onClick={updateTodo}>Update todo</Button>
                    </div>
            </Modal>}
            <ListItem button className={classes.todoListItem} onClick={() => setChecked(!checked)}>
                {props.todoData != undefined && 
                <>
                <ListItemIcon>
                    <Checkbox checked={checked} onChange={handleChange}/>
                </ListItemIcon>
                
                <ListItemText primary={props.todoData.todo} className={checked ? classes.todoText__checked : classes.todoText__normal} />
                    
                <ListItemSecondaryAction>
                    <IconButton onClick={handleOpen}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={deleteTodo}>
                        <DeleteForeverIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                </>
                }
                {props.todoData == undefined &&
                    <>
                        {/* <ListItemText primary={"Add a todo"} ></ListItemText> */}
                        <Input style={{ width: "85%"}}value={input} onChange={(e) => setInput(e.target.value)}/>
                        <ListItemSecondaryAction>
                        <IconButton onClick={handleOpen}>
                            <AddCircleIcon />
                        </IconButton>
                </ListItemSecondaryAction>
                    </>
                }
            </ListItem>
        </>
    )
}

export default ToDo;
