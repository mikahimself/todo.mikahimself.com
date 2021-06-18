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
        [theme.breakpoints.up('sm')]: {
            width: "400px"
        }
    },
    editButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1)
    }
}))

export default function EditDialog({ loggedIn, open, handleClose, todoId, todoTitle, todoContent, handleEdit }) {
    const classes = useStyles();
    const [contentEditable, setContentEditable] = React.useState(false);
    const [title, setTitle] = React.useState(todoTitle);
    const [content, setContent] = React.useState(todoContent);

    const setEditable = () => {
        setContentEditable(true);
    }

    const handleCancel = () => {
        setTitle(todoTitle);
        setContentEditable(false);
        setContent(todoContent);
        handleClose();
    }

    const handleSave = () => {
        handleEdit({ todoId, title, content });
        setContentEditable(false);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="edit-dialog">
            <DialogTitle id="edit-dialog-title">
                Edit Todo
                {loggedIn && (<IconButton
                    className={classes.editButton}
                    onClick={setEditable}>
                    <EditIcon />
                </IconButton>)
                }    
            </DialogTitle>
            <DialogContent className={classes.myDialog}>
                
                <form autoComplete="off" className={classes.root}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <TextField
                            id="todo-title"
                            label="Title"
                            value={title}
                            variant={!contentEditable ? "filled" : "outlined"}
                            onChange={(e) => setTitle(e.target.value)}
                            InputProps={{
                                readOnly: !contentEditable,
                            }}
                        />
                        <TextField
                            id="todo-description"
                            label="Description"
                            multiline
                            rows={5}
                            value={content}
                            variant={!contentEditable ? "filled" : "outlined"}
                            onChange={(e) => setContent(e.target.value)}
                            InputProps={{
                                readOnly: !contentEditable,
                            }}
                        />
                    </div>
                </form>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button disabled={!loggedIn} onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
