import { useState, useEffect } from "react";
import axios from "axios";
import deleteIcon from "./assets/delete.svg";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";


const Home = () => {
  // return <h1>Home</h1>;

  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState("");
  const [formYear, setFormYear] = useState("");
  const [numistaNumber, setNumistaNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get(`${BASE_URL}/todos`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  };

  const handleAddTodo = () => {
    axios
      .post(`${BASE_URL}/todo/new`, {
        title: todo,
        year: formYear,
      })
      .then((res) => {
        setTodos([...todos, res.data]);
        setTodo("");
        setFormYear("");
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteTodo = (id) => {
    axios
    .delete(`${BASE_URL}/todo/delete/${id}`)
    .then((res) =>
      setTodos(todos.filter((todo) => todo._id !== res.data._id))
    )
    .catch((err) =>
        console.error(err)
      );
  };

  function handleNumistaNumber () { 
    navigate('/create/' + numistaNumber);
  }

  const handleTodoClick = (id) => {
    axios
      .get(`${BASE_URL}/todo/toggleStatus/${id}`)
      .then((res) => getTodos())
      .catch((err) => console.error(err));
  };
  return (
    <div className="App">
      <Button variant="outline-primary">
        This is an add button too!
      </Button>
      <div className="todo-input-wrapper">

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          Todo Text
        </InputGroup.Text>
        <Form.Control 
          id="basic-url" 
          aria-describedby="basic-addon3" 
          value={todo}
          onChange={(e) => setTodo(e.target.value)} 
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          Year
        </InputGroup.Text>
        <Form.Control 
          id="basic-url" 
          aria-describedby="basic-addon3" 
          value={formYear}
          onChange={(e) => setFormYear(e.target.value)} 
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          N#
        </InputGroup.Text>
        <Form.Control
          id="basic-url"
          aria-describedby="basic-addon3"
          value={numistaNumber}
          onChange={(e) => setNumistaNumber(e.target.value)}
        />
      </InputGroup>
      <Button variant="outline-primary" onClick={handleNumistaNumber}>
        Go
      </Button>
        
      <Button onClick={handleAddTodo}>
        +
      </Button>
      </div>
      <div className="todos-list">
        {!todos || !todos.length ? (
          <h3 style={{ textAlign: "center" }}>No Todo Data !!!</h3>
        ) : (
          todos.map((todo) => (
            <div className="todo" key={todo._id}>
              <div
                onClick={() => handleTodoClick(todo._id)}
                className={todo.complete ? "complete" : ""}
                id="todo-title"
              >
                {todo.title}, {todo.year}
              </div>
              <Button variant="outline-primary" onClick={() => handleDeleteTodo(todo._id)}>
                <img src={deleteIcon} alt="delete" height="20px" width="20px" />
              </Button>
              <Link to={'/edit/' + todo._id}>EDIT</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// () => this.nextPath("/edit/" + todo._id)

export default Home;

  // function App() {
//   const [todos, setTodos] = useState(null);
//   const [todo, setTodo] = useState("");
//   const [formYear, setFormYear] = useState("");

//   useEffect(() => {
//     getTodos();
//   }, []);

//   const getTodos = () => {
//     axios
//       .get(`${BASE_URL}/todos`)
//       .then((res) => setTodos(res.data))
//       .catch((err) => console.error(err));
//   };

//   const handleAddTodo = () => {
//     axios
//       .post(`${BASE_URL}/todo/new`, {
//         title: todo,
//         year: formYear,
//       })
//       .then((res) => {
//         setTodos([...todos, res.data]);
//         setTodo("");
//         setFormYear("");
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleDeleteTodo = (id) => {
//     axios
//     .delete(`${BASE_URL}/todo/delete/${id}`)
//     .then((res) =>
//       setTodos(todos.filter((todo) => todo._id !== res.data._id))
//     )
//     .catch((err) =>
//         console.error(err)
//       );
//   };

//   const handleTodoClick = (id) => {
//     axios
//       .get(`${BASE_URL}/todo/toggleStatus/${id}`)
//       .then((res) => getTodos())
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className="App">
//       {/* <Button variant="outline-primary" onClick={handleAddTodo}> */}
//       <Button variant="outline-primary">
//         This is an add button too!
//       </Button>
//       <div className="todo-input-wrapper">

//       <InputGroup className="mb-3">
//         <InputGroup.Text id="basic-addon3">
//           Todo Text
//         </InputGroup.Text>
//         <Form.Control 
//           id="basic-url" 
//           aria-describedby="basic-addon3" 
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)} 
//         />
//       </InputGroup>
//       <InputGroup className="mb-3">
//         <InputGroup.Text id="basic-addon3">
//           Year
//         </InputGroup.Text>
//         <Form.Control 
//           id="basic-url" 
//           aria-describedby="basic-addon3" 
//           value={formYear}
//           onChange={(e) => setFormYear(e.target.value)} 
//         />
//       </InputGroup>
        
//       <Button onClick={handleAddTodo}>
//         +
//       </Button>
//       </div>
//       <div className="todos-list">
//         {!todos || !todos.length ? (
//           <h3 style={{ textAlign: "center" }}>No Todo Data !!!</h3>
//         ) : (
//           todos.map((todo) => (
//             <div className="todo" key={todo._id}>
//               <div
//                 onClick={() => handleTodoClick(todo._id)}
//                 className={todo.complete ? "complete" : ""}
//                 id="todo-title"
//               >
//                 {todo.title}, {todo.year}
//               </div>
//               <Button variant="outline-primary" onClick={() => handleDeleteTodo(todo._id)}>
//                 <img src={deleteIcon} alt="delete" height="20px" width="20px" />
//               </Button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
  
