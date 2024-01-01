import { Button, Input } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { apiAddTask } from "src/apis/backendApis/TasksApi";

const AddTasksTab = () => {
  const [taskDetails, setTaskDetails] = useState({
    description: "",
    campaign: null,
    locked: true,
    amount: 10,
    name: "",
  });

  const fnAddTasks = async () => {
    console.log("Add Tasks");

    const resTasks = await apiAddTask(taskDetails);
    console.log(resTasks);
    setTaskDetails(resTasks?.data);
  };

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fnAddTasks();
  }, []);

  return (
    <>
      {/* <h1>Add Tasks</h1> */}
      <Input
        style={{ margin: "8px" }}
        name="name"
        placeholder="Name"
        value={taskDetails?.name}
        onChange={(e) => handleIpChange(e)}
      />
      <Input
        style={{ margin: "8px" }}
        name="description"
        placeholder="Description"
        value={taskDetails?.description}
        onChange={(e) => handleIpChange(e)}
      />
      <Input
        style={{ margin: "8px" }}
        name="campaign"
        placeholder="Campaign"
        value={taskDetails?.campaign || ""}
        onChange={(e) => handleIpChange(e)}
      />
      <Input
        style={{ margin: "8px" }}
        name="locked"
        placeholder="Locked"
        value={taskDetails?.locked.toString()}
        onChange={(e) => handleIpChange(e)}
      />
      <Input
        style={{ margin: "8px" }}
        placeholder="Amount"
        name="amount"
        value={taskDetails?.amount}
        onChange={(e) => handleIpChange(e)}
      />

      <Button className="m-2" onClick={fnAddTasks}>
        Add Task
      </Button>
    </>
  );
};

export default AddTasksTab;
