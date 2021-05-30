import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { DialogActions, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    },
    myDialog: {
        width: "400px"
    }
}))

export default function EditDialog({ open, handleClose, todoId, todoTitle, todoContent, handleEdit }) {
    const classes = useStyles();
    const [titleEditable, setTitleEditable] = React.useState(false);
    // const [contentEditable, setContentEditable] = React.useState(false);
    const [title, setTitle] = React.useState(todoTitle);
    const [content, setContent] = React.useState(todoContent);

    const handleTitle = () => {
        setTitleEditable(true);
        console.log("Title editable: " + titleEditable)
    }

    const handleCancel = () => {
        setTitle(todoTitle);
        setContent(todoContent);
        handleClose();
    }

    const handleSave = () => {
        handleEdit({ todoId, title, content });
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="edit-dialog">
            <DialogTitle id="edit-dialog-title">Edit Todo</DialogTitle>
            <DialogContent className={classes.myDialog}>
                
                <form autoComplete="off" className={classes.root}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <TextField
                                id="todo-title"
                                label="Title"
                                value={title}
                                variant="outlined"
                                onChange={(e) => setTitle(e.target.value)}
                                InputProps={{
                                    readOnly: false,
                                    endAdornment: <IconButton onClick={handleTitle}>
                                        <EditIcon />
                                    </IconButton>,
                                }}
                                // onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                id="todo-description"
                                label="Description"
                                multiline
                                rows={5}
                                value={content}
                                variant="outlined"
                                onChange={(e) => setContent(e.target.value)}
                                // onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </form>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
