import { Badge, Button } from "@mantine/core";
import { IconBadge, IconCoin, IconHistory, IconTrophy } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // fnViewTasks();
  });


  return (
    <>
      <Button className="mt-2 " onClick={fnViewTasks}>View Tasks</Button>

      <div className=" border-indigo-200">
        {tasks?.map((task) => {
          return (
            <div className="m-4" key={task.id}>
              <div className="flex">
                <h1>
                  <Badge>{task.name}</Badge>
                </h1>
                <p className="ml-4 flex items-center align-middle">
                  <div className="mr-1">{task.amount}</div>
                  <IconCoin size={16} color="orange" /> 
                  {/* <Badge> {task.amount}</Badge>{" "} */}
                </p>
              </div>
              <p className="mt-2">{task.description}</p>

              {/* <p>{task.tag}</p> */}
              {/* <p>{task.taskIdInGroup}</p> */}

              <p className="mt-4 text-gray-500 flex align-middle items-center">
                <IconHistory className="mr-1" size={12} color="gray" />
                <div className="text-xs ">

                {new Date(task.updatedAt).toLocaleDateString()}
                </div>
              </p>

              <hr />
              {/* <p>{task.createdAt}</p> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewTasksTab;
