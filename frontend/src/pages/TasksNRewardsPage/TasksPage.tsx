import React from "react";
import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconPhoto } from "@tabler/icons-react";
import ViewTasksTab from "./Tabs/ViewTasksTab";
import AddTasksTab from "./Tabs/AddTasksTab";

const TasksPage = () => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <>
      <h1>Tasks</h1>

      <Tabs defaultValue="viewTasks">
        <Tabs.List>
          <Tabs.Tab
            value="viewTasks"
            leftSection={<IconPhoto style={iconStyle} />}
          >
            View Tasks
          </Tabs.Tab>

          <Tabs.Tab
            value="addTasks"
            leftSection={<IconMessageCircle style={iconStyle} />}
          >
            Add Tasks
          </Tabs.Tab>

        </Tabs.List>

        <Tabs.Panel value="viewTasks">
          <ViewTasksTab />
        </Tabs.Panel>

        <Tabs.Panel value="addTasks">
          {" "}
          <AddTasksTab />
        </Tabs.Panel>

      </Tabs>
    </>
  );
};

export default TasksPage;
