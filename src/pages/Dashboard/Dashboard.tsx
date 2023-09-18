import React, { useState } from "react";
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
      <h1>Dashboard</h1>
      <p>{isLoading ? "loading" : "not loading"}</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a string..."
      />
      <button style={{ height: 20 }} onClick={handlePostClick}>
        post api
      </button>

      <button style={{ height: 20 }} onClick={handleGetClick}>
        get api
      </button>
    </div>
  );
};

export default Dashboard;
