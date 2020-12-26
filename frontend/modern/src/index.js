import 'typeface-roboto'
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  

import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#fff',
        main: '#043366',
        dark: '#000',
        contrastText: '#fff',

     },
     secondary: {
       main: '#f5f5f5',
     },

     tertiary: {
      main: '#4c4c4c',
    },

     
  },
  typography: { 
     useNextVariants: true
  }
});

ReactDOM.render((
  <MuiThemeProvider theme = { theme }>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  </MuiThemeProvider>
), document.getElementById('root'));

serviceWorker.register();
