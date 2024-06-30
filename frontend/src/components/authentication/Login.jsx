import React, { useState } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { backendUrl } from "../../config/backendUrl";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (username && password) {
      setIsLoggingIn(true);
      try {
        const data = await axios.post(
          `${backendUrl}/api/users/login`,
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setIsLoggingIn(false);
        navigate("/dashboard");
      } catch (error) {
        console.error(`Login failed: ${error.message}`);
        toast({
          title: "Login Failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        setIsLoggingIn(false);
      }
    } else {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button isLoading={isLoggingIn} onClick={handleLogin}>
          LOGIN
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
