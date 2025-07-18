import React, { useState } from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);  
  const userRole = user?.role;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const drawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box>
        <Box sx={{ p: 2, textAlign: "center", borderBottom: "1px solid #ccc" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1.6rem",
              color: "#1976d2",
              letterSpacing: 1,
            }}
          >
            SMS
          </Typography>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Student portal" />
            </ListItemButton>
          </ListItem>

          {userRole === "superadmin" && (
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/staff">
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Staff portal" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <PersonIcon sx={{ color: "#555" }} />
        <Typography variant="subtitle1" sx={{ color: "#555" }}>
          Welcome,<strong>{user?.username || "User"}</strong>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1300,
          minWidth: "auto",
          padding: 1,
          color: "#ffffff",
        }}
      >
        <MenuIcon />
      </Button>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;
