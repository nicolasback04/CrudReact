import React, { useState } from "react";
import { isEmpty, size } from "lodash";
import shortid from "shortid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editeMode, setEditeMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const validForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(task)) {
      setError("Se debe ingresar una tarea");
      isValid = false;
    }

    return isValid;
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const newTask = {
      id: shortid.generate(),
      name: task,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const saveTask = (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const editedTasks = tasks.map((item) =>
      item.id === id ? { id, name: task } : item
    );
    setTasks(editedTasks);
    setEditeMode(false);
    setTask("");
    setId("");
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const editTask = (theTask) => {
    setTask(theTask.name);
    setEditeMode(true);
    setId(theTask.id);
  };

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className={size(tasks) === 0 ? "list-group" : "list-group"}>
            {size(tasks) === 0 ? (
              <li className="list-group-item">Aún no hay tareas programadas</li>
            ) : (
              tasks.map((task) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={task.id}
                >
                  <span className="lead">{task.name}</span>
                  <div>
                    <button
                      className="btn btn-sm btn-danger mx-2"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => editTask(task)}
                    >
                      Editar
                    </button>
                  </div>
                </li>
                ))
              )
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editeMode ? "Modificar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={editeMode ? saveTask : addTask}>
            {error && <span className="text-danger">{error}</span>}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la Tarea"
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            <button
              className={
                editeMode
                  ? "btn btn-warning btn-block w-100"
                  : "btn btn-dark btn-block w-100"
              }
              type="submit"
            >
              {editeMode ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
