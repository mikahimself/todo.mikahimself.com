import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function EditDialog({ open, handleClose, todoData }) {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="edit-dialog">
            <DialogTitle id="edit-dialog-title">Edit Todo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {todoData} -- To be implemented
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleClose}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
