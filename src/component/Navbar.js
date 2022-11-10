import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Login from "./Login";
const settings = ["Logout"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 60,
  p: 4,
};

const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="absolute">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <HomeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".20rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
             H O M E
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Button onClick={handleCloseNavMenu} color="inherit">
                P O S T 
              </Button>
            </Link>
            {user ? (
              <Link
                to="/yourpost"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button onClick={handleCloseNavMenu} color="inherit">
                  M Y - P O S T
                </Button>
              </Link>
            ) : undefined}
            {user ? (
              <Link
                to="/createpost"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button onClick={handleCloseNavMenu} color="inherit">
                  C R E A T E - P O S T
                </Button>
              </Link>
            ) : undefined}
          </Box>
          
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button
                  startIcon={<Avatar src={user.photos[0].value} />}
                  endIcon={<ArrowDropDownIcon />}
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  {user.displayName}
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Button variant="text" onClick={logout}>
                      L O G O U T
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Link to="login" style={{ textDecoration: "none", color: "white" }} size="large">
              <Button color="inherit">L O G I N</Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;