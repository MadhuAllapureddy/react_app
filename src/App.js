import React, { useState, useEffect } from "react";
import "./App.css";
 // importing Components
 import Form from "./components/Form";
 import TodoList from "./components/TodoList";

 function App() {
  
   
   //state stuff
  const [inputText, setInputText] = useState("");//this line is to reset everytime
  const [todos, setTodos] = useState([]);
  const [status, setStatus]= useState("all");//It sets all as default value in dropdown
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run once when the app start
  useEffect(()=>{
    getLocalTodos();
  }, []);
  //Functions
   //use-Effect
  useEffect(() => {
   filterHandler();
   saveLocalTodos();// It will show the entered values in the application dev tool
  }, [todos, status]);// [] means the arrow function runs only once and [todos] means render...every time the todos value changes 
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todos => todos.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todos => todos.completed === false));
        break;  
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  //Save to Local
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  }
  const getLocalTodos =() =>{
    if(localStorage.getItem('todos')=== null)
    {
      localStorage.setItem('todos',JSON.stringify([]));
    }
    else{
     let todoLocal = JSON.parse(localStorage.getItem("todos"));
     setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Ed's Todo List</h1>
      </header>
      <Form 
       inputText={inputText}
       todos={todos} 
       setTodos={setTodos} 
       setInputText = {setInputText}
       setStatus = {setStatus}
       
       />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos = {filteredTodos} />
    </div>
  );
}

export default App;
