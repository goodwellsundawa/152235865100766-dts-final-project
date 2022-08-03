import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logoutUser } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

function Header(props) {
  const { sections, title } = props;
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [valSearch, setValSearch] = useState("");

  const searchOnChangeHandler = (event) => {
    setValSearch(event.target.value);
  };

  const buttonSearchOnClickHandler = () => {
    if (valSearch !== "") {
      console.log("valSearch :", valSearch);
      navigate(`/list/search?keyword=${valSearch}`);
      setValSearch("");
    }
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link href="/" underline="none" sx={{ color: "inherit" }}>
            {title}
          </Link>
        </Typography>
        {user ? (
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ marginRight: "2.5em" }}
          >
            Welcome, {user.email}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          className="text"
          label="Enter keyword"
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ marginRight: "0.5em" }}
          value={valSearch}
          onChange={searchOnChangeHandler}
        />
        <IconButton onClick={buttonSearchOnClickHandler}>
          <SearchIcon />
        </IconButton>
        {user ? (
          <Button
            variant="contained"
            size="medium"
            color="inherit"
            sx={{ marginLeft: "0.5em" }}
            onClick={async () => {
              await logoutUser();
              navigate("/login");
            }}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="contained"
            size="medium"
            color="inherit"
            sx={{ marginLeft: "0.5em" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            key={section.id}
            color="inherit"
            noWrap
            variant="body2"
            href={`/list/genres?keyword=${section.id}`}
            sx={{ p: 1, flexShrink: 0 }}
          >
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={(e) => {
                console.log("Click menu :", e.currentTarget.value);
              }}
            >
              {section.name}
            </Button>
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
