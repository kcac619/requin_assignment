import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { MdError, MdInfo } from "react-icons/md";
import axios from "axios";
import { backendUrl } from "../../config/backendUrl";
import { FaUsers, FaUserCheck, FaUserTimes, FaFileAlt } from "react-icons/fa";

const Admin = () => {
  const [dashData, setDashData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    reportsGenerated: 0,
    systemAlerts: [],
  });

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).data.token
        }`,
      },
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/users/dashboard`,
          config
        );
        setDashData(response.data.dashdata);
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={5} alignItems={"center"}>
      <Heading mb={4}>Admin Dashboard</Heading>
      <StatGroup>
        <Stat>
          <StatLabel>
            <Box as={FaUsers} mr={2} />
            Total Users
          </StatLabel>
          <StatNumber>{dashData.totalUsers}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>
            <Box as={FaUserCheck} mr={2} />
            Active Users
          </StatLabel>
          <StatNumber>{dashData.activeUsers}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>
            <Box as={FaUserTimes} mr={2} />
            Inactive Users
          </StatLabel>
          <StatNumber>{dashData.inactiveUsers}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>
            <Box as={FaFileAlt} mr={2} />
            Reports Generated
          </StatLabel>
          <StatNumber>{dashData.reportsGenerated}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Admin;
