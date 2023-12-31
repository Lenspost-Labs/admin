import { Button } from "@mantine/core";
import React, { useState } from "react";
import { apiGetAllTasks } from "src/apis/backendApis/TasksApi";

const ViewTasksTab = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // id: 0,
  // amount : 0,
  // campaign: "",
  // description: "",
  // locked: false,
  // name: "",
  // tag: "",
  // taskIdInGroup: 0,
  // createdAt: "",
  // updatedAt: "",
  // });

  // locked
  // :
  // false
  // name
  // :
  // "Mint to Base"
  // tag
  // :
  // "Mint"
  // taskIdInGroup
  // :
  // 0
  // updatedAt
  // :
  // "2023-12-03T20:21:12.514Z"

  const fnViewTasks = async () => {
    console.log("View Tasks");

    const resTasks = await apiGetAllTasks();
    console.log(resTasks);
    setTasks(resTasks?.data);
  };

  return (
    <>
      <h1> View Tasks </h1>

      <Button onClick={fnViewTasks}>View Tasks</Button>

      <div className=" border-indigo-200">
      {tasks?.map((task) => {
        return (
          <div className="" key={task.id}>

            <h1>{task.name}</h1>
            <p>{task.description}</p>
            <p>{task.campaign}</p>
            <p>{task.amount}</p>
            <p>{task.tag}</p>
            <p>{task.taskIdInGroup}</p>
            <p>{task.updatedAt}</p>
            <p>{task.createdAt}</p>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default ViewTasksTab;
