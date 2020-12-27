import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sessionActions } from './store';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ReactFlagsSelect from 'react-flags-select';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import Box from '@material-ui/core/Box';

//import css module
import 'react-flags-select/css/react-flags-select.css';
 

import t from './common/localization';
import {setDefaultLanguage} from './common/localization';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),

  },
  logo: {
    marginTop: theme.spacing(2)
  },
  buttons: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      flexBasis: '40%',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  fields: {
    marginTop: '20px',
    marginBottom: '20px'
  },
}));



const LoginPage = () => {
  const dispatch = useDispatch();

  const [failed, setFailed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  const history = useHistory();

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
   }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange  = (event) => {
    setPassword(event.target.value);

  }

  const handleRegister = () => {
    // TODO: Implement registration
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/session', { method: 'POST', body: new URLSearchParams(`email=${email}&password=${password}`) });
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      history.push('/');
    } else {
      setFailed(true);
      setPassword('');
    }
  }

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

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

        <img className={classes.logo} src='/logo.png' alt='Geontrack' width='200' />
</Box>
        <form onSubmit={handleLogin}>
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
            label={t('userEmail')}
            name='email'
            value={email}
            autoComplete='email'
            autoFocus
            onChange={handleEmailChange}
            helperText={failed && 'Invalid username or password'} />
            </Box>

            <Box mt={2}>     
          <TextField
            label = 'Pass'
            margin='normal'
            variant="outlined"
            required
            fullWidth
            error={failed}
            label={t('userPassword')}
            name='password'
            autoComplete='current-password'
            onChange={handlePasswordChange}
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
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
            )
            
          }}
           
            />
            </Box>


          <ReactFlagsSelect 
          class = {classes.fields}
          countries={["GB", "FR", "DE"]} 
          customLabels={{"GB": t('English'),"FR": t('French'),"DE": t('German')}} 
          placeholder= {t('selectALanguage')} 
          onSelect={onSelectFlag}
          />

          <FormControl fullWidth margin='normal'>
            <div className={classes.buttons}>
              <Button type='button' variant='contained' disabled onClick={handleRegister}>
                {t('loginRegister')}
              </Button>
              <Button type='submit' variant='contained' color='primary' disabled={!email || !password}>
                {t('loginLogin')}
              </Button>
            </div>
          </FormControl>
        </form>
      </Paper>
    </main>
  );
}

export default LoginPage;
