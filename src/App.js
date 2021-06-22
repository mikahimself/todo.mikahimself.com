import './App.css';
import IconButton from "@material-ui/core/IconButton";
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
import LoginDialog from './components/LoginDialog';
import { firebaseApp } from './firebase';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState(myTheme);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [todos, setTodos] = useState(null);
  const [addTodoOpen, setAddTodoOpen] = useState(false);
  const unsubscriber = useRef(null);

  useEffect(() => {
    if (loggedIn && loggedUser) {
      unsubscriber.current = db.collection("todos").where("userId", "==", loggedUser.uid).orderBy("timestamp", "desc").onSnapshot(snapshot => { setTodos(snapshot.docs.map(doc => (
        {
          id: doc.id,
          todoTitle: doc.data().todoTitle,
          todoContent: doc.data().todoContent,
          todoDone: doc.data().todoDone,
          todoUid: doc.data().userId,
        })
      ).sort((a, b) => a.todoDone - b.todoDone ))})}
  }, [loggedIn, loggedUser]);

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
  }));

  const classes = useStyles();

  const handleSignedInStatus = (user, loggedIn) => {
    if (loggedIn) {
      setLoggedUser(user);
      setLoggedIn(loggedIn);
    } else {
      setTodos(null);
      unsubscriber.current();
      setLoggedUser(null);
      setLoggedIn(false);
      firebaseApp.auth().signOut();
    }
  } 

  const handleAddTodoItem = (item) => {
    db.collection("todos").add({
      todoTitle: item.title,
      todoContent: item.content,
      todoDone: item.isDone,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: loggedUser.uid,
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToDoToolbar handleSignedInStatus={handleSignedInStatus} loggedIn={loggedIn} color="primary"  setTheme={handleThemeSwitch} darkMode={darkMode}/>
      {loggedIn && (<Container color="primary" maxWidth="md" className={classes.pageContainer}>

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
        
      </Container>)}
      {!loggedIn && (
          <LoginDialog handleSignedInStatus={handleSignedInStatus} styles={classes}/>
        )}
    </ThemeProvider>
  );
}

export default App;
