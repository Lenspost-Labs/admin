import { Button, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { apiGetAllPointsHistory } from "src/apis/backendApis/RewardsApi";
import {
  apiGetAllUsers,
  apiGetSpecificUser,
} from "src/apis/backendApis/UsersApi";

const RewardsPage = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [usersArray, setUsersArray] = useState<User[]>([]);
  const [rewardUserEVM, setRewardUserEVM] = useState<any[]>([]);

  const fnViewAllRewards = async () => {
    console.log("View Rewards");

    const resRewards = await apiGetAllPointsHistory();
    // console.log(resRewards?.data);
    setRewards(resRewards?.data);

    fnSetUsers();
  };

  const fnSetUsers = async () => {
    const response = await apiGetAllUsers();
    // console.log("Users:", response?.data);
    setUsersArray(response?.data);

    fnGetUserEVM();
  };

  let resFinalUsersArr: any[] = [];
  const fnGetUserEVM = async () => {
    console.log("Get User EVM");

    console.log(usersArray);
    console.log(rewards);
    for (let i = 0; i < usersArray.length; i++) {
      if (usersArray[i].id == rewards[i].id) {
        resFinalUsersArr.push(usersArray[i].evm_address);
      }
    }

    console.log(resFinalUsersArr);
    setRewardUserEVM(resFinalUsersArr);
  };

  const rows = rewards?.map((reward, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1 || "----"}</Table.Td>
      <Table.Td> {reward.id || "----"} </Table.Td>
      <Table.Td> {rewardUserEVM[index] || "----"} </Table.Td>
      <Table.Td> {reward.points || "----"} </Table.Td>
    </Table.Tr>
  ));
  useEffect(() => {
    fnViewAllRewards();
    // fnSetUsers();
    // fnGetUserEVM();
  }, []);

  return (
    <>
      <h1>Rewards</h1>
      <Button onClick={fnViewAllRewards}>View Rewards</Button>
      {rewards?.length > 0 && (
        <Table stickyHeader stickyHeaderOffset={56}>
          <Table.Thead>
            <Table.Th>#</Table.Th>
            <Table.Th>User ID</Table.Th>
            <Table.Th>EVM Address</Table.Th>
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
