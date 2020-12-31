import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { sessionActions } from "./store";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import { Link, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ReactFlagsSelect from "react-flags-select";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//import css module
import "react-flags-select/css/react-flags-select.css";

import t from "./common/localization";
import { setDefaultLanguage } from "./common/localization";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  logo: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "space-evenly",
    "& > *": {
      flexBasis: "40%",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  fields: {
    marginTop: "20px",
    marginBottom: "20px",
  },
}));

const LoginPage = (InitialItem) => {
  // init future date
  var future = new Date();
  future.setDate(future.getDate() + 30);

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  // set the default value of the newly registered user
  // by default the plateform gives any new user a trial
  // period of 30 days, 5 devices, 5 drivers
  const [item, setItem] = useState(
    (InitialItem = {
      id: 0,
      readonly: true,
      email: "",
      name: "",
      password: "",
      administrator: false,
      expirationTime: future.toISOString(),
      deviceLimit: 5,
      userLimit: 5,
      attributes: {},
    })
  );

  // Basic Auth header | credits exposed! try to add another security layer or use Auth0 tokens
  const auth = "Basic " + window.btoa("admin:admin");

  // status and alerts
  const [failed, setFailed] = useState(false);
  const [isRegistration, setRegistration] = useState(false);

  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  // snackbar
  let snackMessage = "";
  let snackSeverity = "";

  useEffect(() => {
    snackMessage = failed
      ? t("registrationUnsuccessful")
      : t("registrationSuccessful");
    snackSeverity = failed ? "error" : "success";

  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // Handle language selection
  const onSelectFlag = (countryCode) => {
    switch (countryCode) {
      case "GB":
        setDefaultLanguage("en");
        break;
      case "FR":
        setDefaultLanguage("fr");
        break;
      case "DE":
        setDefaultLanguage("de");
        break;
      default:
        setDefaultLanguage("fr");
        break;
    }
  };

  const handleEmailChange = (event) => {
    setItem({ ...item, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setItem({ ...item, password: event.target.value });
  };

  const handleNameChange = (event) => {
    setItem({ ...item, name: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/session", {
      method: "POST",
      body: new URLSearchParams(
        `email=${item.email}&password=${item.password}`
      ),
    });
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      showSnackbar();
      history.push("/");
    } else {
      setFailed(true);
      showSnackbar();
      setItem({ ...item, password: "" });
    }
  };

  const handleRegister = async (event) => {
    // if registration is not active
    event.preventDefault();
    
    // reset if login failed
    setFailed(false);

    if (!isRegistration) {
      setRegistration(true);
    } else {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        showSnackbar();
      } else {
        setFailed(true);
        showSnackbar();
        setItem({ ...item, password: "" });
      }
    }
  };

  const showSnackbar = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <main className={classes.root}>
      <Paper className={classes.paper}>
        <Box mt={2}>
          <img
            className={classes.logo}
            src="/logo.png"
            alt="Geontrack"
            width="200"
          />
        </Box>
        <form onSubmit={handleLogin}>
          <Box mt={2} hidden={!isRegistration}>
            <TextField
              id="input-name-with-icon-textfield"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              hidden
              margin={classes.margin}
              required={isRegistration}
              fullWidth
              error={failed}
              label={t("sharedName")}
              name="userName"
              value={item.name}
              onChange={handleNameChange}
              autoComplete="name"
              helperText={failed && "Invalid name, email or password"}
            />
          </Box>
          <Box mt={2}>
            <TextField
              id="input-with-icon-textfield"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              margin={classes.margin}
              required
              fullWidth
              error={failed}
              label={t("userEmail")}
              name="email"
              value={item.email}
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              helperText={failed && "Invalid name, email or password"}
            />
          </Box>

          <Box mt={2}>
            <TextField
              label="Pass"
              margin="normal"
              variant="outlined"
              required
              fullWidth
              error={failed}
              label={t("userPassword")}
              name="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={item.password}
              id="input-with-icon-adornment"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <ReactFlagsSelect
            class={classes.fields}
            countries={["GB", "FR", "DE"]}
            customLabels={{
              GB: t("English"),
              FR: t("French"),
              DE: t("German"),
            }}
            placeholder={t("selectALanguage")}
            onSelect={onSelectFlag}
          />
          <Link href="/" hidden={!isRegistration}>
            {t("userHasAccount")}
          </Link>

          <FormControl fullWidth margin="normal">
            <div className={classes.buttons}>
              <Button
                type="button"
                variant="contained"
                onClick={handleRegister}
                disabled={
                  isRegistration &&
                  (!item.email || !item.password || !item.name)
                }
              >
                {t("loginRegister")}
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!item.email || !item.password || isRegistration}
              >
                {t("loginLogin")}
              </Button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={failed? "error": "success"}>
                {failed?  t("registrationUnsuccessful") : t("registrationSuccessful")}
              </Alert>
            </Snackbar>
          </FormControl>
        </form>
      </Paper>
    </main>
  );
};

export default LoginPage;
