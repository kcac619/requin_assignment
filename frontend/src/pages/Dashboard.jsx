import React, { useEffect } from "react";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Admin from "../components/dashboard/Admin";
import Editor from "../components/dashboard/Editor";
import Viewer from "../components/dashboard/Viewer";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("userInfo");
    if (!userDataString) {
      navigate("/");
    }
  }, [navigate]);

  const userDataString = localStorage.getItem("userInfo");
  const userData = userDataString ? JSON.parse(userDataString).data : null;
  const role = userData ? userData.role : "No role found";
  console.log(role);
  return (
    <Box bg="white" w={"80%"} minH="95vh" borderRadius={"lg"} p={5}>
      <VStack spacing={4} align="stretch">
        <Heading
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          as="h1"
          size="xl"
          color="blue.500"
        >
          <Text fontSize="4xl">Dashboard</Text>
          <Button colorScheme="blue" onClick={logout}>
            Logout
          </Button>
        </Heading>
        {(() => {
          switch (role) {
            case "admin":
              return (
                <Text fontSize="xl">
                  <Admin />
                </Text>
              );
            case "editor":
              return (
                <Text fontSize="xl">
                  <Editor />
                </Text>
              );
            case "viewer":
              return (
                <Text fontSize="xl">
                  <Viewer />
                </Text>
              );
            default:
              return <Text fontSize="xl">Role not found</Text>;
          }
        })()}
      </VStack>
    </Box>
  );
};

export default Dashboard;
