import React, { useState } from "react";
import { isEmpty } from "lodash";
import shortid from "shortid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("Task empty");
      return;
    }

    const newTask = {
      id: shortid.generate(),
      name: task
    }

    setTasks([ ...tasks, newTask ]);
    setTask("");
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">

            {
              tasks.map((task) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <div>
                    <button className="btn btn-sm btn-danger mx-2">Eliminar</button>
                    <button className="btn btn-sm btn-warning">Editar</button>
                  </div>
                </li>
              ))
              
            }

          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit={addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la Tarea"
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            <button className="btn btn-dark btn-block w-100" type="submit">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;