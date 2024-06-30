import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import axios from "axios";
import { backendUrl } from "../../config/backendUrl";

const Viewer = () => {
  const [dashData, setDashData] = useState({ recentViews: [], favorites: [] });

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
          `${backendUrl}/api/users/dashboard/`,
          config
        );
        // Correctly access the dashdata property from the response
        setDashData(response.data.dashdata);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={5}>
      <Heading size="md" mb={4}>
        Recent Views
      </Heading>
      <List spacing={3}>
        {dashData.recentViews.map((view) => (
          <ListItem key={view.id}>
            <ListIcon as={MdCheckCircle} color="green.500" />
            {view.title} - Viewed on {view.viewedOn}
          </ListItem>
        ))}
      </List>
      <Divider my={6} />
      <Heading size="md" mb={4}>
        Favorites
      </Heading>
      <List spacing={3}>
        {dashData.favorites.map((favorite) => (
          <ListItem key={favorite.id}>
            <ListIcon as={MdCheckCircle} color="green.500" />
            {favorite.title}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Viewer;
