import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { firebaseApp } from '../firebase';
import firebase from 'firebase/app';

function Auth(props) {
    const [anchorElement, setAnchorElement] = React.useState(null);

    const handleSignIn = () => {
        const gProvider = new firebase.auth.GoogleAuthProvider();
        firebaseApp.auth().signInWithPopup(gProvider)
        .then(() => {
            props.handleSignedInStatus("Seppo", true);
        })
        .catch((e) => {
            console.log(e);
        })
    }
    const handleMenuClick = (event) => {
        setAnchorElement(event.currentTarget)
    }
    
    const handleClose = () => {
        setAnchorElement(null);
    }
    const handleSignInClick = () => {
        handleSignIn();
        setAnchorElement(null);
    }
    const handleSignOutClick = () => {
        firebaseApp.auth().signOut();
        props.handleSignedInStatus("Seppo", false);
        setAnchorElement(null);
    }

    return (
        <div>
            <Button onClick={handleMenuClick}>
                {props.loggedIn ? "Log out" : "Log in"}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorElement}
                keepMounted
                open={Boolean(anchorElement)}
                onClose={handleClose}
            >
                {!props.loggedIn && <MenuItem onClick={handleSignInClick}>Sign in with Google</MenuItem>}
                {props.loggedIn && (<MenuItem onClick={handleSignOutClick}>Logout</MenuItem>)}
            </Menu>
            
        </div>
    )
}

export default Auth;