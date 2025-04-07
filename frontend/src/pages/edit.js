import { useState, useEffect } from "react";
import axios from "axios";
import {
  useParams,
} from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

const Edit = () => {
    const [todo, setTodo] = useState("");
    const {id} = useParams();

    useEffect(() => {
        getTodo(id);
        // setTodo({
        //   title: "todo",
        //   year: "1999",
        // });
      }, []);


    const getTodo = (id) => {
      axios
      .get(`${BASE_URL}/todo/${id}`)
      .then((res) =>
        setTodo(res.data)
      )
      .catch((err) =>
          // console.error(err)
          setTodo({
            title: "bad bad bad",
            year: "1999",
          })
        );
    };


    return (
      <div>
        <h1>Edit</h1>
        <h2>{todo.title}</h2>
        <h2>{todo.year}</h2>
      </div>

    );
  };
  
export default Edit;