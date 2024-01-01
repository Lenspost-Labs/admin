import { Button, Loader, Modal, TextInput } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import {
  apiGetAllUsers,
} from "src/apis/backendApis/UsersApi";
import { Table } from "@mantine/core";
import { IconEdit, IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {AppContext} from "src/context/AppContext";
import EditUserModal from "./EditUserModal";

const UsersPage = () => {
  const [usersArray, setUsersArray] = useState<User[]>([]);
  const [globalUsersArray, setGlobalUsersArray] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
const { setEditUserIndex } = useContext(AppContext);

  const fnViewUsers = async () => {
    setLoading(true);
    const response = await apiGetAllUsers();

    console.log("Users:", response);
    setUsersArray(response?.data);
    setGlobalUsersArray(response?.data); //To implement Search
    setLoading(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      let value = e.target.value.toLowerCase();
      let filteredUsers = globalUsersArray.filter(
        (user: { lens_handle: string }) =>
          user?.lens_handle?.toLowerCase()?.includes(value)
      );
      setUsersArray(filteredUsers);
    } else {
      setUsersArray(globalUsersArray);
    }
  };


  const fnUpdateUser = async () => {
    // console.log("editUser:", editUser);
    // const response = await apiEditUserDetails(editUser);
    // console.log("response:", response);
  };

  const rows = usersArray.map((user, index) => (
    <Table.Tr key={user.id}>
      {/* <Table.Td>{index + 1 || "----"}</Table.Td> */}
      <Table.Td>{user?.id ? user?.id : "----"}</Table.Td>
      <Table.Td>{user?.profileId ? user?.profileId : "----"}</Table.Td>
      <Table.Td>{user?.username ? user?.username : "----"}</Table.Td>
      <Table.Td>{user?.lens_handle ? user?.lens_handle : "----"}</Table.Td>
      <Table.Td>{user?.mail ? user?.mail : "----"}</Table.Td>
      <Table.Td>{user?.points ? user?.points : "----"}</Table.Td>
      <Table.Td>{user?.evm_address ? user?.evm_address : "----"}</Table.Td>
      <Table.Td>
        {user?.solana_address ? user?.solana_address : "----"}
      </Table.Td>
      <Table.Td
        // onClick={() => {
        //   open;
        //   setEditIndex(index);
        // }}
        onClick={open}
      >
        {" "}
        <IconEdit onClick={() => setEditUserIndex(user?.id)} size={16} />{" "}
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    fnViewUsers();
    console.log("usersArray:", usersArray);
  }, []);

  return (
    <>
      <div className="flex justify-between flex-wrap">
        <div className="flex align-middle m-4"> Users </div>

        <div className="m-4">
          <TextInput
            className="w-full"
            type="search"
            name="search"
            leftSection={<IconSearch size={16} />}
            // label="Search by Lens Handle"
            placeholder="Search by Lens Handle"
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        </div>
      </div>

      {loading && (
        <div className="m-4 text-yellow-800 align-middle">
          <p>
            {" "}
            <Loader />{" "}
          </p>
        </div>
      )}

      {usersArray.length > 0 && (
        <Table stickyHeader stickyHeaderOffset={56}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User ID</Table.Th>
              <Table.Th>Profile ID</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th>Lens Handle</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Points</Table.Th>
              <Table.Th>EVM Address</Table.Th>
              <Table.Th>Solana Address</Table.Th>
              <Table.Th>Edit</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}
      {usersArray.length === 0 && !loading && <p>No Users</p>}

      {usersArray.length > 0 ? (
        <Modal
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          opened={opened}
          onClose={close}
          title={`Edit User Details for UserID`}
        >
          <EditUserModal /> 
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default UsersPage;
