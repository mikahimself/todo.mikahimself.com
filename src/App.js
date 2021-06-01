import './App.css';
import IconButton from "@material-ui/core/IconButton";
import { ThemeProvider } from '@material-ui/styles';
import React, { useState, useEffect } from "react";
import { List, Container, makeStyles, createMuiTheme } from '@material-ui/core';
import ToDo from "./components/ToDo";
import { db } from "./firebase";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import firebase from "firebase";
import AddDialog from './components/AddDialog';
import ToDoToolbar from './components/ToDoToolbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#16131C",
    },
    secondary: {
      main: "#E12F38"
    },
    background: {
      default: "#90ccf4",
      paper: "#faffff",
    }
  }
})

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: theme.spacing(2),
  },
  list: {
    borderRadius: theme.spacing(2),
  },
  pageContainer: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    textAlign: "center"
  },
  listContainer: {
    backgroundColor: "#50ADD0",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4, 5, 2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  addIcon: {
    fontSize: "2.5rem",
  }
}))

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [addTodoOpen, setAddTodoOpen] = useState(false);

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
      <ToDoToolbar />
      <Container maxWidth="md" className={classes.pageContainer}>

        <Container className={classes.listContainer}>
          <List className={classes.list}>
            {todos.map(todo => (
              <ToDo key={todo.id} todoId={todo.id} todoData={todo} handleEdit={handleEditTodoItem} handleCheck={handleCheckTodo}/>
            ))}
            <IconButton color="secondary" onClick={handleAddTodoOpen}>
              <AddCircleIcon color="inherit" style={{ backgroundColor: "#ffffff", borderRadius: "50%"}} className={classes.addIcon} />
            </IconButton>
          </List>
        </Container>
      
        <AddDialog open={addTodoOpen} handleClose={handleAddTodoClose} handleAddTodoItem={handleAddTodoItem} />

      </Container>
    </ThemeProvider>
  );
}

export default App;
