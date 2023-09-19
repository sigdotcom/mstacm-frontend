import React, { useEffect, useState } from "react";
import { Box } from "@mui/joy";
import Sidebar from "./Sidebar";
import { tools } from "./tools/tools";
import { Outlet } from "react-router";
import getUserRole from "../../common/getUserRole";
import { ACCESS_LEVELS, Tool } from "./types";

const Dashboard: React.FC = () => {
  const [renderTool, setRenderTool] = useState<Tool[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userRole = await getUserRole();
      setRole(userRole);
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (role) {
      const toolsForRole = tools.filter(
        (tool) =>
          tool.accessLevel.includes(ACCESS_LEVELS.ALL) ||
          tool.accessLevel.includes(role as ACCESS_LEVELS)
      );
      setRenderTool(toolsForRole);
    }
  }, [role]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar tools={renderTool} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: { xs: 0, md: "60px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
