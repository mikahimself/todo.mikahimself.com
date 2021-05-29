import './App.css';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, List, Container, makeStyles, Paper } from '@material-ui/core';
import { Input } from "@material-ui/core"
import ToDo from "./components/ToDo";
import { db } from "./firebase";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import firebase from "firebase";
import AddDialog from './components/AddDialog';

const useStyles = makeStyles((theme) => ({
  paper: {
    // backgroundColor: "rgb(242, 156, 163)",
    backgroundColor: "rgb(34, 170, 161)",
    borderRadius: theme.spacing(1),
  },
  list: {
    maxWidth: "100%",
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  addIcon: {
    fontSize: "2.5rem",
    color: "rgb(245, 255, 255)",
  }
}))

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [addTodoOpen, setAddTodoOpen] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => { setTodos(snapshot.docs.map(doc => (
      {
        id: doc.id,
        todo: doc.data().todo,
      })
    ))})
  }, [])

  const handleAddTodoOpen = () => {
    setAddTodoOpen(true);
  }
  
  const handleAddTodoClose = () => {
    setAddTodoOpen(false);
  }

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInput("");
  }

  return (
    <Container maxWidth="sm" className="App" >
   
      <h1>All Tasks Great and Small</h1>
      <form>
        <FormControl>
          <InputLabel>New ToDo</InputLabel>
        <Input value={input} onChange={(e) => setInput(e.target.value)}/>
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          color="primary"
          variant="contained"
          onClick={addTodo}>
            Add todo
          </Button>
      </form>


      <Paper className={classes.paper}>
      <List className={classes.list}>
        {todos.map(todo => (
          <ToDo key={todo.id} todoData={todo} />
        ))}
        <IconButton>
          <AddCircleIcon className={classes.addIcon} onClick={handleAddTodoOpen}/>
        </IconButton>
      </List>
      </Paper>

      <AddDialog open={addTodoOpen} handleClose={handleAddTodoClose} ></AddDialog>

    </Container>
  );
}

export default App;
