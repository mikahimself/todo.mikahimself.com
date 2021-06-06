import { AppBar, FormControl, FormControlLabel, Switch, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

export default function ToDoToolbar( { setTheme, darkMode }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    Things to do
                </Typography>
                <FormControl>
                    <FormControlLabel control={<Switch checked={darkMode} onChange={setTheme} name="modeSwitch" />} label="Mode" />
                </FormControl>
            </Toolbar>
        </AppBar>
    )
}
