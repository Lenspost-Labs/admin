import { Button, Loader, TextInput } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { apiGetSpecificUser } from "src/apis/backendApis/UsersApi";
import { AppContext } from "src/context/AppContext";

const EditUserModal = () => {
  const [editUser, setEditUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { editUserIndex } = useContext(AppContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // let { name, value } = e.target;
    // setEditUser((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const fnUpdateUser = async () => {
    // console.log("editUser:", editUser);
    // const response = await apiEditUserDetails(editUser);
    // console.log("response:", response);
  };

  const fnGetUserData = async (id: number) => {
    setLoading(true);
    const response = await apiGetSpecificUser(id);
    setEditUser(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    console.log("editUserIndex:", editUserIndex);
    fnGetUserData(editUserIndex);
  }, [editUserIndex]);

  return (
    <>
      {editUser && (
        <>
          <TextInput
            onChange={(e) => handleInputChange(e)}
            name="username"
            label="Username"
            value={editUser?.username}
          />
          <TextInput
            onChange={(e) => handleInputChange(e)}
            name="lens_handle"
            label="Lens Handle"
            value={editUser?.lens_handle}
          />
          <TextInput
            onChange={(e) => handleInputChange(e)}
            name=""
            label="Email ID"
            value={editUser?.mail}
          />
          <TextInput
            onChange={(e) => handleInputChange(e)}
            name="points"
            label="Points"
            value={editUser?.points}
          />
          <TextInput
            onChange={(e) => handleInputChange(e)}
            name="evm_address"
            label="EVM Address"
            value={editUser?.evm_address}
          />
          <TextInput
            onChange={(e) => handleInputChange(e)}
            name="solana_address"
            label="Solana Address"
            value={editUser?.solana_address}
          />

          <Button
            className="mt-2"
            onClick={() => {
              fnUpdateUser();
              close();
            }}
          >
            {" "}
            Update User{" "}
          </Button>
        </>
      )}
      {!editUser && <Button onClick={() => fnGetUserData(1)}>Get User</Button>}
      {loading && <Loader />}
    </>
  );
};

export default EditUserModal;
