import { Loader, LoadingOverlay } from "@mantine/core";
import { Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { apiGetUsers } from "src/apis/backendApis/UsersApi";

const UsersPage = () => {
  const [usersArray, setUsersArray] = useState<User[]>([]);
  const [globalUsersArray, setGlobalUsersArray] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fnViewUsers = async () => {
    const response = await apiGetUsers();

    console.log("Users:", response);
    setUsersArray(response?.data);
    setGlobalUsersArray(response?.data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase();
    console.log("value:", value);

    if (value === "") setUsersArray(globalUsersArray);
    let filteredUsers = globalUsersArray.filter(
      (user: { lens_handle: string }) =>
        user?.lens_handle?.toLowerCase()?.includes(value)
    );
    setUsersArray(filteredUsers);
  };

  useEffect(() => {
    // fnViewUsers();

    console.log("usersArray:", usersArray);
  }, [usersArray]);

  useEffect(() => {
    fnViewUsers();
    console.log("usersArray:", usersArray);
  }, []);
  return (
    <>
      <div className="m-8">
        <Typography
          color="blue-gray"
          className="mb-4 mt-4"
          placeholder={undefined}
        >
          Users
        </Typography>
      </div>

      {/* Search Functionality for the Below details */}

      <div className="flex flex-wrap">
        <div className="m-4">
          <Input
            // className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            className="w-full"
            type="search"
            name="search"
            label="Search by Lens Handle"
            onChange={(e) => {
              handleSearch(e);
            }}
            crossOrigin={undefined}
          />
        </div>
      </div>

      <div className="flex flex-col h-full overflow-scroll">
        {usersArray.length > 0 &&
          usersArray.map((user) => (
            <div key={user?.id} className="m-4 bg-gray-100 p-4 rounded-md">
              <div className="">ID: {user?.id}</div>
              <div className="">Username: {user?.username}</div>
              <div className="">EVM Address: {user?.evm_address}</div>
              <div className="">Solana Address: {user?.solana_address}</div>
              <div className="">Lens Handle: {user?.lens_handle}</div>
              <div className="">Mail: {user?.mail}</div>
              <div className="">Points: {user?.points}</div>
              <div className="">Profile ID: {user?.profileId}</div>
            </div>
          ))}

        {loading && (
          <div className="m-4 text-yellow-800 align-middle">
            <p>
              {" "}
              <Loader />{" "}
            </p>
          </div>
        )}

        {usersArray.length === 0 && !loading && <p>No Users</p>}
      </div>
    </>
  );
};

export default UsersPage;
