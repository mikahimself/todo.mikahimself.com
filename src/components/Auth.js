import React from 'react';
import { Button } from '@material-ui/core';

function Auth(props) {
    const handleSignOutClick = () => {
        props.handleSignedInStatus("Seppo", false);
    }

    return (
        <div>
            {props.loggedIn && (<Button onClick={handleSignOutClick}>
                {props.loggedIn ? "Log out" : "Log in with Google"}
            </Button>)}
        </div>
    )
}

export default Auth;