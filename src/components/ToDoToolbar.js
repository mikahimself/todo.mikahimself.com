import { AppBar, FormControl, FormControlLabel, Switch, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import Auth from './Auth'

export default function ToDoToolbar( { handleSignedInStatus, loggedIn, setTheme, darkMode }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    Things to do
                </Typography>
                <Auth handleSignedInStatus={handleSignedInStatus} loggedIn={loggedIn} />
                <FormControl>
                    <FormControlLabel control={<Switch checked={darkMode} onChange={setTheme} name="modeSwitch" />} label="Mode" />
                </FormControl>
            </Toolbar>
        </AppBar>
    )
}
