import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  loginUserWithEmailPassword,
  registerUserWithEmailPassword,
} from "../auth/firebase";

const theme = createTheme();

export default function SignInOrRegister(props) {
  const { keyword } = props;
  const navigate = useNavigate();
  const title = keyword === "login" ? "Sign In" : "Register";
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msgSnackbar, setMsgSnackbar] = useState("");

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /*console.log({
      keyword: keyword,
      email: data.get("email"),
      password: data.get("password"),
    });*/
    if (keyword === "login") {
      const response = await loginUserWithEmailPassword(
        data.get("email"),
        data.get("password")
      );
      if (response.status) {
        navigate("/");
      } else {
        setMsgSnackbar(response.error.code);
        handleOpenSnackbar();
      }
    } else if (keyword === "register") {
      const response = await registerUserWithEmailPassword(
        data.get("email"),
        data.get("password")
      );
      if (response.status) {
        navigate("/");
      } else {
        setMsgSnackbar(response.error.code);
        handleOpenSnackbar();
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {title}
            </Button>
            <Grid container>
              <Grid item>
                {keyword === "login" ? (
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                ) : (
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Go to Home"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={12000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Alert</AlertTitle>
            {msgSnackbar}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
