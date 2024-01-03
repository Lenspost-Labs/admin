import { AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IconHome2,
  IconUser,
  IconGridPattern,
  IconSquareRoundedLetterD,
  IconTemplate,
  IconGraphFilled,
  IconSubtask,
  IconReceiptDollar,
} from "@tabler/icons-react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
import LoginBtn from "src/utils/LoginBtn";
import LogoutBtn from "src/utils/LogoutBtn";

const MantineAppShell = () => {
  const { userEmail, isWhitelisted } = useContext(AppContext);
  const [opened, { toggle }] = useDisclosure();
  const [currentRoute, setCurrentRoute] = useState("OneStepUpload");
  const ref = useRef<HTMLAnchorElement>(null);

  // console.log("MantineAppShell userEmail: ", userEmail);
  // console.log("MantineAppShell isWhitelisted: ", isWhitelisted);
  // console.log(localStorage.getItem("jwt"));

  const NavbarItemsArray = [
    {
      name: "OneStepUpload",
      route: "/oneStepUpload",
      icon: <IconHome2 size="1rem" stroke={1.5} />,
    },
    // {
    //   name: "DeleteCache",
    //   route: "/deleteCache",
    //   icon: <IconSquareRoundedLetterD size="1rem" stroke={1.5} />,
    // },
    // {
    //   name: "DeleteCacheByPattern",
    //   route: "/deleteCacheByPattern",
    //   icon: <IconGridPattern size="1rem" stroke={1.5} />,
    // },
    {
      name: "Users",
      route: "/users",
      icon: <IconUser size="1rem" stroke={1.5} />,
    },
    {
      name: "Templates",
      route: "/templates",
      icon: <IconTemplate size="1rem" stroke={1.5} />,
    },
    {
      name: "Collections",
      route: "/collections",
      icon: <IconGraphFilled size="1rem" stroke={1.5} />,
    },
    {
      name: "Tasks",
      route: "/tasks",
      icon: <IconSubtask size="1rem" stroke={1.5} />,
    },
    {
      name: "Points Leaderboard",
      route: "/rewardLeaderboard",
      icon: <IconReceiptDollar size="1rem" stroke={1.5} />,
    },
  ];

  useEffect(() => {
    // Navigate to /oneStepUpload by default - react router dom

  }, []);

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            {/* <MantineLogo size={30} /> */}
            <Link to="/">
                <b>Raveshare Admin</b>
            </Link>
          </Group>
        </AppShell.Header>
        {userEmail !== "" &&
        isWhitelisted &&
        localStorage.getItem("jwt") !== null ? (
          <>
            <AppShell.Navbar p="md">
              {/* <hr /> */}
              <div className="m-2 mb-4 text-blue-600">
                {userEmail && userEmail}
              </div>
              <hr className="mb-6" />
              {NavbarItemsArray
                // .fill(0)
                .map((val, index) => (
                  // <Skeleton key={index} h={28} mt="sm" animate={false} />
                  <Link to={val.route} key={index}>
                    <NavLink
                      ref={ref}
                      // href={`${val.route}`}
                      label={val.name}
                      onClick={() => setCurrentRoute(val.route)}
                      active={currentRoute === val.route}
                      variant="filled"
                      leftSection={val.icon}
                      // rightSection={
                      //   <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                      // }
                    />
                  </Link>
                ))}
              <LogoutBtn />
              {/* <AppShell.Footer p="md"> <div className=""> <Button variant="light" color="red" size="xs"> Logout </Button> </div> </AppShell.Footer> */}
            </AppShell.Navbar>
            <AppShell.Main>
              {" "}
              <Outlet />{" "}
            </AppShell.Main>
          </>
        ) : (
          <LoginBtn />
        )}

        {userEmail && !isWhitelisted && (
          <>
            <div className="flex justify-center mt-4 text-red-500">
              {userEmail} is not Whitelisted for Admin Access
            </div>
          </>
        )}
      </AppShell>
    </>
  );
};

export default MantineAppShell;
