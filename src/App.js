import './App.css';
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, List, Container, makeStyles } from '@material-ui/core';
import { Input } from "@material-ui/core"
import ToDo from "./components/ToDo";
import { db } from "./firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  list: {
    maxWidth: "100%",
    backgroundColor: "rgb(242, 156, 163)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
}))

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => { setTodos(snapshot.docs.map(doc => (
      {
        id: doc.id,
        todo: doc.data().todo,
      })
    ))})
  }, [])

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



      <List className={classes.list}>
        {todos.map(todo => (
          <ToDo key={todo.id} todoData={todo} />
        ))}
        <ToDo />
      </List>
    </Container>
  );
}

export default App;
