import { Button, Switch, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { apiAddTask } from "src/apis/backendApis/TasksApi";

const AddTasksTab = () => {
  const [taskDetails, setTaskDetails] = useState<any>({
    description: "",
    campaign: null,
    locked: false,
    amount: 10,
    name: "",
    type: "BURN",
  });

  const fnAddTasks = async () => {
    console.log("Add Tasks");

    const resTasks = await apiAddTask(taskDetails);
    console.log(resTasks);
    setTaskDetails(resTasks?.data);
  };

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskDetails((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    const numberIPArr = ["amount"];

    if (numberIPArr.includes(name)) {
      setTaskDetails((prevState: any) => ({
        ...prevState,
        [name]: Number(value),
      }));
    }

    if (name === "locked") {
      setTaskDetails((prevState: any) => ({
        ...prevState,
        [name]: taskDetails?.locked ? false : true,
      }));
    }
    console.log(taskDetails);
  };

  // useEffect(() => {
  //   fnAddTasks();
  // }, []);

  return (
    <>
      {/* <h1>Add Tasks</h1> */}
      <TextInput
        style={{ margin: "8px" }}
        name="name"
        placeholder="Name"
        value={taskDetails?.name}
        onChange={(e) => handleIpChange(e)}
      />
      <TextInput
        style={{ margin: "8px" }}
        name="description"
        placeholder="Description"
        value={taskDetails?.description}
        onChange={(e) => handleIpChange(e)}
      />
      <TextInput
        style={{ margin: "8px" }}
        name="campaign"
        placeholder="Campaign"
        value={taskDetails?.campaign || ""}
        onChange={(e) => handleIpChange(e)}
      />

      {/* <TextInput
        style={{ margin: "8px" }}
        name="locked"
        placeholder="Locked"
        value={taskDetails?.locked || ""}
        onChange={(e) => handleIpChange(e)}
      /> */}

      <Switch
        className="m-2"
        label="locked"
        name="locked"
        checked={taskDetails?.locked}
        onChange={(e) => handleIpChange(e)}
      />

      <TextInput
        style={{ margin: "8px" }}
        name="amount"
        placeholder="Amount"
        value={Number(taskDetails?.amount || 0)}
        onChange={(e) => handleIpChange(e)}
      />

      <TextInput
        style={{ margin: "8px" }}
        name="type"
        placeholder="Type"
        value={taskDetails?.type || ""}
        onChange={(e) => handleIpChange(e)}
      />

      <Button className="m-2" onClick={fnAddTasks}>
        Add Task
      </Button>
    </>
  );
};

export default AddTasksTab;
