import './App.css';
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, List } from '@material-ui/core';
import { Input } from "@material-ui/core"
import ToDo from "./components/ToDo";
import { db } from "./firebase";
import firebase from "firebase";

function App() {
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
    <div className="App">
      <h1>Howdy</h1>
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

      <List>
        {todos.map(todo => (
          <ToDo key={todo.id} todoData={todo} />
        ))}
      </List>
    </div>
  );
}

export default App;
