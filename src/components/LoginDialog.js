import React, { useState } from 'react';
import { firebaseApp } from '../firebase';
import { Button, Container, InputLabel, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {

        },
        '& .MuiOutlinedInput-root': {
            background: "#ffffff",
            marginBottom: theme.spacing(2),
            borderRadius: theme.spacing(0.5),
        },
        '& .MuiOutlinedInput-input': {
          padding: theme.spacing(1.5, 1.5),
        },
        '& .MuiFormLabel-root': {
            padding: theme.spacing(1,1,1,1),
            fontWeight: "bold",
        },
    },
    loginInputContainer: {
        margin: "32px 0px",
        padding: "32px 40px 32px",
        background: "#50ADD0",
        borderRadius: theme.spacing(1),
    },
    loginInputLabel: {
        padding: theme.spacing(1,1,1,0.2),
            fontWeight: "600",
    },
    myDialog: {
        [theme.breakpoints.up('sm')]: {
            width: "400px"
        }
    },
    signInButton: {
        marginRight: theme.spacing(2),
    }
}))

function LoginDialog(props) {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailSignin = () => {
        firebaseApp.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            const user = userCredential.user;
            props.handleSignedInStatus(user, true);
          })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode}: ${errorMessage}`);
        });

    }

    return (
        <Container color="primary" maxWidth="md" className={props.styles.pageContainer}>
            <Container color="primary" className={classes.loginInputContainer}>
                <form autoComplete="off">
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <InputLabel htmlFor="login-username" className={classes.loginInputLabel}>
                            Username
                        </InputLabel>
                        <TextField
                            className={classes.root}
                            id="login-username"
                            variant="outlined"
                            onChange={handleUsernameChange}
                        ></TextField>
                        <InputLabel htmlFor="login-password" className={classes.loginInputLabel}>
                            Password
                        </InputLabel>
                        <TextField
                            type="password"
                            className={classes.root}
                            id="login-password"
                            variant="outlined"
                            onChange={handlePasswordChange}
                        ></TextField>
                    </div>
                    <Button variant="contained" className={classes.signInButton} color="secondary" disableElevation onClick={handleEmailSignin}>Sign in</Button>
                </form>
                {/* <Button variant="contained" color="primary" disableElevation>Sign in with Google</Button> */}
                
            </Container>
            
        </Container>
    )
}

export default LoginDialog
