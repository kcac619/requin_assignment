import React, { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Register from "../components/authentication/Register";
import Login from "../components/authentication/Login";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <h1 className="header">REQUIN ASSIGNMENT RBAC</h1>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="auto%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Tabs variant={"soft-rounded"}>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </div>
    </>
  );
};

export default Home;
