import React, { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ModalClose,
} from "@mui/joy";
import Menu from "@mui/icons-material/Menu";

import { useMediaQuery } from "@mui/material";
import { Tool } from "./types";
import { Link } from "react-router-dom";

interface SidebarProps {
  tools: Tool[];
}

const Sidebar: React.FC<SidebarProps> = ({ tools }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  return (
    <React.Fragment>
      {/* Button to open drawer on mobile */}
      {!isDesktop && (
        <IconButton
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </IconButton>
      )}
      <Drawer
        open={isDesktop || open}
        onClose={() => setOpen(false)}
        hideBackdrop={true}
        size="sm"
        sx={{
          "--Drawer-horizontalSize": isDesktop
            ? isHovered
              ? "400px"
              : "60px"
            : "100%",
        }}
      >
        <Box
          onMouseEnter={() => isDesktop && setIsHovered(true)}
          onMouseLeave={() => isDesktop && setIsHovered(false)}
          sx={{ width: "100%", height: "100%" }}
        >
          {!isDesktop && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                ml: "auto",
                mt: 1,
                mr: 1,
              }}
            >
              <ModalClose
                id="close-icon"
                sx={{ position: "initial" }}
                onClick={() => setOpen(false)}
              />
            </Box>
          )}
          <List
            size="lg"
            component="nav"
            sx={{
              flex: "none",
              mt: 6,
              mb: 5,
              fontSize: "xl",
              "& > a": {
                display: "flex",
                textDecoration: "none",
                width: "100%",
              },
            }}
          >
            {tools.map((tool, index) => (
              <Link to={"/dashboard/" + tool.path}>
                <ListItemButton
                  key={tool.name}
                  sx={{
                    fontWeight: "lg",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  {isHovered || !isDesktop ? tool.name : tool.icon}{" "}
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default Sidebar;
