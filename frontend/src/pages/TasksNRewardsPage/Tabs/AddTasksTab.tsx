import { Button, Input } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { apiAddTask } from "src/apis/backendApis/TasksApi";

const AddTasksTab = () => {
  const [taskDetails, setTaskDetails] = useState({
    description: "Lenspost Admin Test",
    campaign: null,
    locked: true,
    amount: 10,
    name: "Lenspost Admin Test",
  });

  const fnAddTasks = async () => {
    console.log("Add Tasks");

    const resTasks = await apiAddTask(taskDetails);
    console.log(resTasks);
    setTaskDetails(resTasks?.data);
  };

  const handleIpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
      <h1>Add Tasks</h1>
      <Input
        name="name"
        placeholder="Name"
        value={taskDetails?.name}
        onChange={(e) => handleIpChange(e)}
      />
      <Input
        name="description"
        placeholder="Description"
        value={taskDetails?.description}
        onChange={(e) => handleIpChange(e)}
      />
      <Input
        name="campaign"
        placeholder="Campaign"
        value={taskDetails?.campaign || ""}
        onChange={(e) => handleIpChange(e)}
      />
      <Input
        name="locked"
        placeholder="Locked"
        value={taskDetails?.locked.toString()}
        onChange={(e) => handleIpChange(e)}
      />
      <Input
        placeholder="Amount"
        name="amount"
        value={taskDetails?.amount}
        onChange={(e) => handleIpChange(e)}
      />

      <Button onClick={fnAddTasks}>Add Tasks</Button>
    </>
  );
};

export default AddTasksTab;
