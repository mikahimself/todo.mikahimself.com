import React, { useState } from 'react';
import { firebaseApp } from '../firebase';
import { Button, Container, InputLabel, makeStyles, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            background: "#ffffff",
            borderRadius: theme.spacing(0.5),
        },
        '& .MuiOutlinedInput-input': {
          padding: theme.spacing(1.5, 1.5),
        },
        '& .MuiFormLabel-root': {
            marginTop: theme.spacing(2),
            padding: theme.spacing(1,1,1,1),
            fontWeight: "bold",
        },
    },
    
    loginInputContainer: {
        margin: "32px 0px",
        padding: theme.spacing(2, 4, 4, 4),
        background: "#50ADD0",
        borderRadius: theme.spacing(1),
    },
    loginInputLabel: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1,1,1,0.2),
        fontWeight: "600",
    },
    loginErrorMessage: {
        color: "#E12F38",
        marginTop: theme.spacing(1),
    },
    loginErrorMessageBlock: {
        height: "34px",
        padding: theme.spacing(0.5, 0)
    },
    myDialog: {
        [theme.breakpoints.up('sm')]: {
            width: "400px"
        }
    },
    signInButton: {
        marginRight: theme.spacing(2),
        width: "100%",
    }
}))

function LoginDialog(props) {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidLogin, setInvalidLogin] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        if (invalidLogin) {
            setInvalidLogin(false);
        }
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (invalidLogin) {
            setInvalidLogin(false);
        }
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
            setInvalidLogin(true);
            console.log(`${errorCode}: ${errorMessage}`);
        });
    }

    return (
        <Container color="primary" maxWidth="sm" className={props.styles.pageContainer}>
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
                        <div className={classes.loginErrorMessageBlock}>
                        {invalidLogin && <Typography variant="body2" component="body2" className={classes.loginErrorMessage}>
                            Invalid username or password
                        </Typography>}

                        </div>
                        <div>
                            <Button variant="contained" className={classes.signInButton} color="secondary" disableElevation onClick={handleEmailSignin}>Sign in</Button>
                        </div>
                    </div>
                </form>
                
            </Container>
            
        </Container>
    )
}

export default LoginDialog
