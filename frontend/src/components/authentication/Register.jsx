import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { backendUrl } from "../../config/backendUrl";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();

  const handleRegister = async (e) => {
    if (userName && password && role) {
      e.preventDefault();
      setIsRegistering(true);

      try {
        const data = await axios.post(
          `${backendUrl}/api/users/register`,
          {
            username: userName,
            password: password,
            role: role,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setIsRegistering(false);
        navigate("/dashboard");
      } catch (error) {
        console.error(`Registration failed: ${error.message}`);
        toast({
          title: "Registration Failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setIsRegistering(false);
      }
    } else {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      p={3}
      bg={"white"}
      borderRadius={"md"}
    >
      <VStack spacing={4}>
        <FormControl id="first-name" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Enter Your username"
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
        <FormControl>
          <FormLabel>Role :</FormLabel>
          <Select
            placeholder="Select Role"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option>admin</option>
            <option>editor</option>
            <option>viewer</option>
          </Select>
        </FormControl>
        <Button isLoading={isRegistering} onClick={handleRegister}>
          REGISTER NOW
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
