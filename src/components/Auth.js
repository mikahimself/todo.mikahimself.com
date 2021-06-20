import React from 'react';
import { Button } from '@material-ui/core';
import { firebaseApp } from '../firebase';

function Auth(props) {
    const handleSignOutClick = () => {
        firebaseApp.auth().signOut();
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