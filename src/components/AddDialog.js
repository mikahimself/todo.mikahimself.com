import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function AddDialog({ open, handleClose }) {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="edit-dialog">
            <DialogTitle id="edit-dialog-title">Add New Todo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To be implemented
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
