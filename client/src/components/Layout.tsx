import React from "react";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Fab,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

//children: 문서 구조를 넣는 형식의 변수
const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const handlePushHomePage = () => navigate("/");
  const handlePushCartPage = () => navigate("/cart");
  const handlePushCreatePage = () => navigate("/create");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: 26,
                fontWeight: "bold",
                cursor: "pointer",
                flexGrow: 1,
              }}
              onClick={handlePushHomePage}
            >
              온라인쇼핑몰
            </Typography>
            <Button color="inherit" onClick={handlePushCartPage}>
              <ShoppingCartIcon fontSize="large" />
            </Button>
          </Toolbar>
        </AppBar>
        <Container fixed>{children}</Container>
      </Box>
      <Box sx={{ position: "fixed", right: "20px", bottom: "20px" }}>
        <Fab color="primary" onClick={handlePushCreatePage}>
          <CreateIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Layout;
