import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Logo from "../../img/common/logo.jpg";
import { CartContext } from "../../context/CartContext";

const pageLinks = [
  {
    page: "Catalogue",
    link: "/catalogue",
  },
];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { cart } = useContext(CartContext);

  return (
    <AppBar elevation={0} color="background" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              padding: 1,
              width: "10px",
              display: { xs: "none", md: "flex" },
            }}
            alt="Nav Bar"
            src={Logo}
          />
          <Typography
            variant="h6"
            noWrap
            componeent="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Poppins",
              fontWeight: 900,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EIRLOOM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pageLinks.map(({ page, link }) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    component="a"
                    href={link}
                    sx={{ textDecoration: "none" }}
                    color="secondary"
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            component="img"
            sx={{
              padding: 1,
              width: "10px",
              display: { xs: "flex", md: "none" },
            }}
            alt="Nav Bar"
            src={Logo}
          />
          <Typography
            variant="subtitle2"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EIRLOOM
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pageLinks.map(({ page, link }) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ color: "inherit", display: "block", m: 3 }}
                href={link}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Link to={"/cart"}>
            <Badge
              badgeContent={cart ? cart?.total_items : 0}
              color="secondary"
            >
              <LocalMallIcon color="action" />
            </Badge>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
