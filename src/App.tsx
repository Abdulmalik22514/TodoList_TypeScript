import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskToDelete: string): void => {
    setTodoList(todoList.filter((t) => t.taskName !== taskToDelete));
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task...."
            name="task"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)"
            onChange={handleChange}
            name="deadline"
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="todoList">
        {todoList.map((task: ITask, index: number) => {
          return (
            <TodoTask key={index} task={task} completeTask={completeTask} />
          );
        })}
      </div>
    </div>
  );
};

export default App;
