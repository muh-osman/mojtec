import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
// Image logo
import logo from "../Assets/Images/logo.png";
// React router
import { Link, Outlet } from "react-router-dom";
// Cookies
import { useCookies } from "react-cookie";

const drawerWidth = 240;

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#61268b", // Your desired shade of red
    },
    // ... other colors
  },
  // ... other theme options
});

const pages = [
  // {
  //   id: 1,
  //   title: "Home",
  //   path: "/admin",
  // },
];

function DrawerAppBar(props) {
  // Cookie
  const [cookies, setCookie] = useCookies(["token", "verified"]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Toolbar style={{ justifyContent: "center" }}>
        <Link to="/admin" style={{ textDecoration: "none", color: "#fff" }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{
                width: 50,
                height: 50,
                textAlign: "center",
                borderRadius: 0,
              }}
            />
          </Stack>
        </Link>
      </Toolbar>

      <Divider />
      <List>
        {pages.map(({ id, title, path }) => (
          <ListItem key={id} to={path} component={Link} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>

        <CssBaseline />

        <AppBar component="nav">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Logo in large screen */}
              {/* <Toolbar
                sx={{ display: { xs: "none", md: "flex" } }}
                style={{ justifyContent: "center", paddingLeft: 0 }}
              >
                <Link to="/admin" style={{ textDecoration: "none", color: "#fff" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={logo}
                      sx={{
                        width: 50,
                        height: 50,
                        textAlign: "center",
                        borderRadius: 0,
                      }}
                    />
                  </Stack>
                </Link>
              </Toolbar> */}

              {/* Pages in small screen */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerToggle}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Logo in small screen */}
              {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <Toolbar style={{ justifyContent: "center" }}>
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: "center" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={logo}
                        sx={{
                          width: 50,
                          height: 50,
                          textAlign: "center",
                          borderRadius: 0,
                        }}
                      />
                    </Stack>
                  </Link>
                </Toolbar>
              </Box> */}

              {/* Pages in large screen */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <List sx={{ display: "flex" }}>
                  {pages.map(({ id, title, path }) => (
                    <ListItem
                      key={id}
                      to={path}
                      component={Link}
                      disablePadding
                    >
                      <ListItemButton
                        sx={{ textAlign: "center", color: "white" }}
                      >
                        <ListItemText primary={title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Login button */}
              <Box sx={{ flexGrow: 0 }}>
                <div className="nav_link" style={{ marginLeft: "auto" }}>
                  <Button
                    component={Link}
                    to={cookies.token ? "dashboard" : "login"}
                    variant="contained"
                    sx={{
                      backgroundColor: "#fbfbfb",
                      color: "#7431fa",
                      border: "1px solid transparent",
                      "&:hover": {
                        backgroundColor: "#c05ea2",
                        color: "#fbfbfb",
                        border: "1px solid #fbfbfb",
                      },
                    }}
                  >
                    {cookies.token ? "Dashboard" : "Login"}
                  </Button>
                </div>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Pages in small screen */}
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>

        {/* Outlet */}
        <Box component="main" sx={{ p: 3, width: "100%", "backgroundColor": "#fef8fb" }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
