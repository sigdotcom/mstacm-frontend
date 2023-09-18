import React, { useState } from "react";
import { Box } from "@mui/joy";
import Sidebar from "./Sidebar";
import { useListResumes, useInsertResume } from "../../api/resume";

const Dashboard: React.FC = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const insertResume = useInsertResume();
  const { data, isLoading } = useListResumes({
    enabled: shouldFetch,
  });
  // Function to handle input change
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleGetClick = () => {
    setShouldFetch(true);
  };

  const handlePostClick = () => {
    // setShouldFetch(true);
    insertResume.mutate(inputValue);
  };

  console.log(data);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Your main content will go here */}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
