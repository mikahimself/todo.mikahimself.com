import './App.css';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from '@material-ui/styles';
import React, { useState, useEffect, useRef } from "react";
import { List, Container, makeStyles, createMuiTheme, CssBaseline } from '@material-ui/core';
import ToDo from "./components/ToDo";
import { db } from "./firebase";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import firebase from "firebase";
import AddDialog from './components/AddDialog';
import ToDoToolbar from './components/ToDoToolbar';
import SkeletonTodo from './skeletons/SkeletonTodo';
import myTheme from './themeSetup';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState(myTheme);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const ui = useRef(null);

  const handleSignedInUser = (user) => {
    setLoggedIn(true);
  }

  const uiConfig = {
      'callbacks': {
        // Called when the user has been successfully signed in.
        'signInSuccessWithAuthResult': function(authResult, redirectUrl) {
          if (authResult.user) {
            handleSignedInUser(authResult.user);
          }
          if (authResult.additionalUserInfo) {
            setLoggedUser([
              authResult.additionalUserInfo.profile.name,
              authResult.additionalUserInfo.profile.id,
            ]);
          }
          // Do not redirect.
          return false;
        }
      },
      "credentialHelper": firebaseui.auth.CredentialHelper.NONE,
      "signInSuccessUrl": 'https://todo.mikahimself.com',
      // Opens IDP Providers sign-in flow in a popup.
      'signInFlow': 'popup',
      'signInOptions': [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      // Terms of service url.
      'tosUrl': 'https://www.google.com',
      // Privacy policy url.
      'privacyPolicyUrl': 'https://www.google.com',
  };

  const useStyles = makeStyles((theme) => ({
    todoList: {
      borderRadius: theme.spacing(2),
    },
    listContainer: {
      background: darkMode ? "#424242" : "#50ADD0",
      borderRadius: theme.spacing(2),
      padding: theme.spacing(4, 5, 2),
      margin: theme.spacing(4, 0),
      textAlign: "center",
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2),
      },
    },
    addIcon: {
      fontSize: "2.5rem",
    }
  }))

  const classes = useStyles();
  const [todos, setTodos] = useState(null);
  const [addTodoOpen, setAddTodoOpen] = useState(false);

  useEffect(() => {
    ui.current = firebaseui.auth.AuthUI.getInstance()
    || new firebaseui.auth.AuthUI(firebase.auth());
    ui.current.start('#firebaseui-auth-container', uiConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => { setTodos(snapshot.docs.map(doc => (
      {
        id: doc.id,
        todoTitle: doc.data().todoTitle,
        todoContent: doc.data().todoContent,
        todoDone: doc.data().todoDone,
      })
    ).sort((a, b) => a.todoDone - b.todoDone ))})
  }, [])

  const handleAddTodoItem = (item) => {
    db.collection("todos").add({
      todoTitle: item.title,
      todoContent: item.content,
      todoDone: item.isDone,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  const handleThemeSwitch = () => {
    setDarkMode(!darkMode);
    const updatedTheme = {
      ...theme,
      palette: {
        primary: {
          main: "#4fb1d1",
        },
        type: !darkMode ? 'dark' : 'light',
      },
    }
    setTheme(createMuiTheme(updatedTheme));
  }

  const handleCheckTodo = (item) => {
    db.collection("todos").doc(item.todoId).set({
      todoDone: item.todoDone,
    }, { merge: true});
  }
 
  const handleEditTodoItem = (item) => {
    db.collection("todos").doc(item.todoId).set({
      todoTitle: item.title,
      todoContent: item.content
    }, { merge: true })
  }

  const handleAddTodoOpen = () => {
    setAddTodoOpen(true);
  }
  
  const handleAddTodoClose = () => {
    setAddTodoOpen(false);
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(setLoggedIn(false))
    .then(console.log("Signed out"))
    .then(ui.current.start('#firebaseui-auth-container', uiConfig));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToDoToolbar color="primary" setTheme={handleThemeSwitch} darkMode={darkMode}/>
      <Container color="primary" maxWidth="md" className={classes.pageContainer}>

        <Container className={classes.listContainer}>
          <List className={classes.todoList}>
            {todos && todos.map(todo => (
              <ToDo key={todo.id} loggedIn={loggedIn} todoId={todo.id} todoData={todo} handleEdit={handleEditTodoItem} handleCheck={handleCheckTodo}/>
            ))}
            {!todos && [1,2,3,4,5].map((n) => <SkeletonTodo key={n} />)}
            {loggedIn && (
              <IconButton color="secondary" onClick={handleAddTodoOpen} id="add-todo-button">
                <AddCircleIcon color="inherit" style={{ backgroundColor: "#ffffff", borderRadius: "50%"}} className={classes.addIcon} />
              </IconButton>
              )
            }
          </List>
        </Container>
      
        <AddDialog open={addTodoOpen} handleClose={handleAddTodoClose} handleAddTodoItem={handleAddTodoItem} />
        {loggedIn && loggedUser && (
          <div>Logged in as {loggedUser[0]} <Button onClick={handleSignOut}>Log out</Button></div>)}
        <div id="firebaseui-auth-container"></div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
