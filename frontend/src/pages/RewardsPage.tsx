import { Button, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { apiGetAllPointsHistory } from "src/apis/backendApis/RewardsApi";
import { apiGetSpecificUser } from "src/apis/backendApis/UsersApi";

const RewardsPage = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);

  const fnViewAllRewards = async () => {
    console.log("View Rewards");

    const resTasks = await apiGetAllPointsHistory();
    console.log(resTasks);
    setRewards(resTasks?.data?.message);
  };

  const fnGetUserDetails = async (id: number) => {
    console.log("Get User Details");
    const resTasks = await apiGetSpecificUser(id);
    console.log(resTasks);
  };

  // fnGetUserDetails(1);
  const rows = rewards.map((reward, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1 || "----"}</Table.Td>
      <Table.Td> {reward.id || "----"} </Table.Td>
      <Table.Td> {reward.points || "----"} </Table.Td>
    </Table.Tr>
  ));
  useEffect(() => {
    fnViewAllRewards();
  }, []);
  return (
    <>
      <h1>Rewards</h1>
      <Button onClick={fnViewAllRewards}>View Rewards</Button>
      {rewards.length > 0 && (
        <Table  stickyHeader stickyHeaderOffset={56}>
          <Table.Thead>
            <Table.Th>#</Table.Th>
            <Table.Th>User ID</Table.Th>
            <Table.Th>Points</Table.Th>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}

      {/* {rewards?.map((reward) => {
        return (
          <div key={reward.id}>
            <h1>{reward.id}</h1>
            <h1>{reward.points}</h1>
            <h1>{fnGetUserDetails}</h1>
          </div>
        );
      })} */}
    </>
  );
};

export default RewardsPage;
