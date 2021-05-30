import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

export default function ToDoToolbar() {
    return (
        <AppBar position="static">
            <Toolbar >
                <Typography variant="h6">
                    Things to do
                </Typography>
                <Button>Login</Button>
            </Toolbar>
        </AppBar>
    )
}
