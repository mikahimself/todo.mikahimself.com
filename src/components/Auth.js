import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { firebaseApp } from '../firebase';
import firebase from 'firebase/app';

export default class Auth extends Component {
    handleSignInClick = () => {
        const gProvider = new firebase.auth.GoogleAuthProvider();
        firebaseApp.auth().signInWithPopup(gProvider)
        .then(() => {
            console.log("Logged in")
        })
        .catch((e) => {
            console.log(e);
        })
        console.log("Clicked")
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleSignInClick}>Sign In</Button>
            </div>
        )
    }
}
