import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import { MdCheckCircle, MdDrafts, MdPublish } from "react-icons/md";
import axios from "axios"; // Import axios
import { backendUrl } from "../../config/backendUrl";

const Editor = () => {
  const [dashData, setDashData] = useState({ drafts: [], published: [] });

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).data.token // Correct way to retrieve the token
        }`,
      },
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/users/dashboard/`,
          config
        );
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
        Drafts
      </Heading>
      <List spacing={3}>
        {dashData.drafts.map((draft) => (
          <ListItem key={draft.id}>
            <ListIcon as={MdDrafts} color="orange.500" />
            {draft.title} - Last Edited: {draft.lastEdited}
          </ListItem>
        ))}
      </List>
      <Divider my={6} />
      <Heading size="md" mb={4}>
        Published
      </Heading>
      <List spacing={3}>
        {dashData.published.map((pub) => (
          <ListItem key={pub.id}>
            <ListIcon as={MdPublish} color="green.500" />
            {pub.title} - Published On: {pub.publishedOn}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Editor;
