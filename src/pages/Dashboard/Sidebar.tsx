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
// Import any icons or additional components you might want to use

function Sidebar() {
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
              "& > div": { justifyContent: "center" },
            }}
          >
            {["Tool 1", "Tool 2", "Tool 3"].map((text, index) => (
              <ListItemButton key={text} sx={{ fontWeight: "lg" }}>
                {isHovered || !isDesktop ? text : <Menu />}{" "}
                {/* Replace <Menu /> with the appropriate icon for the tool */}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidebar;
