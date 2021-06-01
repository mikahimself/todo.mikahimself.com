import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogActions, DialogContent, DialogTitle, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    },
    myDialog: {
        [theme.breakpoints.up('sm')]: {
            width: "400px"
        }
    },
}))

export default function AddDialog({ open, handleClose, handleAddTodoItem }) {
    const classes = useStyles();
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const handleSave = () => {
        handleAddTodoItem({ title, content, isDone: false });
        setTitle("");
        setContent("");
        handleClose();
    }

    const handleCancel = () => {
        setTitle("");
        setContent("");
        handleClose();
    }


    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="add-dialog">
            <DialogTitle id="add-dialog-title">Add New Todo</DialogTitle>
            <DialogContent className={classes.myDialog}>
                <form autoComplete="off" className={classes.root}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <TextField
                            classes={useStyles.textField}
                            id="todo-title"
                            label="Title"
                            variant="outlined"
                            onChange={(e) => setTitle(e.target.value)}
                        ></TextField>
                        <TextField
                            id="todo-description"
                            label="Description"
                            multiline
                            rows={5}
                            variant="outlined"
                            onChange={(e) => setContent(e.target.value)}
                        ></TextField>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={title === '' && content === ''}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
